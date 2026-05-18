import GameObjectManagerMethods from '../../../../../utils/managers/GameObjectManagerMethods';
import OnParseAddGameObjectTag from './OnParseAddGameObjectTag';
import OnParseRemoveAllGameObjectsTag from './OnParseRemoveAllGameObjectsTag';
import OnParseCallGameObjectMethodTag from './OnParseCallGameObjectMethodTag';
import OnParseEaseGameObjectPropertyTag from './OnParseEaseGameObjectPropertyTag';

const ParseCallbacks = [
    OnParseAddGameObjectTag, OnParseRemoveAllGameObjectsTag,
    OnParseCallGameObjectMethodTag,
    OnParseEaseGameObjectPropertyTag
];

const AddGameObjectManager = GameObjectManagerMethods.addGameObjectManager;

export default {
    addGameObjectManager(config?: any, GameObjectManagerClass?: any) {
        if (config === undefined) {
            config = {};
        }
        var name = config.name;
        if (!name) {
            console.warn(`[TagPlayer] Parameter 'name' is required in addGameObjectManager(config) method`);
        }

        var defaultLayer = config.defaultLayer;
        var createGameObject = config.createGameObject;
        var self = this;
        config.createGameObject = function(scene?: any, ...args) {
            var gameObject = createGameObject.call(this, scene, ...args);
            // this: config.createGameObjectScope

            if (defaultLayer && self.layerManager) {
                self.layerManager.addToLayer(defaultLayer, gameObject);
            }

            return gameObject;
        }

        // Base method from Managers
        AddGameObjectManager.call(this, config, GameObjectManagerClass);

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
}