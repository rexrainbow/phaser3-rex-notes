import MergeConfig from './utils/MergeConfig.js';
import RunVerticalWrapBase from './utils/runverticalwrap/RunVerticalWrap.js';

var RunVerticalWrap = function (config) {
    config = MergeConfig(config, this.wrapConfig);
    return RunVerticalWrapBase.call(this, config);
};

export default RunVerticalWrap;