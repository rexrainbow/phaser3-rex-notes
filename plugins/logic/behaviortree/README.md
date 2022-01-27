# BehaviorTree

Reference: https://github.com/behavior3/behavior3js/

## Nodes

- Composite Nodes: [TODO] Close child nodes
    - Selector : MemSelector
    - Sequence : MemSequence
    - Parallel :
        - First child is main task
        - Return status of main task
    - IfSelector
    - SwitchSelector
    - WeightSelector : Random select a child with weight
    - ShuffleSelector : Shuffle children of selector
- Decorators: [TODO] Abort children
    - If
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
    - And : [TODO]
    - Or : [TODO]
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