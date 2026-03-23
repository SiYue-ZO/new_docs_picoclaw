# PicoClaw Hook 系统设计（基�?`refactor/agent`�?

## 背景

本设计围绕两个议题展开�?

- `#1316`：把 agent loop 重构为事件驱动、可中断、可追加、可观测
- `#1796`：在 EventBus 稳定后，�?hooks 设计�?EventBus �?consumer，而不是重新发明一套事件模�?

当前分支已经完成了第一步里的“事件系统基础”，但还没有真正�?hook 挂载层。因此这里的目标不是重新设计 event，而是在已有实现上补出一层可扩展、可拦截、可外挂�?HookManager�?

## 外部项目对比

### OpenClaw

OpenClaw 的扩展能力分成三层：

- Internal hooks：目录发现，运行�?Gateway 进程�?
- Plugin hooks：插件在运行时注�?hook，也在进程内
- Webhooks：外部系统通过 HTTP 触发 Gateway 动作，属于进程外

值得借鉴的点�?

- 有“项目内挂载”和“项目外挂载”两种路�?
- hook 是配置驱动，可启�?
- 外部入口有明确的安全边界和映射层

不建议直接照搬的点：

- OpenClaw �?hooks / plugin hooks / webhooks 是三套路由，PicoClaw 当前体量下会偏重
- HTTP webhook 更适合“事件进入系统”，不适合作为“可同步拦截 agent loop”的基础机制

### pi-mono

pi-mono 的核心思路更接近当前分支：

- 扩展统一�?extension API
- 事件分为观察型和可变更型
- 某些阶段允许 `transform` / `block` / `replace`
- 扩展代码主要是进程内执行
- RPC mode �?UI 交互桥接到进程外客户�?

值得借鉴的点�?

- 不把“观察”和“拦截”混成一个接�?
- 允许返回结构化动作，而不是只有回�?
- 进程外通信只暴露必要协议，不把整个内部对象图泄露出�?

## 当前分支现状

### 已有能力

当前分支已经具备 hook 系统的地基：

- `pkg/agent/events.go` 定义了稳定的 `EventKind`、`EventMeta` �?payload
- `pkg/agent/eventbus.go` 提供了非阻塞 fan-out �?`EventBus`
- `pkg/agent/loop.go` 中的 `runTurn()` 已在 turn、llm、tool、interrupt、follow-up、summary 等节点发射事�?
- `pkg/agent/steering.go` 已支�?steering、graceful interrupt、hard abort
- `pkg/agent/turn.go` 已维�?turn phase、恢复点、active turn、abort 状�?

### 现有缺口

当前分支还缺四件事：

- 没有 HookManager，只�?EventBus
- 没有 Before/After LLM、Before/After Tool 这种同步拦截�?
- 没有审批�?hook
- �?agent 仍走 `pkg/tools/SubagentManager + RunToolLoop`，没有接�?`pkg/agent` �?turn tree 和事件流

### 一个关键现�?

`#1316` 文案里提到“只读并行、写入串行”的工具执行策略，但当前 `runTurn()` 实现已经先收敛成“顺序执�?+ 每个工具后检�?steering / interrupt”。因�?hook 设计不应依赖未来的并行模型，而应该先兼容当前顺序执行，再为以后增�?`ReadOnlyIndicator` 留口子�?

## 设计原则

- Hook 必须建立�?`pkg/agent` �?EventBus �?turn 上下文之�?
- EventBus 负责广播，HookManager 负责拦截，两者职责分�?
- 项目内挂载要简单，项目外挂载必须走 IPC
- 观察�?hook 不能阻塞 loop；拦截型 hook 必须有超�?
- 先覆盖主 turn，不�?sub-turn 一次做�?
- 不新增第二套用户事件命名系统，优先复�?`EventKind.String()`

## 总体架构

分成三层�?

1. `EventBus`
   负责广播只读事件，现有实现直接复�?

2. `HookManager`
   负责管理 hook、排序、超时、错误隔离，并在 `runTurn()` 的明确检查点执行同步拦截

3. `HookMount`
   负责两种挂载方式�?
   - 进程�?Go hook
   - 进程�?IPC hook

换句话说�?

- EventBus 是“发生了什么�?
- HookManager 是“谁能介入�?
- HookMount 是“这�?hook 从哪里来�?

## Hook 分类

不建议把所�?hook 都设计成 `OnEvent(evt)`�?

建议拆成两类�?

### 1. 观察�?

只消费事件，不修改流程：

