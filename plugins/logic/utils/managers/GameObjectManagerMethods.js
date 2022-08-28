import GameObjectManagerBase from '../../../utils/gameobject/gomanager/GOManager.js';

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
        var gameobjectManager = new GameObjectManagerClass(this.scene, config);
        this.gameObjectManagers[config.name] = gameobjectManager;
        return this;
    },

    getGameObjectManager(name) {
        return this.gameObjectManagers[name];
    }
}