import Sizer from '../../sizer/Sizer.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateChildrenSizer = function (scene, config) {
    var childrenSizer = new Sizer(scene, {
        orientation: GetValue(config, 'childrenOrientation', 'y')
    })
    scene.add.existing(childrenSizer);

    // Optional
    var childrenBackground = GetGameObjectFromConfig(
        scene,
        config, 'childrenBackground',
        { isLeaf: false }
    );

    if (childrenBackground) {
        childrenSizer.addBackground(childrenBackground);
    }

    return childrenSizer;
}

export default CreateChildrenSizer;