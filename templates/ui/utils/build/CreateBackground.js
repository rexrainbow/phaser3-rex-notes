import RoundRectangle from '../../roundrectangle/RoundRectangle.js';

var CreateBackground = function (scene, config) {
    var gameObject = new RoundRectangle(scene, config);
    // TODO: Create nine-slice background game object

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateBackground;