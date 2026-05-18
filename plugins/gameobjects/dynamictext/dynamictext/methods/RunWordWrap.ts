import RunWordWrapBase from './wrap/runwordwrap/RunWordWrap';

import { Utils as PhaserUtils } from 'phaser';
const Merge = PhaserUtils.Objects.Merge;

var RunWordWrap = function(config?: any) {
    if (config === undefined) {
        config = {};
    }

    return RunWordWrapBase.call(this, Merge(config, this.wrapConfig));
};

export default RunWordWrap;