import Step from './Step.js';

const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

export default {
    onInitStep() {
        var step = this._step;
        // Route 'step' of step to gameObject       
        step.on('step', function (gameObject, step, stepX, stepY) {
            gameObject.emit('step.step', gameObject, stepX, stepY);
        })
    },

    stepStart(stepLength) {
        if (IsPlainObject(stepLength)) {
            var config = stepLength;
            stepLength = config.stepLength;
        }
        if (stepLength === undefined) {
            stepLength = 5;
        }

        if (this._step === undefined) {
            this._step = new Step(this, {
                stepLength: stepLength
            });
            this.onInitStep();
        } else {
            this._step
                .setEnable()
                .setStepLength(stepLength)
        }

        return this;
    },

    stepStop() {
        if (!this._step) {
            return this;
        }

        this._step.setEnable(false);
        return this;
    }
}