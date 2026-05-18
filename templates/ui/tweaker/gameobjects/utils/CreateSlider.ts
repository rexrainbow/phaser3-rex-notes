import Slider from '../../../slider/Slider';

var CreateSlider = function(scene?: any, config?: any) {
    var gameObject = new Slider(scene, config);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateSlider;