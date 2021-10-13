import ComponentBase from '../../utils/componentbase/ComponentBase.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TouchEventStop extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject, config);
        // this.parent = gameObject;

        this.parent.setInteractive(GetValue(config, "inputConfig", undefined));
        this.resetFromJSON(config);
        this.boot();
    }
    resetFromJSON(o) {
        this.setEnable(GetValue(o, "enable", true));
        return this;
    }

    boot() {
        this.parent
            .on('pointerdown', function (pointer, localX, localY, event) {
                if (this.enable) {
                    event.stopPropagation();
                }
            }, this)
            .on('pointerup', function (pointer, localX, localY, event) {
                if (this.enable) {
                    event.stopPropagation();
                }
            }, this)
            .on('pointermove', function (pointer, localX, localY, event) {
                if (this.enable) {
                    event.stopPropagation();
                }
            }, this)
            .on('pointerover', function (pointer, localX, localY, event) {
                if (this.enable) {
                    event.stopPropagation();
                }
            }, this)
            .on('pointerout', function (pointer, event) {
                if (this.enable) {
                    event.stopPropagation();
                }
            }, this)
    }

    setEnable(e) {
        if (e === undefined) {
            e = true;
        }

        this.enable = e;
        return this;
    }

    toggleEnable() {
        this.setEnable(!this.enable);
        return this;
    }
}

export default TouchEventStop;