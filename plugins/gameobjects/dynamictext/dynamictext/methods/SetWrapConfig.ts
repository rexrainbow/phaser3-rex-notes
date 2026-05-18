import DeepClone from '../../../../utils/object/DeepClone';

var SetWrapConfig = function(config?: any) {
    if (config === undefined) {
        config = {};
    } else if (typeof (config) === 'object') {
        config = DeepClone(config);
    }

    this.wrapConfig = config;
    return this;
}

export default SetWrapConfig;