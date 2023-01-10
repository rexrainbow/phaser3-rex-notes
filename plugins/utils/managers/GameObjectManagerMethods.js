import AddGameObjectManager from './AddGameObjectManager.js';

export default {
    addGameObjectManager: AddGameObjectManager,

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