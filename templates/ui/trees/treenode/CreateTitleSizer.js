import Sizer from '../../sizer/Sizer.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';

var CreateTitleSizer = function (scene, config) {
    var titleSizer = new Sizer(scene, {
        orientation: 'x'
    })

    // Optional
    var titleBackground = GetGameObjectFromConfig(scene, config, 'titleBackground');

    // Required
    var toggleButton = GetGameObjectFromConfig(scene, config, 'toggleButton');

    // Required
    var node = GetGameObjectFromConfig(scene, config, 'node', { isLeaf: false });


    if (titleBackground) {
        titleSizer.addBackground(titleBackground);
    }

    titleSizer.add(toggleButton, { fitRatio: 1, key: 'toggleButton' });

    titleSizer.add(node, { proportion: 1, key: 'node' });

    return titleSizer;
}

export default CreateTitleSizer;