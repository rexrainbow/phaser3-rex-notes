import StatesImage from '../../statesimage/StatesImage.js';

var CreateImage = function (scene, config) {
    var gameObject = new StatesImage(scene, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateImage;