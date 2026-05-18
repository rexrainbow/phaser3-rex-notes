import Sizer from '../../../sizer/Sizer';
import CreateGameObjectFromConfig from '../../builders/CreateGameObjectFromConfig';
import DefaultCreateBackgroundCallback from '../../builders/DefaultCreateBackgroundCallback';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateChildrenSizer = function(scene?: any, config?: any) {
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

    if (childrenBackground?: any) {
        childrenSizer.addBackground(childrenBackground);
    }

    return childrenSizer;
}

export default CreateChildrenSizer;