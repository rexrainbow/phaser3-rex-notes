import Sizer from '../../sizer/Sizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateTitleSizer = function (scene, config) {
    var titleSizer = new Sizer(scene, {
        orientation: 'x'
    })

    scene.add.existing(titleSizer);

    var titleBackground = GetValue(config, 'titleBackground');

    var toggleButton = GetValue(config, 'toggleButton');
    if (!toggleButton) {
        var createToggleButtonCallback = GetValue(config, 'createToggleButtonCallback');
        toggleButton = createToggleButtonCallback(scene);
    }

    var node = GetValue(config, 'node');
    if (!node) {
        var createNodeCallback = GetValue(config, 'createNodeCallback');
        node = createNodeCallback(scene);
    }


    if (titleBackground) {
        titleSizer.addBackground(titleBackground);
    }

    titleSizer.add(toggleButton, { fitRatio: 1, key: 'toggleButton' });

    titleSizer.add(node, { proportion: 1, key: 'node' });

    return titleSizer;
}

export default CreateTitleSizer;