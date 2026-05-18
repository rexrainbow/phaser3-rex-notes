import RunVerticalWrapBase from './wrap/runverticalwrap/RunVerticalWrap';

import { Utils as PhaserUtils } from 'phaser';
const Merge = PhaserUtils.Objects.Merge;

var RunVerticalWrap = function(config?: any) {
    if (config === undefined) {
        config = {};
    }

    return RunVerticalWrapBase.call(this, Merge(config, this.wrapConfig));
};

export default RunVerticalWrap;