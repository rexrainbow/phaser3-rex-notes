import Folder from '../../folder/Folder.js';
import Methods from './Methods.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';
import CreateTitleSizer from './CreateTitleSizer.js';
import CreateChildrenSizer from './CreateChildrenSizer.js';
import GetOrientationMode from '../../utils/GetOrientationMode.js';
import Merge from '../methods/Merge.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TreeNode extends Folder {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var background = GetGameObjectFromConfig(scene, config, 'background');

        var child = CreateChildrenSizer(scene, config);

        var title = CreateTitleSizer(scene, config);
        var toggleButton = title.childrenMap.toggleButton;
        var node = title.childrenMap.node;

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
        tree.expand(0);
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