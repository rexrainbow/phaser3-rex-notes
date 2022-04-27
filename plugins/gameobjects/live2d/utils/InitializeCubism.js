import { CubismFramework, Option } from '../framework/live2dcubismframework.js';

var InitializeCubism = function (config) {
    // Setup cubism
    var option = new Option();
    // TODO: option.logFunction, option.loggingLevel
    CubismFramework.startUp(option);

    // Initialize cubism
    CubismFramework.initialize();

    // TODO: More...
}

export default InitializeCubism;