import AIOSpinner from '../spinner/aio/AIO.js';
import IsGameObject from '../../plugins/utils/system/IsGameObject.js';

const GetValue = Phaser.Utils.Objects.GetValue;

export default {
    setSpinner(spinner) {
        if (spinner === null) {
            this.spinner = spinner;
            return this;
        }

        if (!IsGameObject(spinner)) {
            var scene = this.scene;
            var animationMode = GetValue(spinner, 'animationMode', 'ios');
            var sizeRatio = GetValue(spinner, 'sizeRatio', 0.6);
            var size = Math.min(this.displayWidth, this.displayHeight) * sizeRatio;
            spinner = new AIOSpinner(scene, {
                width: size, height: size,
                animationMode: animationMode,
            })
            scene.add.existing(spinner);
        }


        this.spinnerSizeRatio = spinner.width / Math.min(this.displayWidth, this.displayHeight);
        spinner.setPosition(this.x, this.y).setOrigin(0.5);
        this.add(spinner);
        this.spinner = spinner;

        this.stopSpinner();
        return this;
    },

    startSpinner() {
        var spinner = this.spinner;
        if (!spinner) {
            return this;
        }

        spinner.start();
        this.setChildVisible(spinner, true);
        return this;
    },

    stopSpinner() {
        var spinner = this.spinner;
        if (!spinner) {
            return this;
        }
        spinner.stop();
        this.setChildVisible(spinner, false);
        return this;
    },

    resizeSpinner() {
        var spinner = this.spinner;
        if (!spinner) {
            return this;
        }
        var size = Math.min(this.displayWidth, this.displayHeight) * this.spinnerSizeRatio;
        spinner.setSize(size, size);
        this.resetChildScaleState(spinner);
        return this;
    },

}