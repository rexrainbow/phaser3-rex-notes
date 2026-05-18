import ToggleSwitchInput from '../gameobjects/inputfield/ToggleSwitchInput';

var CreateToggleSwitchInput = function(scene?: any, config?: any, style?: any) {
    var gameObject = new ToggleSwitchInput(scene, style);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateToggleSwitchInput;