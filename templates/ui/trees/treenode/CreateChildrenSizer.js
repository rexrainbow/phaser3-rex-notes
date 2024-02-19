import Sizer from '../../sizer/Sizer.js';
import GetGameObjectFromConfig from './GetGameObjectFromConfig.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateChildrenSizer = function (scene, config) {    
    var childrenSizer = new Sizer(scene, {
        orientation: GetValue(config, 'childrenOrientation', 'y')
    })

    // Optional
    var childrenBackground = GetGameObjectFromConfig(scene, config, 'childrenBackground');


    if (childrenBackground) {
        childrenSizer.addBackground(childrenBackground);
    }

    return childrenSizer;
}

export default CreateChildrenSizer;