```go
type EventObserver interface {
    OnEvent(ctx context.Context, evt agent.Event) error
}
```

这类 hook 直接订阅 EventBus 即可�?

适用场景�?

- 审计日志
- 指标上报
- 调试 trace
- 将事件转发给外部 UI / TUI / Web 面板

### 2. 拦截�?

只在少数明确节点触发，允许返回动作：

```go
type LLMInterceptor interface {
    BeforeLLM(ctx context.Context, req *LLMRequest) HookDecision[*LLMRequest]
    AfterLLM(ctx context.Context, resp *LLMResponse) HookDecision[*LLMResponse]
}

type ToolInterceptor interface {
    BeforeTool(ctx context.Context, call *ToolCall) HookDecision[*ToolCall]
    AfterTool(ctx context.Context, result *ToolResultView) HookDecision[*ToolResultView]
}

type ToolApprover interface {
    ApproveTool(ctx context.Context, req *ToolApprovalRequest) ApprovalDecision
}
```

这里�?`HookDecision` 统一支持�?

- `continue`
- `modify`
- `deny_tool`
- `abort_turn`
- `hard_abort`

## 对外暴露的最�?hook �?

V1 不需要把所�?EventKind 都变成可拦截点�?

建议只开放这些同�?hook�?

- `before_llm`
- `after_llm`
- `before_tool`
- `after_tool`
- `approve_tool`

其余节点继续作为只读事件暴露�?

- `turn_start`
- `turn_end`
- `llm_request`
- `llm_response`
- `tool_exec_start`
- `tool_exec_end`
- `tool_exec_skipped`
- `steering_injected`
- `follow_up_queued`
- `interrupt_received`
- `context_compress`
- `session_summarize`
- `error`

`subturn_*` �?V1 中保留名字，但不承诺一定触发，直到�?turn 迁移完成�?

## 项目内挂�?

内部挂载必须尽量低摩擦�?

建议提供两种等价方式，底层都�?HookManager�?

### 方式 A：代码显式挂�?

```go
al.MountHook(hooks.Named("audit", &AuditHook{}))
```

适用于：

- 仓内内建 hook
- 单元测试
- feature flag 控制

### 方式 B：内�?registry

```go
func init() {
    hooks.RegisterBuiltin("audit", func() hooks.Hook {
        return &AuditHook{}
    })
}
```

启动时根据配置启用：

```json
{
  "hooks": {
    "builtins": {
      "audit": { "enabled": true }
    }
  }
}
```

这比 OpenClaw 的目录扫描更轻，也更贴合 Go 项目�?

## 项目外挂�?

这是本设计的硬要求�?

建议 V1 采用�?

- `JSON-RPC over stdio`

原因�?

- 跨平台最简�?
- 不依赖额外端�?
- 非常适合“由 PicoClaw 启动一个外�?hook 进程�?
- �?HTTP webhook 更适合同步拦截

### 外部 hook 进程模型

PicoClaw 启动外部进程，并在其 stdin/stdout 上跑协议�?

配置示例�?

```json
{
  "hooks": {
    "processes": {
      "review-gate": {
        "enabled": true,
        "transport": "stdio",
        "command": ["uvx", "picoclaw-hook-reviewer"],
        "observe": ["turn_start", "turn_end", "tool_exec_end"],
        "intercept": ["before_tool", "approve_tool"],
        "timeout_ms": 5000
      }
    }
  }
}
```

### 协议边界

不要把内�?Go 结构体直接暴露给 IPC�?

建议定义稳定的协议对象：

- `HookHandshake`
- `HookEventNotification`
- `BeforeLLMRequest`
- `AfterLLMRequest`
- `BeforeToolRequest`
- `AfterToolRequest`
- `ApproveToolRequest`
- `HookDecision`

其中�?

- 观察型事件用 notification，fire-and-forget
- 拦截型事件用 request/response，同步等�?

### 为什么是 stdio，而不是直接用 HTTP webhook

因为两者用途不同：

- HTTP webhook 更适合“外部系统向 PicoClaw 投递事件�?
- stdio/RPC 更适合“PicoClaw �?turn 内同步询问外�?hook 是否改写 / 放行 / 拒绝�?

如果未来需�?OpenClaw �?webhook，可以作为独立入口层，再把外部事件转�?inbound message �?steering，而不是直接替�?hook IPC�?

## Hook 执行顺序

建议统一排序规则�?

- 先内�?in-process hook
- 再外�?IPC hook
- 同组内按 `priority` 从小到大执行

原因�?

- 内建 hook 延迟更低，适合做基础规范�?
- 外部 hook 更适合做审批、审计、组织级策略

## 超时与错误策�?

### 观察�?

- 默认超时：`500ms`
- 超时或报错：记录日志，继续主流程

### 拦截�?

- `before_llm` / `after_llm` / `before_tool` / `after_tool`：默�?`5s`
- `approve_tool`：默�?`60s`

超时行为�?

- 普通拦截：`continue`
- 审批：`deny`

这点应直接沿�?`#1316` 的安全倾向�?

## 与当前分支的对接�?

### 直接复用

- 事件定义：`pkg/agent/events.go`
- 事件广播：`pkg/agent/eventbus.go`
- 活跃 turn / interrupt / rollback：`pkg/agent/turn.go`
- 事件发射点：`pkg/agent/loop.go`

### 需要新�?

- `pkg/agent/hooks.go`
  - Hook 接口
  - HookDecision / ApprovalDecision
  - HookManager

- `pkg/agent/hook_mount.go`
  - 内建 hook 注册
  - 外部进程 hook 注册

- `pkg/agent/hook_ipc.go`
  - stdio JSON-RPC bridge

- `pkg/agent/hook_types.go`
  - IPC 稳定载荷

### 需要改�?

- `pkg/agent/loop.go`
  - �?LLM �?tool 关键路径前后插入 HookManager 调用

- `pkg/tools/base.go`
  - 可选新�?`ReadOnlyIndicator`

- `pkg/tools/spawn.go`
- `pkg/tools/subagent.go`
  - 先保留现�?
  - �?sub-turn 迁移后再接入 `subturn_*` hook

## 一个更贴合当前分支的数据流

### 观察链路

```text
runTurn() -> emitEvent() -> EventBus -> observers
```

### 拦截链路

```text
runTurn()
  -> HookManager.BeforeLLM()
  -> Provider.Chat()
  -> HookManager.AfterLLM()
  -> HookManager.BeforeTool()
  -> HookManager.ApproveTool()
  -> tool.Execute()
  -> HookManager.AfterTool()
```

也就是说�?

- observer 不改变现�?`emitEvent()`
- interceptor 直接插在 `runTurn()` 热路�?

## 用户可见配置

建议新增�?

```json
{
  "hooks": {
    "enabled": true,
    "builtins": {},
    "processes": {},
    "defaults": {
      "observer_timeout_ms": 500,
      "interceptor_timeout_ms": 5000,
      "approval_timeout_ms": 60000
    }
  }
}
```

V1 不做复杂自动发现�?

原因�?

- 当前分支重点是把地基打稳
- 目录扫描、安装器、脚手架可以后置
- 先让仓内和仓外都能挂上去，比“管理体验完整”更重要

## 推荐�?V1 范围

### 必做

- HookManager
- in-process 挂载
- stdio IPC 挂载
- observer hooks
- `before_tool` / `after_tool` / `approve_tool`
- `before_llm` / `after_llm`

### 可后�?

- hook CLI 管理命令
- hook 自动发现
- Unix socket / named pipe transport
- sub-turn hook 生命周期
- read-only 并行分组
- webhook �?inbound message 的映射入�?

## 分阶段落�?

### Phase 1

- 引入 HookManager
- 支持 in-process observer + interceptor
- 先只接主 turn

### Phase 2

- 引入 `stdio` 外部 hook 进程�?
- 支持组织级审�?/ 审计 / 参数改写

### Phase 3

- �?`SubagentManager` 迁移�?`runTurn/sub-turn`
- 接�?`subturn_spawn` / `subturn_end` / `subturn_result_delivered`

### Phase 4

- 视需求补 `ReadOnlyIndicator`
- 在主 turn �?sub-turn 上统一只读并行策略

## 最终结�?

最适合 PicoClaw 当前分支的方案，不是直接复制 OpenClaw �?hooks，也不是完整照搬 pi-mono �?extension system，而是�?

- 以现�?`EventBus` 为只读观察面
- 以新�?`HookManager` 为同步拦截面
- 项目内通过 Go 对象直接挂载
- 项目外通过 `stdio JSON-RPC` 进程通信挂载

这样做有三个好处�?

- �?`#1796` 一致，hooks 只是 EventBus 之上的消费层
- 和当�?`refactor/agent` 实现一致，不需要推翻已有事件系�?
- 同时满足“仓内简单挂载”和“仓外进程通信挂载”两个硬需�?
