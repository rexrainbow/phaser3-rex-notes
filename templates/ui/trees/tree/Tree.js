import ExtendNodeClass from './NodeBase.js';
import Folder from '../../folder/Folder.js';
import Methods from './methods/Methods.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';
import CreateTitleSizer from './CreateTitleSizer.js';
import CreateChildrenSizer from './CreateChildrenSizer.js';
import GetOrientationMode from '../../utils/GetOrientationMode.js';
import Merge from '../methods/Merge.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Tree extends ExtendNodeClass(Folder) {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var background = GetGameObjectFromConfig(
            scene,
            config, 'background',
            { isLeaf: false }
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

        this.addChildrenMap('toggleButton', toggleButton);
        this.addChildrenMap('nodeBody', nodeBody);
        this.addChildrenMap('childrenNodes', childrenNodes);

        this
            .on('expand.start', function () {
                toggleButton.emit('expand.start', toggleButton)
            })
            .on('expand.complete', function () {
                toggleButton.emit('expand.complete', toggleButton)
            })
            .on('collapse.start', function () {
                toggleButton.emit('collapse.start', toggleButton)
            })
            .on('collapse.complete', function () {
                toggleButton.emit('collapse.complete', toggleButton)
            })

        var expanded = GetValue(config, 'expanded', true);
        if (expanded !== undefined) {
            this.setExpandedState(expanded);
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

    createTree(config) {
        return Tree.CreateTree(this.scene, this.configSave, config)
    }

    isTree(gameObject) {
        return (!!gameObject) && gameObject instanceof (TreeNode);
    }
}

// Static method
Tree.CreateTree = function (scene, defaultConfig, overrideConfig) {
    return new Tree(scene, Merge(defaultConfig, overrideConfig));
}

Object.assign(
    Tree.prototype,
    Methods
)

export default Tree;