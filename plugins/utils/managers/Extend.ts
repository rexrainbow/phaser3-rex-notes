import InitManagers from './InitManagers';
import SetTimeScale from './SetTimeScale';
import GetTimeScale from './GetTimeScale';
import DestroyManagers from './DestroyManagers';
import GameObjectManagerMethods from './GameObjectManagerMethods';
import GameObjectMethods from './GameObjectMethods';

var Extend = function(BaseClass?: any) {
    class Managers extends BaseClass { }

    var Methods = {
        initManagers: InitManagers,
        setTimeScale: SetTimeScale,
        getTimeScale: GetTimeScale,
        destroyManagers: DestroyManagers,
    }

    Object.assign(
        Managers.prototype,
        Methods,
        GameObjectManagerMethods,
        GameObjectMethods,
    )

    return Managers;
}

export default Extend;