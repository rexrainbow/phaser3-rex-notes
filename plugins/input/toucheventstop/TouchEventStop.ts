import ComponentBase from '../../utils/componentbase/ComponentBase';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class TouchEventStop extends ComponentBase {
    enable: any;
    parent: any;
    stopAllLevels: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject, { eventEmitter: false });
        // No event emitter
        // this.parent = gameObject;

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o?: any) {
        this.setHitAreaMode(GetValue(o, 'hitAreaMode', 0));
        this.setEnable(GetValue(o, 'enable', true));
        this.setStopMode(GetValue(o, 'stopAllLevels', true));
        return this;
    }

    boot() {
        this.parent
            .on('pointerdown', function(pointer?: any, localX?: any, localY?: any, event?: any) {
                if (this.stopAllLevels) {
                    event.stopPropagation();
                }
            }, this)
            .on('pointerup', function(pointer?: any, localX?: any, localY?: any, event?: any) {
                if (this.stopAllLevels) {
                    event.stopPropagation();
                }
            }, this)
            .on('pointermove', function(pointer?: any, localX?: any, localY?: any, event?: any) {
                if (this.stopAllLevels) {
                    event.stopPropagation();
                }
            }, this)
            .on('pointerover', function(pointer?: any, localX?: any, localY?: any, event?: any) {
                if (this.stopAllLevels) {
                    event.stopPropagation();
                }
            }, this)
            .on('pointerout', function(pointer?: any, event?: any) {
                if (this.stopAllLevels) {
                    event.stopPropagation();
                }
            }, this)
    }

    setHitAreaMode(mode?: any) {
        if (typeof (mode) === 'string') {
            mode = HitAreaMode[mode];
        }

        var gameObject = this.parent;
        if (gameObject.input) {
            gameObject.removeInteractive();
        }

        if (mode === 0) {
            gameObject.setInteractive();
        } else {
            gameObject.setInteractive({
                hitArea: {},
                hitAreaCallback: function() { return true; }
            });
        }

        return this;
    }

    setEnable(e?: any) {
        if (e === undefined) {
            e = true;
        }

        if (e?: any) {
            this.parent.setInteractive();
        } else {
            this.parent.disableInteractive();
        }

        this.enable = e;
        return this;
    }

    setStopMode(allLevels?: any) {
        if (allLevels === undefined) {
            allLevels = true;
        }
        this.stopAllLevels = allLevels;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }
}

var HitAreaMode = {
    default: 0,
    fullWindow: 1
}

export default TouchEventStop;