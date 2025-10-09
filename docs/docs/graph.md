## Introduction

Core object of Graph system.

- Author: Rex
- Member of scene

## Live demos

- [Random connection](https://codepen.io/rexrainbow/pen/ByjLZLw)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/graph)

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

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Graph } from 'phaser3-rex-plugins/plugins/graph-components.js';
    ```
- Add graph object
    ```javascript
    var graph = new Graph(scene, config);
    ```

### Add graph object

```javascript
var graph = scene.rexGraph.add.graph({

});
```

### Custom class

- Define class
    ```javascript
    class MyGraph extends RexPlugins.Graph.Graph {
        constructor(scene) {
            super(scene);
            // ...
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var graph = new MyGraph(scene);
    ```

### Add node or edge

#### Add node

```javascript
graph.addNode(nodeGameObject);
```

#### Add edge

```javascript
graph.addEdge(edgeGameObject, nodeAGameObject, nodeBGameObject)
```

#### Is node or edge

```javascript
var isNode = grapg.isNode(gameObject);
```

```javascript
var isEdge = grapg.isEdge(gameObject);
```

```javascript
var isNodeOrEdge = graph.exists(gameObject);
```

### Remove node or edge

#### Remove node or edge

```javascript
graph.remove(gameObject);
// graph.remove(gameObject, destroy);
```

- `destroy` : Default value is `false`

#### Remove node

```javascript
graph.removeNode(nodeGameObject);
// graph.removeNode(nodeGameObject, destroy);
```

- `destroy` : Default value is `false`

#### Remove all nodes

```javascript
graph.removeNode();
// graph.removeNode(destroy);
```

- `destroy` : Default value is `false`

#### Remove edge

```javascript
graph.removeEdge(edgeGameObject);
// graph.removeEdge(edgeGameObject, destroy);
```

- `destroy` : Default value is `false`

#### Remove all edges

```javascript
graph.removeAllEdges();
// graph.removeAllEdges(destroy);
```

- `destroy` : Default value is `false`

#### Remove all nodes and edges

```javascript
graph.clear();
// graph.clear(destroy);
```

- `destroy` : Default value is `false`

### Get node or edge

#### Get all nodes

```javascript
var nodeGameObjects = graph.getAllNodes();
// var nodeGameObjects = graph.getAllNodes(out);
```

#### Get all edges 

```javascript
var edgeGameObjects = graph.getAllEdges();
// var edgeGameObjects = graph.getAllEdges(out);
```

#### Get connected nodes of an edge

```javascript
var nodeGameObjects = graph.getNodesOfEdge(edgeGameObject);
// var nodeGameObjects = graph.getNodesOfEdge(edgeGameObject, out);
```

#### Get opposite node

```javascript
var nodeGameObject = graph.getOppositeNode(nodeGameObject, edgeGameObject);
```

#### Get all edges connected to a node

```javascript
var edgeGameObjects = graph.getEdgesOfNode(nodeGameObject);
// var edgeGameObjects = graph.getEdgesOfNode(nodeGameObject, out);
```

#### Get neighbor nodes

```javascript
var nodeGameObject = graph.getNeighborNodes(nodeGameObject);
// var nodeGameObject = graph.getNeighborNodes(nodeGameObject, out);
```

Are neighbor node

```javascript
var areNeighborNode = graph.areNeighborNodes(nodeAGameObject, nodeBGameObject);
```

#### Get edge length

Length between connected nodes of this edge

```javascript
var length = graph.getEdgeLength(edgeGameObject);
```

#### For each node or edge game object

```javascript
graph.forEachGameObject(function(gameObject){

})
```

### Container

Add nodes and edges into container, 
adjust node and edge positions to fit the container and update its size.

```javascript
graph.fitContainer(container);
// graph.fitContainer(container, padding);
```

- `container` : [p3-container](container.md)

### Layer

- Add nodes and edges into layer
    ```javascript
    graph.addToLayer(layer);
    ```
- Adjust node and edge positions
    ```javascript
    graph.setGraphOffset(x, y);
    ```
    - Default offset is `(0, 0)`

### Bounds

#### Get bounds

```javascript
var bounds = graph.getBounds();
// var bounds = graph.getBounds(out);
```

- `bounds` : [Rectangle](geom-rectangle.md)

#### Draw bounds

```javascript
graph.drawBounds(graphics, color);
```

- `graphics` : [Graphics](graphics.md)

### Attribute

Attribute = private data of node or edge, used for layout ([ELK-layout](graph-elk-layout.md))

#### Set attribute

- Set attribute of node or edge
    ```javascript
    graph.setAttribute(gameObject, key, value);
    ```
- Set attribute of node
    ```javascript
    graph.setNodeAttribute(gameObject, key, value);
    ```
- Set attribute of nodes
    ```javascript
    graph.setNodesAttribute(gameObjects, key, value);
    ```
- Set attribute of edge
    ```javascript
    graph.setEdgeAttribute(gameObject, key, value);
    ```
- Set attribute of edges
    ```javascript
    graph.setEdgesttribute(gameObjects, key, value);
    ```

#### Get attribute

- Get attribute of node or edge
    ```javascript
    var value = graph.getAttribute(gameObject, key);
    ```
- Get attribute of node
    ```javascript
    var value = graph.setNodeAttribute(gameObject, key);
    ```
- Get attribute of edge
    ```javascript
    var value = graph.setEdgesAttribute(gameObjects, key);
    ```
