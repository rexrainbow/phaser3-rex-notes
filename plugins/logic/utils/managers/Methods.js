import InitManagers from './InitManagers.js';
import DestroyManagers from './DestroyManagers.js';
import GameObjectManagerMethods from './GameObjectManagerMethods.js';
import GameObjectMethods from './GameObjectMethods.js';

var Methods = {
    initManagers: InitManagers,
    destroyManagers: DestroyManagers,
}

Object.assign(
    Methods,
    GameObjectManagerMethods,
    GameObjectMethods,
)

export default Methods;