import OnAllMotionsFinish from '../events/OnAllMotionsFinish.js';

const Capitalize = Phaser.Utils.String.UppercaseFirst;

var Update = function (time, delta) {
    var deltaTimeSeconds = delta / 1000;

    var motionUpdated = false;
    this._model.loadParameters();
    if (!this._motionManager.isFinished()) {
        motionUpdated = this._motionManager.updateMotion(this._model, deltaTimeSeconds);
    } else {
        OnAllMotionsFinish(this.parent);
    }
    this._model.saveParameters();

    for (var name in this._addParamValues) {
        var propertyName = `_idParam${Capitalize(name)}`;
        var addValue = this._addParamValues[name];
        this._model.addParameterValueById(this[propertyName], addValue);
    }

    if (!motionUpdated && this._eyeBlink) {
        this._eyeBlink.updateParameters(this._model, deltaTimeSeconds);
    }

    if (this._expressionManager) {
        this._expressionManager.updateMotion(this._model, deltaTimeSeconds);
    }

    if (this._breath != null) {
        this._breath.updateParameters(this._model, deltaTimeSeconds);
    }

    if (this._physics != null) {
        this._physics.evaluate(this._model, deltaTimeSeconds);
    }

    // TODO: drag actions

    // TODO: lipsync by wav
    if (this._lipsync) {

    }

    if (this._pose != null) {
        this._pose.updateParameters(this._model, deltaTimeSeconds);
    }

    this._model.update();

    return this;
}

export default Update;