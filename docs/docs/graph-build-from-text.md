## Introduction

Create node and edge game objects from text.

- Author: Rex
- Method

## Live demos

- [Graph in container](https://codepen.io/rexrainbow/pen/pvgbjGz)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/graph-layout)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexgraphplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexgraphplugin.min.js', 'rexGraph', 'rexGraph');
    ```
- Add graph object
    ```javascript
    var graph = scene.rexGraph.add.graph(config);
    ```
- Create node and edge game objects from text
    ```javascript
    scene.rexGraph.buildGraphFromText(graph, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import GraphPlugin from 'phaser3-rex-plugins/plugins/graph-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexGraph',
                plugin: GraphPlugin,
                mapping: 'rexGraph'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add graph object
    ```javascript
    var graph = scene.rexGraph.add.graph(config);
    ```
- Create node and edge game objects from text
    ```javascript
    scene.rexGraph.buildGraphFromText(graph, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Graph, BuildGraphFromText } from 'phaser3-rex-plugins/plugins/graph-components.js';
    ```
- Add graph object
    ```javascript
    var graph = new Graph(scene, config);
    ```
- Create node and edge game objects from text
    ```javascript
    BuildGraphFromText(graph, config);
    ```

### Create node and edge game objects from text

```javascript
scene.rexGraph.buildGraphFromText(graph, {
    onCreateNodeGameObject(scene, id, parameters) {
        return gameObject;
    },

    onCreateEdgeGameObject(scene, id, parameters) {
        return gameObject;
    },

    text: text
});
```

- `graph` : [Graph](graph.md) object
- `onCreateNodeGameObject` : Callback to create node game object
    ```javascript
    function(scene, id, parameters) {
        return gameObject;
    }
    ```
    - `gameObject` : Game object with position (`{x, y}`) and size (`{width, height}`)
    - `parameters` : See [Syntax of text](#syntax-of-text)
- `onCreateEdgeGameObject` : Callback to create edge game object. Default value is
    ```javascript
    function (scene, id, parameters) {
        var {
            color = 0xffffff,
            width = 2,
            type = 'poly',
            head = 'none',
            tail = 'none,'
        } = parameters;
        var gameObject = new Line(scene, {
            color: color,
            lineWidth: width,
            lineType: type,
            headShape: head,
            tailShape: tail,
        })
        scene.add.existing(gameObject);
        return gameObject;
    }
    ```
    - `gameObject` : [Line-shape](shape-line2.md)
    - `parameters` : See [Syntax of text](#syntax-of-text)
- `text` : See [Syntax of text](#syntax-of-text)


### Syntax of Text

Example:

```text
NODE [
    padding=3,
    color=0x888888
    ]

A [label=A, elk.layered.priority=1]
B [label=B]

A -> B -> C [color=0xFF0000]
A -> * -> D

E -> *1 -> F
G -> *1

H *> I
```

#### Node Defaults

```
NODE [key=value, ...]
```

- Declares default parameters for all subsequent nodes.
- Example:
    ```text
    NODE [padding=3, color=0x888888]
    ```
- Every new node inherits these attributes unless overridden.

#### Edge Defaults

```
EDGE [key=value, ...]
```

- Declares default parameters for all subsequent edges.
- Example:
    ```text
    EDGE [color=0x888888, width=2]
    ```

#### Node Definition

```
<nodeId> [key=value, ...]
```

- Declares or updates a single node.
- Attributes in brackets overwrite the default `NODE` parameters.
- Example:
    ```text
    A [label=A, elk.layered.priority=1]
    B [label=B]
    ```
- If no attribute block is provided, the node is still created with defaults.

#### Edge Definition

```
<source> -> <target>
<source> -> <mid> -> <target>
```

- Defines connections between nodes.
- A chain like `A -> B -> C` creates two edges:
    ```
    A -> B
    B -> C
    ```
- Attributes in brackets (`[ ... ]`) after the chain apply to all edges in that chain.
- Example:
    ```
    A -> B -> C [color=0xFF0000]
    ```

#### Dummy Nodes

Used to control layout (width=0, height=0) without creating visible node objects.

Syntax:

- `*` : Anonymous dummy node
- `*name` : Named dummy node

Examples:

```
A -> * -> D       # Creates a new dummy node between A and D
E -> *1 -> F      # Creates or reuses a named dummy node "*1"
G -> *1           # Reuses the same named dummy node
```

Builder won't create game object for dummy node, they exist only for layout.

Equal to

```javascript
graph.addNode(graph.createDummyNode());
```

See also [ELK layout](graph-elk-layout.md#layout-alignment-assistant)

#### Invisible Edges

```
<nodeA> *> <nodeB>
```

- Defines an invisible edge.
- Builder won't create game object for invisible edge, they exist only for layout.
- Example:
    ```text
    H *> I
    ```

Equal to

```javascript
graph.addEdge(graph.createInvisibleEdge());
```

See also [ELK layout](graph-elk-layout.md#layout-alignment-assistant)

#### Attribute Blocks

```
[key=value, key2=value2, ...]
```

- Enclosed in square brackets.
- Commas are optional before newlines.
- Acceptable value types:
    - Numbers: `3`, `2.5`
    - Hexadecimal: `0x888888`
    - Strings: `"text"` or `'text'`
    - Identifiers: `solid`, `circle`
- Example:
    ```
    [label="Start", color=0xFF0000, elk.layered.priority=1]
    ```

#### Comments

Three comment styles are supported:

```text
# comment
// comment
/* multi-line
   comment */
```

Comments can appear anywhere and are ignored.

#### Statement Endings

Statements may be separated by:

- A newline (`\n`)
- A semicolon (`;`)

Example:

```text
A [label="Node A"];
B [label="Node B"]
A -> B
```


#### Summary of Core Constructs

| Type            | Syntax                 | Description                                   |
| --------------- | ---------------------- | --------------------------------------------- |
| Node defaults   | `NODE [key=value]`     | Define attributes applied to all future nodes |
| Edge defaults   | `EDGE [key=value]`     | Define attributes applied to all future edges |
| Node            | `A [key=value]`        | Create or update node A                       |
| Edge            | `A -> B`               | Create edge A→B                               |
| Edge chain      | `A -> B -> C`          | Create multiple edges                         |
| Edge attributes | `A -> B [key=value]`   | Attributes applied to all edges in the chain  |
| Dummy node      | `*` or `*name`         | Invisible node for layout                     |
| Invisible edge  | `A *> B`               | Hidden edge for layout                        |
| Comment         | `#`, `//`, `/* ... */` | Ignored                                       |
| Statement end   | `;` or newline         | Both accepted                                 |

---

#### Complete Example

```
# Define node and edge defaults
NODE [shape="circle", padding=5]
EDGE [color=0x999999, width=2]

# Define nodes
A [label="Start"]
B [label="Middle"]
C [label="End"]

# Define edges
A -> B -> C [color=0xFF0000]   # Colored chain
A -> * -> D                    # Dummy node between A and D
E -> *1 -> F                   # Named dummy node used twice
G -> *1                        # Reuse *1 again
H *> I                         # Invisible edge
```
