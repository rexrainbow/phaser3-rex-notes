# YAMLEventSheets

`YAMLEventSheets` is a thin wrapper around `JSONEventSheets` that accepts event sheet definitions written in YAML. It parses the provided YAML text using `ParseYaml` and then delegates to `JSONEventSheets` to build the behavior tree.

```javascript
import YAMLEventSheets from './YAMLEventSheets.js';

const sheets = new YAMLEventSheets(scene);
sheets.addEventSheet(`
title: Task Name
script:
  - name: move
`);
```

The first argument of `addEventSheet` can be either a YAML string or a pre-parsed JavaScript object.

## YAML Event Sheet Format Description

### 1. Basic Structure

```yaml
title: Task Name
groupName: Optional Group Name      # Default is '_'; can be overridden by addEventSheet's groupName
parallel: false                     # true: runs in parallel with other sheets
active: true                        # Whether enabled
once: false                         # true: disabled after one execution
condition:                          # Execution condition for the event sheet
  - ...
script:                             # Main process script
  - ...
fallback:                              # Recovery script executed when top-level condition is false (optional)
  - ...
```

`script` and `fallback` are arrays of actions converted into behavior tree nodes and added to the event sheet. The `fallback` block runs only when the top-level `condition` evaluates to `false`.

---

## 2. condition Format

### String: Single Boolean Expression

```yaml
condition: "hp > 0 && mp > 0"
```

### Array: Represents OR

Elements can be:

* **String**: Single expression
* **Array**: Represents AND, e.g., `["a", "b"]` → `(a) && (b)`
* **Object `{and: [...]}`**: Equivalent to AND

```yaml
condition:
  - "score > 0"                    # (score > 0)
  - ["hp > 0", "mp > 0"]           # OR ((hp > 0) && (mp > 0))
  - and: ["stage == 1", "boss"]    # OR ((stage == 1) && (boss))
```

> **Note**: When omitted or malformed, defaults to `"true"`.
> This format also applies to any action's `condition` field (e.g., `command`, `while`, `label`, `exit`, `break`, `activate`, `deactivate`, etc.).

---

## 3. script Action Types and Fields

### 3.1 `command` (default type)

| Field        | Description                                                          |
| ------------ | -------------------------------------------------------------------- |
| `type`       | Optional; defaults to `command`                                      |
| `name`       | Command name                                                         |
| `parameters` | Parameter object; use `#(expr)` for evaluation or `{{}}` as template |
| `condition`  | Optional expression controlling execution                            |

#### Example

```yaml
- name: move
  condition: "hp > 0"
  parameters:
    x: 100
    speed: "#(baseSpeed*2)"
    msg: "Hello {{player}}"
```

### 3.2 `if`

| Field      | Description                   |
| ---------- | ----------------------------- |
| `branches` | Array of conditional branches |

Each branch may include:

* `condition`: Expression; omitted means `else`
* `actions`: Array of actions to execute if condition is true

#### Example

```yaml
- type: if
  branches:
    - condition: "hp <= 0"
      actions:
        - name: gameOver

    - condition: ["hasKey", "doorLocked == false"]
      actions:
        - name: openDoor

    - actions:              # No condition → else
        - name: wait
```

### 3.3 `while`

| Field       | Description              |
| ----------- | ------------------------ |
| `condition` | Expression               |
| `actions`   | Array of actions in loop |

#### Example

```yaml
- type: while
  condition: "enemyAlive"
  actions:
    - name: attack
```

### 3.4 `repeat`

| Field     | Description              |
| --------- | ------------------------ |
| `times`   | Number of repetitions    |
| `actions` | Array of actions in loop |

#### Example

```yaml
- type: repeat
  times: 3
  actions:
    - name: jump
```

### 3.5 `label`

| Field       | Description               |
| ----------- | ------------------------- |
| `title`     | Block name                |
| `condition` | Additional condition      |
| `actions`   | Array of actions in block |

#### Example

```yaml
- type: label
  title: "PowerUp"
  condition: "hasItem"
  actions:
    - name: applyBuff
```

### 3.6 `exit`

| Field       | Description                          |
|-------------|--------------------------------------|
| `condition` | Optional expression to trigger exit  |

Immediately terminates the event sheet.

```yaml
- type: exit
  condition: "hp <= 0"
```

### 3.7 `break`

| Field       | Description                               |
|-------------|-------------------------------------------|
| `condition` | Optional expression to trigger the break  |

Interrupts the current sequence (returns failure).

```yaml
- type: break
  condition: "enemyFled"
```

### 3.8 `activate`

| Field       | Description                          |
| ----------- | ------------------------------------ |
| `target`    | Target event sheet title             |
| `condition` | Optional expression to trigger call |

#### Example

```yaml
- type: activate
  target: AnotherSheet
```

### 3.9 `deactivate`

| Field       | Description                          |
| ----------- | ------------------------------------ |
| `target`    | Target event sheet title             |
| `condition` | Optional expression to trigger call |

#### Example

```yaml
- type: deactivate
  target: AnotherSheet
```

---

## 4. `fallback` Actions

`fallback` is an **array of actions** at the same level as `script`.
When the top-level `condition` evaluates to **false**, causing the `script` block to **not execute at all**, the system will instead execute the actions listed in `fallback` in order.
After execution, the overall process will still end in a **failure** state (wrapped in a `ForceFailure` node), allowing higher-level handlers to intercept or log the event.
In other words, `fallback` does not catch exceptions during `script` execution, but rather provides an alternative flow for cases where the conditions are not met.