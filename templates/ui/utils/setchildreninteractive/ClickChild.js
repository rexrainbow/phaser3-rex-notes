import Button from '../../../../plugins/input/button/Button.js';
import EmitChildEvent from './EmitChildEvent.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var ClickChild = function (config) {
    var buttonConfig = GetValue(config, 'button', undefined);
    if (buttonConfig === undefined) {
        buttonConfig = {};
    }
    buttonConfig.threshold = 10;
    this._click = new Button(this, buttonConfig);
    this._click.on('click', function (button, gameObject, pointer) {
        EmitChildEvent(this.eventEmitter, `${this.inputEventPrefix}click`, gameObject, pointer.x, pointer.y, pointer);
    }, this);
};

export default ClickChild;