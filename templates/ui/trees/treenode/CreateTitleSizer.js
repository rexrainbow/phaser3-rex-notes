import Sizer from '../../sizer/Sizer.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateTitleSizer = function (tree, config) {
    var scene = tree.scene;
    var titleSizer = new Sizer(scene, {
        orientation: 'x'
    })

    tree.syncDisplayList(titleSizer);;

    // Optional
    var titleBackground = GetGameObjectFromConfig(tree, config, 'titleBackground');

    // Required
    var toggleButton = GetGameObjectFromConfig(tree, config, 'toggleButton');

    // Required
    var node = GetGameObjectFromConfig(tree, config, 'node', { isLeaf: false });


    if (titleBackground) {
        titleSizer.addBackground(titleBackground);
    }

    titleSizer.add(toggleButton, { fitRatio: 1, key: 'toggleButton' });

    titleSizer.add(node, { proportion: 1, key: 'node' });

    return titleSizer;
}

export default CreateTitleSizer;