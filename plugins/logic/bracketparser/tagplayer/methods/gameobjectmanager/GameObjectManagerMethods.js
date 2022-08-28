import GameObjectManagerBase from '../../../../../utils/gameobject/gomanager/GOManager.js';
import OnParseAddGameObjectTag from './OnParseAddGameObjectTag.js';
import OnParseRemoveAllGameObjectsTag from './OnParseRemoveAllGameObjectsTag.js';
import OnParseCallGameObjectMethodTag from './OnParseCallGameObjectMethodTag.js';
import OnParseEaseGameObjectPropertyTag from './OnParseEaseGameObjectPropertyTag.js';

const ParseCallbacks = [
    OnParseAddGameObjectTag, OnParseRemoveAllGameObjectsTag,
    OnParseCallGameObjectMethodTag,
    OnParseEaseGameObjectPropertyTag
];

export default {
    addGameObjectManager(config, GameObjectManagerClass) {
        if (config === undefined) {
            config = {};
        }
        var name = config.name;
        if (!name) {
            console.warn(`Parameter 'name' is required in TagPlayer.addGameObjectManager(config) method`);
        }

        super.addGameObjectManager(config, GameObjectManagerClass);

        // Register parse callbacks
        var customParseCallbacks = config.parseCallbacks;
        if (!customParseCallbacks) {
            customParseCallbacks = ParseCallbacks;
        } else {
            customParseCallbacks = [
                ...customParseCallbacks, // customParseCallbacks have higher priority
                ...ParseCallbacks
            ];
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