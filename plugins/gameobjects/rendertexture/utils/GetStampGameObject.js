import GetGame from '../../../utils/system/GetGame';

import { GameObjects as PhaserGameObjects } from 'phaser';
const GameObjectClasses = PhaserGameObjects;

var GameObjects = undefined;

var GetStampGameObject = function (gameObject, className) {
    if (!GameObjects) {
        GameObjects = {};

        GetGame(gameObject).events.once('destroy', function () {
            for (var name in GameObjects) {
                GameObjects[name].destroy();
            }
            GameObjects = undefined;
        });
    }

    if (!GameObjects.hasOwnProperty(className)) {
        var scene = GetGame(gameObject).scene.systemScene;
        var gameObject = new GameObjectClasses[className](scene);
        gameObject.setOrigin(0);

        GameObjects[className] = gameObject;
    }

    return GameObjects[className];
};

export default GetStampGameObject;