import GetGame from '../../../utils/system/GetGame';

const GameObjectClasses = Phaser.GameObjects;

var GameObjects = {};
var GetStampGameObject = function (gameObject, className) {
    if (!GameObjects.hasOwnProperty(className)) {
        var game = GetGame(gameObject);
        var scene = game.scene.systemScene;
        var gameObject = new GameObjectClasses[className](scene);
        gameObject.setOrigin(0);

        GameObjects[className] = gameObject;

        scene.events.on("shutdown", function () {
            gameObject.destroy();
            delete GameObjects[className];
        });
    }

    return GameObjects[className];
};

export default GetStampGameObject;