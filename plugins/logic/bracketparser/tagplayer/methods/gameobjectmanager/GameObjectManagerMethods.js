import GameObjectManagerBase from '../../../../../utils/gameobject/gomanager/GOManager.js';
import OnParseAddGameObjectTag from './OnParseAddGameObjectTag.js';
import OnParseRemoveAllGameObjectsTag from './OnParseRemoveAllGameObjectsTag.js';
import OnParseCallGameObjectMethodTag from './OnParseCallGameObjectMethodTag.js';
import OnParseSetGameObjectPropertyTag from './OnParseSetGameObjectPropertyTag.js';
import OnParseEaseGameObjectPropertyTag from './OnParseEaseGameObjectPropertyTag.js';

const ParseCallbacks = [
    OnParseAddGameObjectTag, OnParseRemoveAllGameObjectsTag,
    OnParseCallGameObjectMethodTag, OnParseSetGameObjectPropertyTag,
    OnParseEaseGameObjectPropertyTag
];

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
        var name = config.name;
        this.gameObjectManagers[name] = gameobjectManager;

        // Register parse callbacks
        var customParseCallbacks = config.parseCallbacks;
        if (!customParseCallbacks) {
            customParseCallbacks = ParseCallbacks;
        } else {
            customParseCallbacks = [...customParseCallbacks, ...ParseCallbacks];
        }
        for (var i = 0, cnt = customParseCallbacks.length; i < cnt; i++) {
            customParseCallbacks[i](this, this.parser, config);
        }

        return this;
    },

    getGameObjectManager(name) {
        return this.gameObjectManagers[name];
    }
}