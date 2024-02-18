import Folder from '../../folder/Folder.js'
import CreateTitleSizer from './CreateTitleSizer.js';
import CreateChildSizer from './CreateChildSizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TreeNode extends Folder {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        var background = config.background;
        if (!background) {
            var createBackgroundCallback = GetValue(config, 'createBackgroundCallback');
            background = createBackgroundCallback(scene);
        }

        var title = CreateTitleSizer(scene, config);
        var toggleButton = title.childrenMap.toggleButton;

        var child = CreateChildSizer(scene, config);

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
        this.type = 'rexTreeNode';
        this.configSave = config;

        this.addChildrenMap('toggleButton', toggleButton);
    }

    createTreeNode(scene, config) {
        return new TreeNode(scene, config);
    }
}

export default TreeNode;