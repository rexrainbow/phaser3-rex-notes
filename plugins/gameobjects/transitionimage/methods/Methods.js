import SetTransitionCallbackMethods from './SetTransitionCallbackMethods.js';
import TransitionMethods from './TransitionMethods.js';
import MaskMethods from './MaskMethods.js';
import GridCutMethods from './GridCutMethods.js';

var methods = {
}

Object.assign(
    methods,
    SetTransitionCallbackMethods,
    TransitionMethods,
    MaskMethods,
    GridCutMethods
)

export default methods;