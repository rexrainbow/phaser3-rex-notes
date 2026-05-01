import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var RunWrap = function (config) {
    var wrapCallback = GetValue(this.wrapConfig, 'callback');
    if (!wrapCallback) {
        wrapCallback = GetValue(config, 'callback', this.runWordWrap);
    }
    if (typeof (wrapCallback) === 'string') {
        wrapCallback = this[wrapCallback];
    }

    return wrapCallback.call(this, config);
}

export default RunWrap;