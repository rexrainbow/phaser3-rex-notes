import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class MaxDelta {
    enable: any;
    logCallback: any;
    logCallbackScope: any;
    maxDelta: any;
    prevTime: any;

    constructor(config?: any) {
        this.logCallback = GetValue(config, 'logCallback', DefaultCallback);
        this.logCallbackScope = GetValue(config, 'logCallbackScope', undefined);
        this.clear();
        this.setEnable(GetValue(config, 'enable', true));
    }

    clear() {
        this.prevTime = undefined;
        this.maxDelta = undefined;
        return this;
    }

    setEnable(enabled?: any) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.enable = enabled;
        return this;
    }

    log(time?: any) {
        if (!this.enable) {
            return this;
        }

        if (this.prevTime === undefined) {
            this.prevTime = time;
            this.maxDelta = 0;
        } else {
            var dt = time - this.prevTime;
            this.prevTime = time;
            if (this.maxDelta < dt) {
                this.maxDelta = dt;

                if (this.logCallback) {
                    if (this.logCallbackScope) {
                        this.logCallback.call(this.logCallbackScope, dt);
                    } else {
                        this.logCallback(dt);
                    }
                }
            }
        }

        return this;
    }
}

var DefaultCallback = function(dt?: any) {
    console.log(dt);
}

export default MaxDelta;