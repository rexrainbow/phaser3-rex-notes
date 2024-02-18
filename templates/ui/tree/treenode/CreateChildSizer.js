import Sizer from '../../sizer/Sizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateChildSizer = function (scene, config) {
    var childSizer = new Sizer(scene, {
        orientation: GetValue(config, 'childrenOrientation', 'y')
    })

    scene.add.existing(childSizer);
}

export default CreateChildSizer;