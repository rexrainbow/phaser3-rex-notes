import SetTransitionCallbackMethods from './SetTransitionCallbackMethods';
import TransitionMethods from './TransitionMethods';
import MaskMethods from './MaskMethods';
import GridCutMethods from './GridCutMethods';
import FlipMethods from '../../../container/utils/FlipMethods';

var methods = {
}

Object.assign(
    methods,
    SetTransitionCallbackMethods,
    TransitionMethods,
    MaskMethods,
    GridCutMethods,
    FlipMethods
)

export default methods;