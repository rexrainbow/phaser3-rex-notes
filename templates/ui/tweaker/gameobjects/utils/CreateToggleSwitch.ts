import ToggleSwitch from '../../../toggleswitch/ToggleSwitch';

var CreateToggleSwitch = function(scene?: any, config?: any) {
    var gameObject = new ToggleSwitch(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateToggleSwitch;