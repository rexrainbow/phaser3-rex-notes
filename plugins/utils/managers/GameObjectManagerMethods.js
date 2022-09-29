import AddGameObjectManager from './AddGameObjectManager.js';

export default {
    addGameObjectManager: AddGameObjectManager,

    getGameObjectManager: function (name) {
        return this.gameObjectManagers[name];
    },

    getGameObjectManagerNames: function () {
        var names = [];
        for (var name in this.gameObjectManagers) {
            names.push(name);
        }
        return names;
    },
}