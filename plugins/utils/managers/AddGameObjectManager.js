import GameObjectManagerBase from '../gameobject/gomanager/GOManager.js';

var AddGameObjectManager = function (config, GameObjectManagerClass) {
    if (config === undefined) {
        config = {};
    }
    if (GameObjectManagerClass === undefined) {
        GameObjectManagerClass = GameObjectManagerBase;
    }

    if (!config.createGameObjectScope) {
        config.createGameObjectScope = this;
    }
    var gameobjectManager = new GameObjectManagerClass(this.managersScene, config);
    this.gameObjectManagers[config.name] = gameobjectManager;

    return this;
}

export default AddGameObjectManager;