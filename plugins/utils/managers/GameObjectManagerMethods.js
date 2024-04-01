import GameObjectManagerBase from '../gameobject/gomanager/GOManager.js';

export default {
    addGameObjectManager(config, GameObjectManagerClass) {
        var gameobjectManager;

        if (config instanceof (GameObjectManagerBase)) {
            gameobjectManager = config;

        } else if (typeof (config) === 'string') {
            gameobjectManager = GameObjectManagerClass;
            gameobjectManager.name = config;

        } else {
            if (config === undefined) {
                config = {};
            }
            if (GameObjectManagerClass === undefined) {
                GameObjectManagerClass = GameObjectManagerBase;
            }

            if (!config.createGameObjectScope) {
                config.createGameObjectScope = this;
            }

            gameobjectManager = new GameObjectManagerClass(this.managersScene, config);
        }


        this.gameObjectManagers[gameobjectManager.name] = gameobjectManager;

        return this;
    },

    getGameObjectManager(managerName, gameObjectName) {
        if (managerName) {
            var manager = this.gameObjectManagers[managerName]
            return manager;
        } else {
            if (gameObjectName && (gameObjectName.charAt(0) === '!')) {
                gameObjectName = gameObjectName.substring(1);
            }

            for (var managerName in this.gameObjectManagers) {
                var manager = this.gameObjectManagers[managerName]
                if (manager.has(gameObjectName)) {
                    return manager;
                }
            }
        }
    },

    getGameObjectManagerNames() {
        var names = [];
        for (var name in this.gameObjectManagers) {
            names.push(name);
        }
        return names;
    },

    getGameObjectManagerName(gameObjectName) {
        var gameObjectManager = this.getGameObjectManager(undefined, gameObjectName);
        if (!gameObjectManager) {
            return undefined;
        }
        return gameObjectManager.name;
    },

    hasGameObjectMananger(managerName) {
        return managerName in this.gameObjectManagers;
    }
}