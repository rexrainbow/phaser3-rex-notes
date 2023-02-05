import CreateRoundRectangle from './CreateRoundRectangle.js';

var CreateBackground = function (scene, config) {
    var gameObject = CreateRoundRectangle(scene, config);
    // TODO: Create nine-slice background game object
    return gameObject;
}

export default CreateBackground;