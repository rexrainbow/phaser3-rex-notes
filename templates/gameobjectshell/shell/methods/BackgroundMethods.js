import FullWindowRectangle from '../../fullwindowrectangle/FullWindowRectangle.js';

export default {
    addBackground(config) {
        var background = new FullWindowRectangle(this.scene);
        this.scene.add.existing(background);
        this.addToBackgroundLayer(background);

        background
            .setInteractive()
            .on('pointerdown', this.clearBindingTarget, this)

        this.background = background;

        return this;
    },


}