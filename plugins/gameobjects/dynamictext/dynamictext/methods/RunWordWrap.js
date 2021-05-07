import MergeConfig from './utils/MergeConfig.js';
import RunWordWrapBase from './utils/runwordwrap/RunWordWrap.js';

var RunWordWrap = function (config) {
    config = MergeConfig(config, this.wrapConfig);
    return RunWordWrapBase.call(this, config);
};

export default RunWordWrap;