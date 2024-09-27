## Introduction

A container with trees, each tree is composed of nested folders.

- Author: Rex
- Game object

## Live demos

- [Tree](https://codepen.io/rexrainbow/pen/PoMqKKq)
- [Display json](https://codepen.io/rexrainbow/pen/NWJmgEL)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-trees)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add trees object
    ```javascript
    var trees = scene.rexUI.add.trees(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add trees object
    ```javascript
    var trees = scene.rexUI.add.trees(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Trees } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add trees object
    ```javascript    
    var trees = new Trees(scene, config);
    scene.add.existing(trees);
    ```

### Add instance

Trees contains [tree-node instance](#add-tree-object), each tree contains [tree instance](#add-tree-object) and [node instance](#add-node-object).

#### Add trees object

```javascript
var trees = scene.rexUI.add.trees({
    // x: 0,
    // y: 0,
    // anchor: undefined,
    // width: undefined,
    // height: undefined,
    // origin: 0.5
    // originX:
    // originY:

    orientation: 0,
    // rtl: false,

    // space: { left: 0, right:0, top:0, bottom:0, item:0 },

    tree: {
        // background: function(scene {isLeaf}) { return gameObject; },
        // background: backgroundStyle,

        // toggleButton: function(scene {isLeaf}) { return gameObject; },
        // toggleButton : triangleStyle,

        // nodeBackground: function(scene {isLeaf}) { return gameObject; },
        // nodeBackground: backgroundStyle,
        
        // nodeBody: function(scene {isLeaf}) { return gameObject; },
        // nodeBody: simpleLabelStyle,

        // transition: {
        //     duration: 200,
        //     expandCallback: undefined,
        //     collapseCallback: undefined,
        // },
    
        // orientation: 'y',

        //space: {
        //    indent: 0,
        //    indentLeft: 0, indentRight: 0, indentTop: 0, indentBottom: 0,
        //
        //    nodeLeft: 0, nodeRight: 0, nodeTop: 0, nodeBottom: 0,
        //    toggleButton: 0,
        //},

        // align: {
        //     title: 'left',
        //     child: 'left',
        // },

        // expand: {
        //     title: true,
        //     child: true,
        // },
    },

    // name: '',
    // draggable: false,
    // sizerEvents: false,
    // enableLayer: false,
});
```

- `x`, `y` : Position of this object, it is valid when this object is the top object.
- `anchor` : See [anchor](anchor.md#create-instance).
    - `left`, `right`, `centerX`, `x`, `top`, `bottom`, `centerY`, `y` : Position based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.
            - `'left'`(=0%), `'center'`(=50%), `'right'`(=100%)
            - `'top'`(=0%), `'center'`(=50%), `'bottom'`(=100%)
        - Offset : `'+n'`, or `'-n'`.
    - `width`, `height` : Set size (invoke `onResizeCallback`) based on visible window, which composed of
        - Percentage of visible width/height : `'p%'`, p: `0` ~ `100`.        
        - Padding : `'+n'`, or `'-n'`.
    - `onResizeCallback` : A default resize callback will be assigned interanlly. 
- `width`, `height` : Minimum width, minimum height.
- `origin`, `originX`, `originY` : Set origin of this sizer. Default value is (0.5, 0.5).
- `orientation` :
    - `'left-to-right'`, `'horizontal'`,`'h'`, `'x'`, or `0` : Put icon at left side, and text at right side.
    - `'top-to-bottom'`, `'vertical'`,`'v'`, `'y'`, or `1` : Put icon at top side, and text at bottom side.
- `rtl` : 
    - `true` : Layout children from right to left.
    - `false` : Layout children from left to right. Default behavior.
- `space` : Pads spaces.
    - `space.left`, `space.right`, `space.top`, `space.bottom` : Space of bounds.
    - `space.item` : Space between 2 children game objects.
- `tree` : Default configuration of node, optional.
    - `tree.background` :
        - Callback
            ```javascript
            function(scene, {isLeaf}) {
                return gameObject;
            }
            ```
            - `isLeaf` : 
                - `false` : This node is a tree-node.
                - `true` : This node is a leaf-node.
        - [Style of Background](ui-style.md#style-of-background) : Create Round-rectangle, Bar-rectangle, Nine-slice, or Image as background element.
        - `undefined` : Don't create any game object.
    - `tree.toggleButton`
        - Callback
            ```javascript
            function(scene, {isLeaf}) {
                return gameObject;
            }
            ```
            - `isLeaf` : 
                - `false` : This node is a tree-node.
                - `true` : This node is a leaf-node.
        - [Style of triangle](shape-triangle2.md#create-instance), default behavior.
            ```javascript
            {
                color: undefined,
                alpha: 1,
            
                strokeColor: undefined,
                strokeAlpha: 1,
                strokeWidth: 1,
                arrowOnly: false,
            
                easeDuration: 0,
            }
            ```
    - `tree.nodeBackground`
        - Callback
            ```javascript
            function(scene, {isLeaf}) {
                return gameObject;
            }
            ```
            - `isLeaf` : 
                - `false` : This node is a tree-node.
                - `true` : This node is a leaf-node.
        - [Style of Background](ui-style.md#style-of-background) : Create Round-rectangle, Bar-rectangle, Nine-slice, or Image as background element.
        - `undefined` : Don't create any game object.
    - `tree.nodeBody`
        - Callback
            ```javascript
            function(scene, {isLeaf}) {
                return gameObject;
            }
            ```
            - `isLeaf` : 
                - `false` : This node is a tree-node.
                - `true` : This node is a leaf-node.
        - [Style of simple label](ui-style.md#style-of-simplelabel) : Create Simple-label as node body element. Default behavior.
    - `tree.transition` : Configuration of expanding/collapsing transition.
        - `tree.transition.duration` : Duration of expanding/collapsing transition.
        - `tree.transition.expandCallback` : Callback invoked when expading child. Default behavior is scale-up.
        - `tree.transition.collapseCallback` : Callback invoked when collapsing child. Default behavior is scale-down.
    - `tree.space` : Pads spaces of tree.        
        - `tree.space.indent`, `tree.space.indentLeft`, `tree.space.indentRight`, `tree.space.indentTop`, `tree.space.indentBottom` : Space of node's bounds.
        - `tree.space.nodeLeft`, `tree.space.nodeRight`, `tree.space.nodeTop`, `tree.space.nodeBottom` : Space of node child's bounds.
        - `tree.space.toggleButton` : Space between toggle button and next child.
    - `tree.align.title`, `tree.align.child` : Alignment of title, child game objects.    
        - `undefined`, or `'left'`, or `'top'` : Align game objects at left, or top. Default behavior.
        - `'center'` : Align game objects at center.
        - `'right'`, or `'bottom'` : Align game objects at right, or bottom.
    - `tree.expand.title`, `tree.expand.child` : Expand width/height of title, child game objects.    
        - `true` : Expand width/heigh. Default behavior.
        - `false` : Use origin width/height.
- `name` : Set name of this game object.
- `draggable` : Set `true` to drag top-most object.
- `sizerEvents` : Set `true` to fire [sizer events](ui-basesizer.md#events). Default value is `false`.
- `enableLayer` : 
    - `false` : Add child game objects into scene's display list. Default behavior.
    - `true` : Add child game objects into an internal [layer game object](layer.md). [See also](containerlite.md#layer).

#### Add tree object

```javascript
var tree = trees.addTree();
// var tree = trees.addTree(nodeKey);
```
```javascript
var subTree = tree.addTree();
// var subTree = tree.addTree(nodeKey);
```

or

```javascript
var tree = trees.addTree({
    // nodeKey: UUID()

    // background: backgroundGameObject,
    // background: function(scene {isLeaf}) { return gameObject; },
    // background: backgroundStyle,

    toggleButton: toggleButtonGameObject,
    // toggleButton: function(scene {isLeaf}) { return gameObject; },
    // toggleButton : triangleStyle,

    // nodeBackground: nodeBackgroundGameObject,
    // nodeBackground: function(scene {isLeaf}) { return gameObject; },
    // nodeBackground: backgroundStyle,

    nodeBody: nodeBodyGameObject,
    // nodeBody: function(scene {isLeaf}) { return gameObject; },
    // nodeBody: simpleLabelStyle,

    // transition: {
    //     duration: 200,
    //     expandCallback: undefined,
    //     collapseCallback: undefined,
    // },

    // orientation: 'y',

    // space: {
    //     indent: 0,
    //     indentLeft: 0, indentRight: 0, indentTop: 0, indentBottom: 0,
    // 
    //     nodeLeft: 0, nodeRight: 0, nodeTop: 0, nodeBottom: 0,
    //     toggleButton: 0,
    // },
    
    // align: {
    //     title: 'left',
    //     child: 'left',
    // },

    // expand: {
    //     title: true,
    //     child: true,
    // },
})
```
```javascript
var subTree = tree.addTree(config);
```

- `nodeKey` : Store reference of this tree instance by this unique string. Get tree back by `trees.getTree(nodeKey)`
    - An unique string, does not contain `.`
    - `undefined` : Create unique string by [UUID](uuid.md#usage)
- `background` :
    - A game object
    - Callback
        ```javascript
        function(scene, {isLeaf}) {
            return gameObject;
        }
        ```
        - `isLeaf` : 
            - `false` : This node is a tree-node.
            - `true` : This node is a leaf-node.
    - [Style of Background](ui-style.md#style-of-background) : Create Round-rectangle, Bar-rectangle, Nine-slice, or Image as background element.
    - `undefined` : Don't create any game object.
- `toggleButton`
    - A game object
    - Callback
        ```javascript
        function(scene, {isLeaf}) {
            return gameObject;
        }
        ```
        - `isLeaf` : 
            - `false` : This node is a tree-node.
            - `true` : This node is a leaf-node.
    - [Style of triangle](shape-triangle2.md#create-instance), default behavior.
        ```javascript
        {
            color: undefined,
            alpha: 1,
        
            strokeColor: undefined,
            strokeAlpha: 1,
            strokeWidth: 1,
            arrowOnly: false,
        
            easeDuration: 0,
        }
        ```
- `nodeBackground`
    - A game object
    - Callback
        ```javascript
        function(scene, {isLeaf}) {
            return gameObject;
        }
        ```
        - `isLeaf` : 
            - `false` : This node is a tree-node.
            - `true` : This node is a leaf-node.
    - [Style of Background](ui-style.md#style-of-background) : Create Round-rectangle, Bar-rectangle, Nine-slice, or Image as background element.
    - `undefined` : Don't create any game object.
- `nodeBody`
    - A game object
    - Callback
        ```javascript
        function(scene, {isLeaf}) {
            return gameObject;
        }
        ```
        - `isLeaf` : 
            - `false` : This node is a tree-node.
            - `true` : This node is a leaf-node.
    - [Style of simple label](ui-style.md#style-of-simplelabel) : Create Simple-label as node body element. Default behavior.


#### Add node object

- Add default node game object
    ```javascript
    var node = tree.addNode();
    // var node = tree.addNode(nodeKey);
    ```
    - `nodeKey` : Store reference of this tree instance by this unique string. Get tree back by `trees.getTree(nodeKey)`
        - An unique string, does not contain `.`
        - `undefined` : Create unique string by [UUID](uuid.md#usage)
- Add custom node game object
    ```javascript
    var node = tree.addNode(gameObject);
    // var node = tree.addNode(gameObject, nodeKey);
    ```

#### Insert tree object

```javascript
var tree = trees.insertTree(index);
// var tree = trees.insertTree(index, nodeKey);
// var tree = trees.insertTree(index, config);
```
```javascript
var subTree = tree.insertTree(index);
// var subTree = tree.insertTree(index, nodeKey);
// var subTree = tree.insertTree(index, config);
```

#### Insert node object

- Insert default node game object
    ```javascript
    var node = tree.insertTree(index);
    // var node = tree.insertTree(index, nodeKey);
    ```
- Insert custom node game object
    ```javascript
    var node = tree.insertTree(index, gameObject);
    // var node = tree.insertTree(index, gameObject, nodeKey);
    ```

### Custom class

- Define class
    ```javascript
    class MyTrees extends RexPlugins.UI.Trees {
        constructor(scene, config) {
            super(scene, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var trees = new MyTrees(scene, config);
    ```

### Layout children

Arrange position of all elements.

```javascript
trees.layout();
```

See also - [dirty](ui-basesizer.md#dirty)

!!! note
    Layout topmost sizer when expanding/collapsing start.

### Remove tree or node

#### Remove tree

- Remove tree without destroying
    ```javascript
    trees.removeTree(tree);
    ```
    ```javascript
    tree.removeTree(subTree);
    ```
    ```javascript
    tree.removeTree(nodeKey);
    ```
- Remove tree and destroying
    ```javascript
    trees.removeTree(tree, true);
    ```
    ```javascript
    tree.removeTree(subTree, true);
    ```
    ```javascript
    tree.removeTree(nodeKey, true);
    ```
- Remove all trees without destroying
    ```javascript
    trees.removeAllNodes();
    ```
    ```javascript
    tree.removeAllNodes();
    ```
- Remove all trees and destroying
    ```javascript
    trees.removeAllNodes(tree);
    ```
    ```javascript
    tree.removeAllNodes(tree);
    ```


#### Remove subTree or node

- Remove subTree or node without destroying
    ```javascript
    tree.removeNode(subTree);
    ```
    ```javascript
    tree.removeNode(node);
    ```
    ```javascript
    tree.removeNode(nodeKey);
    ```
- Remove subTree or node and destroying
    ```javascript
    trees.removeNode(subTree, true);
    ```
    ```javascript
    tree.removeNode(node, true);
    ```
    ```javascript
    tree.removeNode(nodeKey, true);
    ```
- Remove all sub-trees and nodes without destroying
    ```javascript
    tree.removeAllNodes();
    ```
- Remove all sub-trees and nodes and destroying
    ```javascript
    tree.removeAllNodes(tree);
    ```

### Get sub-tree or node

- Get sub-tree
    ```javascript
    var tree = trees.getTree(nodeKey);
    ```
    ```javascript
    var tree = subTree.getTree(nodeKey);
    ```
- Get sub-tree/node
    ```javascript
    var tree = trees.getNode(nodeKeys);
    ```    
    ```javascript
    var tree = subTree.getNode(nodeKeys);
    ```
    - `nodeKeys` : nodeKeys connected by `.`, e.x. `key0.key1.key2...`
- Get all child nodes in this tree
    ```javascript
    var nodes = tree.getNodes();
    // var nodes = tree.getNodes(out);
    ```
- Get all child nodes including all descendant nodes
    ```javascript
    var nodes = tree.getAllNodes();
    // var nodes = tree.getAllNodes(out);
    ```

### Get parent or root tree

- Get parent (tree)
    ```javascript
    var patent = tree.getTreePatent();
    ```
    ```javascript
    var patent = node.getTreePatent();
    ```
- Get root (tree)
    ```javascript
    var root = tree.getTreeRoot();
    ```
    ```javascript
    var root = node.getTreeRoot();
    ```

### Get element

- Get element in a tree
    - Background game object
        ```javascript
        var background = tree.getElement('background');
        ```
    - Toggle button game object
        ```javascript
        var toggleButton = trees.getElement('toggleButton');
        ```
    - Node-body game object
        ```javascript
        var nodeBody = trees.getElement('nodeBody');
        ```
    - Children-node list game objects
        ```javascript
        var childrenNodes = trees.getElement('childrenNodes');
        ```
- Get by name
    ```javascript
    var gameObject = trees.getElement('#' + name);
    // var gameObject = trees.getElement('#' + name, recursive);
    ```
    or
    ```javascript
    var gameObject = trees.getByName(name);
    // var gameObject = trees.getByName(name, recursive);
    ```
    - `recursive` : Set `true` to search all children recursively.
