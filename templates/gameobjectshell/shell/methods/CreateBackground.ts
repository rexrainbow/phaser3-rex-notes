import FullWindowRectangle from '../../fullwindowrectangle/FullWindowRectangle';

var CreateBackground = function(config?: any) {
    var background = new FullWindowRectangle(this.scene);
    this.scene.add.existing(background);
    this.addToBackgroundLayer(background, -1);

    var shell = this;
    var onUnSelectGameObject = function() {
        shell.onUnSelectGameObjectCallback(shell);
    }

    background
        .setInteractive()
        .on('pointerdown', onUnSelectGameObject)

    this.background = background;

    this.once('destroy', function() {
        this.background.destroy();
        this.background = undefined;
    }, this);

    return background;
}

export default CreateBackground;