import WaitTimeMethods from './WaitTimeMethods.js';
import WaitInputMethods from './WaitInputMethods.js';
import WaitGameObjectMethods from './WaitGameObjectMethods.js';
import WaitCameraMethods from './WaitCameraMethods.js';
import WaitMusicMethods from './WaitMusicMethods.js';
import WaitAny from './WaitAny.js';

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