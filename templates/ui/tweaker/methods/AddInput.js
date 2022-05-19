import GetInputType from './GetInputType.js';

var AddInput = function (object, key, config) {
    if (config === undefined) {
        config = {};
    }

    config.view = GetInputType(object[key], config);

}

export default AddInput;