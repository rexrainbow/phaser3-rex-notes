import ComponentBase from '../../utils/componentbase/ComponentBase';
import Methods from './methods/Methods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class TextEdit extends ComponentBase {
    close: any;
    delayCall: any;
    inputText: any;
    isShutdown: any;
    onClose: any;
    open: any;
    openConfig: any;
    parent: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject);
        // this.parent = gameObject;

        this.inputText = undefined;
        this.onClose = undefined;
        this.delayCall = undefined;

        this.setOpenConfig(config);

        var clickEnable = GetValue(config, 'clickEnable', true);
        if (clickEnable?: any) {
            gameObject
                .on('pointerdown', function() {
                    this.open();
                }, this)
                .setInteractive()
        }
    }

    shutdown(fromScene?: any) {
        // Already shutdown
        if (this.isShutdown) {
            return;
        }

        this.close();

        super.shutdown(fromScene);
    }

    setOpenConfig(config?: any) {
        if (config === undefined) {
            config = {};
        }
        this.openConfig = config;
        return this;
    }

    get isOpened() {
        return (this.inputText !== undefined);
    }

    get text() {
        return (this.isOpened) ? this.inputText.text : this.parent.text;
    }
}

Object.assign(
    TextEdit.prototype,
    Methods,
)

export default TextEdit;