import FixWidthButtons from '../../../fixwidthbuttons/FixWidthButtons';

var CreateWrapButtons = function(scene?: any, config?: any) {
    var gameObject = new FixWidthButtons(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateWrapButtons;