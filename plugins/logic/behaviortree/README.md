# BehaviorTree

Reference: https://github.com/behavior3/behavior3js/

A behavior-tree implementation. Nodes return status codes and the
tree evaluates them each tick while using a blackboard to store state.


## Node/Tree state

- **IDLE** : Node has not been executed yet.
- **SUCCESS**, **FAILURE** : Return `true`/`false` and continue to the next
  node or child.
- **RUNNING** : Stop ticking; resume this node on the next tick.
- **ABORT** : Node was aborted by its parent or an `Abort` action.
- **ERROR** : Indicates a runtime error, such as a composite or decorator
  without a required child.

## Nodes

- Composite Nodes:
    - Selector : Memory selector that evaluates children until one returns
      `RUNNING`, `SUCCESS`, or `ABORT`.
    - Sequence : Memory sequence that runs each child in order and pauses on
      `RUNNING`.
    - Parallel :
        - First child is treated as the main task.
        - By default returns the main task's status; other modes can wait for
          all children.
    - RandomSelector : Choose a random child each tick.
    - IfSelector
    - SwitchSelector
    - WeightSelector : Randomly pick a child using weights.
    - ShuffleSelector : Shuffle children before running them.
- Decorators:
    - If
    - AbortIf
    - ContinueIf
    - BreakDecorator
        - Responds to a descendant BreakAction by returning SUCCESS and clearing a break flag
    - Bypass
    - ForceSuccess
    - ForceFailure
    - TimeLimit
        - Return FAILURE when timeout, else return child status
    - Cooldown
        - Start cooldown when child status is not RUNNING
        - Return FAILURE during cooldown, else return child status
    - Repeat
    - RepeatUntilFailure
    - RepeatUntilSuccess
    - Invert
    - Limiter
- Actions:
    - Succeeder
    - Failer
    - Runner
    - Wait
        - Wait 0 : Wait a tick
    - Error : Always return `ERROR`.
    - Abort : Always return `ABORT`.
    - BreakAction
        - Search for the nearest BreakDecorator ancestor, set its break flag, and return `ABORT`.
- Expressions:
    - NumberExpression : Evaluate a number/boolean expression string, callback,
      constant, or expression node.
    - StringExpression : Render a string template or callback.
    - ANDExpression : Evaluate child expressions in order and return `true`
      only when all are truthy. Stops at the first falsy expression.
    - ORExpression : Evaluate child expressions in order and return `true`
      when any expression is truthy. Stops at the first truthy expression.
    - NOTExpression : Evaluate one expression and return the inverted boolean
      result.

Expression values can be constants, expression strings, callbacks, or other
expression nodes. Logical expressions convert each child through
`CreateNumberExpression`, so string conditions and custom expression nodes can
be mixed:

```javascript
var condition = btAdd.andExpression([
    'player.hp > 50',
    btAdd.orExpression([
        'player.mp > 10',
        'player.coin > 100'
    ]),
    btAdd.notExpression('player.isBusy')
]);
```

## Custom Action, Service, and Expression

Custom nodes can extend `RexPlugins.BehaviorTree.Action`,
`RexPlugins.BehaviorTree.Service`, or `RexPlugins.BehaviorTree.Expression`.
Use the same constructor shape as built-in nodes:

```javascript
constructor(config = {}, nodePool) {
    if (nodePool) {  // Rebuild node, don't touch config
        super(config, nodePool);

    } else {  // New node
        // Convert user-facing options to the serialized node config.
        super({
            name: 'MyNodeName',
            properties: {
                // Custom values to preserve in dump/load.
            },
        });
    }

    // Copy values from this.properties or config after super().
}
```

The `nodePool` argument is supplied while loading a dumped tree. When
`nodePool` exists, the node is being rebuilt from serialized data, so pass
`config` and `nodePool` unchanged to `super(config, nodePool)`. Do not rewrite
`config` in this branch. The base classes use `nodePool` to resolve child,
service, and expression node ids back to node instances.

When `nodePool` is not supplied, the node is being created directly by user
code. In this branch, convert convenient constructor options into the canonical
node config. Store custom serializable values in `properties`; they will be
included in `dump()` and restored during `load()`.

Separate regular properties from expressions. Regular parameters should be
stored in `properties` and read back from `this.properties.xxx` after `super()`.
Expression parameters should not be stored in `properties`; create the
expression node or constant value, then register it with `this.addExpression()`.
During `dump()`, expressions are written to `spec.expressions`; during `load()`,
read them from `config.expressions`. Built-in nodes such as `AbortIf` follow
this pattern.

```javascript
class MyDecorator extends RexPlugins.BehaviorTree.Decorator {
    constructor(config = {}, nodePool) {
        var condition;

        if (nodePool) {
            super(config, nodePool);

            var expressions = config.expressions || {};
            condition = expressions.condition;

        } else {
            var {
                condition: conditionValue = 'true',
                returnSuccess = true,
                child = null,
                properties = {},
            } = config;

            super({
                child,
                properties: {
                    ...properties,
                    returnSuccess: returnSuccess,
                },
                name: 'MyDecorator',
            }, nodePool);

            condition = conditionValue;
        }

        // In source modules, import CreateNumberExpression from the expressions folder.
        this.condition = CreateNumberExpression(condition, nodePool);
        this.addExpression('condition', this.condition);

        this.returnSuccess = this.properties.returnSuccess;
    }
}
```

Example action:

```javascript
class PrintAction extends RexPlugins.BehaviorTree.Action {
    constructor(config = {}, nodePool) {
        if (nodePool) {
            super(config, nodePool);

        } else {
            var { text = '' } = config;
            super({
                name: 'MyAction',
                properties: { text: text },
            });
        }

        this.text = this.properties.text;
    }

    tick(tick) {
        console.log(this.text);
        return this.SUCCESS;
    }
}
```

Example service:

```javascript
class PrintService extends RexPlugins.BehaviorTree.Service {
    constructor(config = {}, nodePool) {
        if (nodePool) {
            super(config, nodePool);

        } else {
            var { text = '', interval = 70 } = config;
            super({
                name: 'MyPrintService',
                interval: interval,
                properties: { text: text },
            });
        }

        this.text = this.properties.text;
    }

    tick(tick) {
        console.log(this.text);
    }
}
```

Example expression:

```javascript
class Comparator extends RexPlugins.BehaviorTree.Expression {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {  // New node
            var {
                opA = 'true',
                cmp = '==',
                opB = 'true'
            } = config;
            super(
                {
                    name: 'MyComparator',
                    properties: {
                        opA, cmp, opB,
                    },
                },
            );
        }

        var opA = this.properties.opA;
        var cmp = this.properties.cmp;
        var opB = this.properties.opB;
        this.condition = `(${opA})${cmp}(${opB})`;
    }

    eval(tick) {
        var context = tick.getEvalContext();
        var value = tick.expressionParser.exec(this.condition, context);
        return value;
    }
}
```

Register custom node classes when loading:

```javascript
tree.load(data, {
    MyAction: PrintAction,
    MyPrintService: PrintService,
    MyComparator: Comparator
});
```

## Blackboard

The blackboard stores execution data with global, tree, and node scopes. It can
track a tree's last state, keep per-node memories, and supply a custom current
time shared across ticks.

Tree and node memories are keyed by `tree.id` inside one blackboard:

```text
blackboard._treeMemory[tree.id]
blackboard._treeMemory[tree.id].nodeMemory[node.id]
```

Therefore one blackboard can only store one runtime state set for a given
`BehaviorTree` id. If two tasks need to run the same tree at the same time,
do not share both the same tree id and the same blackboard. Use separate
blackboards, or create separate tree instances with different ids.

### Custom global memory

By default, the blackboard stores global data in a plain object. Pass
`globalMemory` when creating a blackboard to use an application-owned context
object instead:

```javascript
class World {
    constructor() {
        this.state = {
            player: {
                name: 'rex',
                coin: 10
            }
        };

        this.system = {};
    }

    getEvalContext() {
        return this;
    }

    set(key, value) {
        this.system[key] = value;
        return this;
    }

    get(key) {
        return this.system[key];
    }

    has(key) {
        return key in this.system;
    }

    remove(key) {
        delete this.system[key];
        return this;
    }

    dump() {
        return {
            system: { ...this.system }
        };
    }

    load(data) {
        this.system = data.system;
        return this;
    }

    destroy() {
    }

    get player() {
        return this.state.player;
    }
}

var world = new World();
var blackboard = btAdd.blackboard({
    globalMemory: world
});
```

When `globalMemory` is not a plain object, the blackboard treats it as custom
global memory. `set`, `get`, `has`, and `remove` are used by the matching
blackboard data methods. `dump` and `load` are used when serializing or
restoring blackboard data. `destroy` is called when the blackboard is
destroyed.

`getEvalContext` is optional. When present, expressions and string templates
evaluate against its return value; otherwise they evaluate against the custom
global memory object itself.

## Logic mapping

### If

```
if ConditionA
    TaskA
else if ConditionB
    TaskB
else
    TaskC
```

Map to

- Selector
    - If(Decorator)
        - TaskA
    - If(Decorator)
        - TaskB   
    - TaskC

### While loop

```
while ConditionA
    TaskA
```

Map to

- RepeatUntilFailure(Decorator)
    - If(Decorator)
        - TaskA


Support `break` and `continue`

- BreakDecorator(tag='break') + RepeatUntilFailure(Decorator)
  - condition block: If(Decorator)
    - actions block: BreakDecorator(tag='continue') + Sequence


### Repeat loop

```
Repeat 3
  TaskA
```

Map to

- Repeat(Decorator)
  - Sequence


Support `break` and `continue`

- BreakDecorator(tag='break') + Repeat(Decorator)
  - BreakDecorator(tag='continue') + Sequence


### For loop

```
for(init; condition; step)
  TaskA
```

Map to

- Sequence
  - init block: Sequence
  - RepeatUntilFailure(Decorator)
    - condition block: If(Decorator)
      - Sequence
        - actions block: Sequence
        - step block: Sequence


Support `break` and `continue`

- BreakDecorator(tag='break') + Sequence
  - init block: Sequence
  - RepeatUntilFailure(Decorator)
    - condition block: If(Decorator)
      - Sequence
        - actions block: BreakDecorator(tag='continue') + Sequence
        - step block: Sequence


### Tick

A `Tick` represents one traversal of the tree. It holds references to the tree,
blackboard, and target object, collects open nodes, and exposes helpers such as
`currentTime` and `evalExpression`.

`tick.currentTime` is required by built-in time-based nodes. `Service`,
`Wait`, `Cooldown`, and `TimeLimit` use it to calculate elapsed time between
ticks.

#### State machine

```javascript
node._execute(tick);
```

```mermaid
graph TD

ENTER("ENTER<br>----<br>node._enter()<br>-> tick._enterNode(), node.enter()")
OPEN("OPEN<br>----<br>node._open()<br>-> tick._openNode(), node.open()")
TICK("TICK<br>----<br>node._tick()<br>-> tick._tickNode(), node.tick()")
CLOSE("CLOSE<br>----<br>node._close()<br>-> tick._closeNode(), node.close()")
EXIT("EXIT<br>----<br>node._exit()<br>-> tick._exitNode(), node.exit()")

ENTER --> |NOT isOpen| OPEN
OPEN  --> TICK
ENTER --> |isOpen| TICK
TICK  --> |NOT isRunning| CLOSE
CLOSE --> EXIT
TICK  --> |isRunning| EXIT
```

- Closing a node also closes its running children.

## Logger

Use a logger to print diagnostic events without storing records:

```javascript
var logger = btAdd.logger({
    tree: tree,
    level: 'status',
    format: 'compact'
});

tree.tick(blackboard, target);
```

Use `format: 'bbcode'` with `BBCodeSink` to print colored console output:

```javascript
var logger = btAdd.logger({
    tree: tree,
    level: 'status',
    format: 'bbcode',
    sink: new RexPlugins.BehaviorTree.BBCodeSink()
});
```

Common levels are:

- `status` : Tick end, node status, aborts, and node logs.
- `tick` : Tick start and tick end.
- `verbose` : All behavior-tree diagnostic events.

Custom action nodes can emit user-facing log events:

```javascript
class PrintAction extends RexPlugins.BehaviorTree.Action {
    tick(tick) {
        var text = 'Hello';
        tick.emitNodeLog(this, text);
        return this.SUCCESS;
    }
}
```

## Tracer

Use a tracer when structured records are needed, for example an inspector UI:

```javascript
var tracer = btAdd.tracer({
    tree: tree,
    maxRecords: 16,
    includeTime: false
});

tree.tick(blackboard, target);

var record = tracer.getLastRecord();
console.log(record.events);
```

Each record represents one tree tick and contains the tick status, node count,
open node ids, and recorded events.
