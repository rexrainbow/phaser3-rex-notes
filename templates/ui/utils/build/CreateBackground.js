import StatesRoundRectangle from '../../statesroundrectangle/StatesRoundRectangle.js';

var CreateBackground = function (scene, config) {
    var gameObject = new StatesRoundRectangle(scene, config);
    // TODO: Create nine-slice background game object

    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateBackground;