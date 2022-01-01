# Behavior3

Reference: https://github.com/behavior3/behavior3js/

## Core Classes

This library include the following core structures...

- BehaviorTree: the structure that represents a Behavior Tree;
- Blackboard: represents a "memory" in an agent and is required to to run a `BehaviorTree`;
- Composite: base class for all composite nodes;
- Decorator: base class for all decorator nodes;
- Action: base class for all action nodes;
- Condition: base class for all condition nodes;
- Tick: used as container and tracking object through the tree during the tick signal;
- BaseNode: the base class that provide all common node features;

## Nodes

- Composite Nodes: 
    - Sequence
    - Selector
    - MemSequence
    - MemSelector
- Decorators:
    - Inverter
    - Limiter
    - MaxTime
    - Repeater
    - RepeaterUntilFailure
    - RepeaterUntilSuccess
- Actions:
    - Succeeder
    - Failer
    - Error
    - Runner
    - Wait