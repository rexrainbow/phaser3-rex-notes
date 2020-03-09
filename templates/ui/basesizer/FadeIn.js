import FadeIn from '../../../plugins/fade-in.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

export default function (duration, alpha) {
    if (IsPlainObject(duration)) {
        var config = duration;
        duration = GetValue(config, 'duration', undefined);
    }

    this._fade = FadeIn(this, duration, alpha, this._fade);
    this._fade.once('complete', function () {
        this.emit('fadein.complete', this);
    }, this);
    return this;
}