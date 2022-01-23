# Behavior3

Reference: https://github.com/behavior3/behavior3js/

## Core Classes

This library include the following core structures...

- BehaviorTree: the structure that represents a Behavior Tree;
- Blackboard: represents a "memory" in an agent and is required to to run a `BehaviorTree`;
- Composite: base class for all composite nodes;
- Decorator: base class for all decorator nodes;
- Action: base class for all action nodes;
- Tick: used as container and tracking object through the tree during the tick signal;
- BaseNode: the base class that provide all common node features;

## Nodes

- Composite Nodes: [TODO] Close child nodes
    - Selector : MemSelector
    - Sequence : MemSequence
    - SimpleParallel
    - IfBranch
    - Switch
    - WeightSelector : Random select a child with weight
    - ShuffleSelector : Shuffle children of selector
- Decorators: [TODO] Abort children
    - If
    - And : [TODO]
    - Or : [TODO]
    - Bypass
    - ForceSuccess
    - TimeLimit
        - Return FAILURE when timeout, else return child statue
    - Cooldown : 
        - Start cooldown when child status is not RUNNING
        - Return FAILURE during cooldown, else return child statue
    - Repeat
    - RepeaterUntilFailure
    - RepeaterUntilSuccess
    - Invert
    - Limiter
- Actions:
    - Succeeder
    - Failer
    - Runner
    - Failer
    - Wait

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
    - ConditionA
        - TaskA
    - ConditionB
        - TaskB   
    - Bypass
        - TaskC

### While

```
while ConditionA
    TaskA
```

Map to

- RepeaterUntilFailure
    - ConditionA
        - TaskA

### Tick

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

- When closing a node, also close children nodes.