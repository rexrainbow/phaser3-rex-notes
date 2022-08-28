import InitManagers from './InitManagers.js';
import DestroyManagers from './DestroyManagers.js';
import GameObjectManagerMethods from './GameObjectManagerMethods.js';
import GameObjectMethods from './GameObjectMethods.js';
import TimelineMethods from './TimelineMethods.js';

var Extend = function (BaseClass) {
    class Managers extends BaseClass { }

    var Methods = {
        initManagers: InitManagers,
        destroyManagers: DestroyManagers,
    }

    Object.assign(
        Managers.prototype,
        Methods,
        GameObjectManagerMethods,
        GameObjectMethods,
        TimelineMethods,
    )

    // Note: `Managers.scene` member is required

    return Managers;
}

export default Extend;