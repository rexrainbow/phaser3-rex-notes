import StatesImage from '../../statesimage/StatesImage.js';
import DecorateGameObject from './DecorateGameObject.js';

var CreateImage = function (scene, config) {
    var gameObject = new StatesImage(scene, config);
    DecorateGameObject(gameObject, config);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateImage;