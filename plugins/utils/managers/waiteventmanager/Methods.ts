import WaitTimeMethods from './WaitTimeMethods';
import WaitInputMethods from './WaitInputMethods';
import WaitGameObjectMethods from './WaitGameObjectMethods';
import WaitCameraMethods from './WaitCameraMethods';
import WaitMusicMethods from './WaitMusicMethods';
import WaitAny from './WaitAny';

var methods = {
    waitAny: WaitAny,
};
Object.assign(
    methods,
    WaitTimeMethods,
    WaitInputMethods,
    WaitGameObjectMethods,
    WaitCameraMethods,
    WaitMusicMethods,
)

export default methods;