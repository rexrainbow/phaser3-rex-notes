import Sizer from '../../../sizer/Sizer.js';
import CreateGameObjectFromConfig from '../../builders/CreateGameObjectFromConfig.js';
import DefaultCreateBackgroundCallback from '../../builders/DefaultCreateBackgroundCallback.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateChildrenSizer = function (scene, config) {
    var childrenSizer = new Sizer(scene, {
        orientation: GetValue(config, 'childrenOrientation', 'y')
    })
    scene.add.existing(childrenSizer);

    var childrenBackground = CreateGameObjectFromConfig(
        scene,
        GetValue(config, 'childrenBackground'),  // config
        { isLeaf: false },                       // callbackData
        DefaultCreateBackgroundCallback,         // defaultCallback
        false                                    // isRequired
    );

    if (childrenBackground) {
        childrenSizer.addBackground(childrenBackground);
    }

    return childrenSizer;
}

export default CreateChildrenSizer;