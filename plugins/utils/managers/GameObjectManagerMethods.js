import GameObjectManagerBase from '../gameobject/gomanager/GOManager.js';

export default {
    addGameObjectManager(config, GameObjectManagerClass) {
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
    },

    getGameObjectManager(name) {
        return this.gameObjectManagers[name];
    },

    getGameObjectManagerNames() {
        var names = [];
        for (var name in this.gameObjectManagers) {
            names.push(name);
        }
        return names;
    },
}