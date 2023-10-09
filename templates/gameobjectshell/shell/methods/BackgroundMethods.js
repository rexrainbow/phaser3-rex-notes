import FullWindowRectangle from '../../fullwindowrectangle/FullWindowRectangle.js';

export default {
    addBackground(config) {
        var background = new FullWindowRectangle(this.scene);
        this.scene.add.existing(background);
        this.addToBackgroundLayer(background);

        var shell = this;
        var onUnSelectGameObject = function () {
            shell.onUnSelectGameObjectCallback(shell);
        }

        background
            .setInteractive()
            .on('pointerdown', onUnSelectGameObject)

        this.background = background;

        return this;
    },


}