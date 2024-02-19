import Folder from '../../folder/Folder.js';
import Methods from './Methods.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';
import CreateTitleSizer from './CreateTitleSizer.js';
import CreateChildrenSizer from './CreateChildrenSizer.js';
import Merge from '../methods/Merge.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TreeNode extends Folder {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Bug: no `this` here, before invoking super()
        var background = GetGameObjectFromConfig(this, config, 'background');

        var child = CreateChildrenSizer(this, config);

        var title = CreateTitleSizer(this, config);
        var toggleButton = title.childrenMap.toggleButton;
        var node = title.childrenMap.node;

        var folderConfig = {
            orientation: GetValue(config, 'orientation', 'y'),

            background: background,
            title: title,
            child: child,

            toggleByTarget: toggleButton,

            transition: config.transition,

            align: config.align,

            expand: config.expand
        };

        super(scene, folderConfig);
        this.type = 'rexTree';
        this.rexSizer.treeParent = null;
        this.configSave = config;

        this.addChildrenMap('toggleButton', toggleButton);
        this.addChildrenMap('node', node);
    }

    createTree(config) {
        var tree = new TreeNode(this.scene, Merge(this.configSave, config));
        return tree;
    }

    isTree(gameObject) {
        return gameObject instanceof (TreeNode);
    }
}

Object.assign(
    TreeNode.prototype,
    Methods
)

export default TreeNode;