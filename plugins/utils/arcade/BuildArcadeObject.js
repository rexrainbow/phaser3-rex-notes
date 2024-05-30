import ArcadeMethods from './ArcadeMethods.js';

var BuildArcadeObject = function (gameObject, isStatic) {
    if (!Array.isArray(gameObject)) {
        Build(gameObject, isStatic);
    } else {
        var gameObjects = gameObject;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            Build(gameObjects[i], isStatic);
        }
    }

    return gameObject;
};

var Build = function (gameObject, isStatic) {
    if (!gameObject.body) {
        if (isStatic === undefined) {
            isStatic = false;
        }
        gameObject.scene.physics.add.existing(gameObject, isStatic);
    }

    Object.assign(gameObject, ArcadeMethods);

    return gameObject;
};

export default BuildArcadeObject;