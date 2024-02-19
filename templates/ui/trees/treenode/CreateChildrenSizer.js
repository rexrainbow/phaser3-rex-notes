import Sizer from '../../sizer/Sizer.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateChildrenSizer = function (tree, config) {
    var scene = tree.scene;
    var childrenSizer = new Sizer(scene, {
        orientation: GetValue(config, 'childrenOrientation', 'y')
    })

    tree.syncDisplayList(childrenSizer);

    // Optional
    var childrenBackground = GetGameObjectFromConfig(tree, config, 'childrenBackground');


    if (childrenBackground) {
        childrenSizer.addBackground(childrenBackground);
    }

    return childrenSizer;
}

export default CreateChildrenSizer;