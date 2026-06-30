import ActorMethods from './ActorMethods.js';
import RunMethods from './RunMethods.js';
import RunParallelMethods from './RunParallelMethods.js';
import RunSequenceMethods from './RunSequenceMethods.js';
import StateActionMethods from './StateActionMethods.js';
import StopMethods from './StopMethods.js';

var Methods = {
};

Object.assign(
    Methods,
    RunMethods,
    RunParallelMethods,
    RunSequenceMethods,
    ActorMethods,
    StateActionMethods,
    StopMethods,
)

export default Methods;
