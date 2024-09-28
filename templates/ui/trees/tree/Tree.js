import ExtendNodeClass from './node/NodeBase.js';
import Folder from '../../folder/Folder.js';
import Methods from './methods/Methods.js';
import CreateGameObjectFromConfig from '../builders/CreateGameObjectFromConfig.js';
import DefaultCreateBackgroundCallback from '../builders/DefaultCreateBackgroundCallback.js';
import CreateTitleSizer from './node/CreateTitleSizer.js';
import CreateChildrenSizer from './node/CreateChildrenSizer.js';
import GetOrientationMode from '../../utils/GetOrientationMode.js';
import Merge from '../methods/Merge.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Tree extends ExtendNodeClass(Folder) {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var background = CreateGameObjectFromConfig(
            scene,
            GetValue(config, 'background'),   // config
            { isLeaf: false },                // callbackData
            DefaultCreateBackgroundCallback,  // defaultCallback
            false                             // isRequired
        );

        var child = CreateChildrenSizer(scene, config);
        var childrenNodes = child.childrenMap.items;

        var title = CreateTitleSizer(scene, config);
        var toggleButton = title.childrenMap.toggleButton;
        var nodeBody = title.childrenMap.nodeBody;

        var orientation = GetOrientationMode(GetValue(config, 'orientation', 'y'));

        var spaceConfig = config.space;
        if (spaceConfig) {
            var indent = GetValue(spaceConfig, 'indent', 0);
            spaceConfig.childLeft = GetValue(spaceConfig, 'indentLeft', (orientation === 1) ? indent : 0);
            spaceConfig.childRight = GetValue(spaceConfig, 'indentRight', 0);
            spaceConfig.childTop = GetValue(spaceConfig, 'indentTop', (orientation === 0) ? indent : 0);
            spaceConfig.childBottom = GetValue(spaceConfig, 'indentBottom', 0);
        }

        var folderConfig = {
            background: background,
            title: title,
            child: child,

            toggleByTarget: toggleButton,
            transition: config.transition,

            orientation: orientation,
            space: spaceConfig,
            align: config.align,
            expand: config.expand,
        };

        super(scene, folderConfig);
        this.type = 'rexTree';

        this.rexSizer.treeParent = null;
        this.nodesMap = {};
        this.configSave = config;

        this.nodeBody = nodeBody;
        this.addChildrenMap('toggleButton', toggleButton);
        this.addChildrenMap('nodeBody', nodeBody);
        this.addChildrenMap('childrenNodes', childrenNodes);

        // Route events
        this
            .on('expand.start', function () {
                toggleButton.emit('expand.start', toggleButton);
                FireTreesSizerEvent(this, 'expand.start');
            }, this)
            .on('expand.complete', function () {
                toggleButton.emit('expand.complete', toggleButton);
                FireTreesSizerEvent(this, 'expand.complete');
            })
            .on('collapse.start', function () {
                toggleButton.emit('collapse.start', toggleButton);
                FireTreesSizerEvent(this, 'collapse.start');
            })
            .on('collapse.complete', function () {
                toggleButton.emit('collapse.complete', toggleButton);
                FireTreesSizerEvent(this, 'collapse.complete');
            })

        // Run this callback after adding to parent tree    
        var tree = this;
        tree._postAddCallback = function () {
            var expanded = GetValue(config, 'expanded', true);
            if (expanded !== undefined) {
                tree.setExpandedState(expanded);
            }
            delete tree._postAddCallback;
        }
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.configSave = undefined;

        Clear(this.nodesMap);
        this.nodesMap = undefined;

        super.destroy(fromScene);
    }

    get isTree() {
        return true;
    }

    createTree(config) {
        return Tree.CreateTree(this.scene, this.configSave, config)
    }

    isTreeObject(gameObject) {
        return gameObject && gameObject instanceof (Tree);
    }
}

// Static method
Tree.CreateTree = function (scene, defaultConfig, overrideConfig) {
    return new Tree(scene, Merge(defaultConfig, overrideConfig));
}

var FireTreesSizerEvent = function (tree, eventName) {
    var treesSizer = tree.getTreesSizer();
    if (treesSizer) {
        treesSizer.emit(eventName, tree);
    }
}

Object.assign(
    Tree.prototype,
    Methods
)

export default Tree;