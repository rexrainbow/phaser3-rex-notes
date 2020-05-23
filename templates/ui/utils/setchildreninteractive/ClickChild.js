import Button from '../../../../plugins/input/button/Button.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var ClickChild = function (config) {
    var clickConfig = GetValue(config, 'click', undefined);
    if (clickConfig === false) {
        return;
    }

    if (clickConfig === undefined) {
        clickConfig = {};
    }
    if (!clickConfig.hasOwnProperty('threshold')) {
        clickConfig.threshold = 10;
    }

    this._click = new Button(this, clickConfig);
    this._click.on('click', function (button, gameObject, pointer) {
        EmitChildEvent(
            this.eventEmitter,
            `${this.input.eventNamePrefix}click`,
            this.input.targetSizers,
            pointer.x, pointer.y,
            pointer
        );
    }, this);
};

export default ClickChild;