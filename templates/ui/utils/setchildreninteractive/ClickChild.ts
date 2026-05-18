import { Utils as PhaserUtils } from 'phaser';
import Button from '../../../../plugins/input/button/Button';
import EmitChildEvent from './EmitChildEvent';

const GetValue = PhaserUtils.Objects.GetValue;

var ClickChild = function(config?: any) {
    var clickConfig = GetValue(config, 'click', undefined);
    if (clickConfig === false) {
        return;
    } else if (clickConfig === true) {
        clickConfig = undefined;
    }

    if (clickConfig === undefined) {
        clickConfig = {};
    }
    if (!clickConfig.hasOwnProperty('threshold')) {
        clickConfig.threshold = 10;
    }

    var childrenInteractive = this._childrenInteractive;
    this._click = new Button(this, clickConfig);
    this._click.on('click', function(button?: any, gameObject?: any, pointer?: any, event?: any) {
        EmitChildEvent(
            childrenInteractive.eventEmitter,
            `${childrenInteractive.eventNamePrefix}click`,
            childrenInteractive.targetSizers,
            childrenInteractive.targetMode,
            pointer.worldX, pointer.worldY,
            pointer, event
        );
    }, this);
};

export default ClickChild;