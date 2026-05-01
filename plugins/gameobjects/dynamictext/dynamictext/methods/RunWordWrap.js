import RunWordWrapBase from './wrap/runwordwrap/RunWordWrap.js';

import { Utils as PhaserUtils } from 'phaser';
const Merge = PhaserUtils.Objects.Merge;

var RunWordWrap = function (config) {
    if (config === undefined) {
        config = {};
    }

    return RunWordWrapBase.call(this, Merge(config, this.wrapConfig));
};

export default RunWordWrap;