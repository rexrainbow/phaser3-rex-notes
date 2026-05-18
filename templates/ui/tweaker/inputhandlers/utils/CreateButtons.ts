import Buttons from '../../../buttons/Buttons';

var CreateButtons = function(scene?: any, config?: any) {
    var gameObject = new Buttons(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateButtons;