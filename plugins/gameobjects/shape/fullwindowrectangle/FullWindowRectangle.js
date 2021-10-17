const Rectangle = Phaser.GameObjects.Rectangle;

class FullWindowRectangle extends Rectangle {
    constructor(scene, color, alpha) {
        super(scene, 0, 0, 1, 1, color, alpha);

        this.boot();
    }

    boot() {
        var scene = this.scene;
        scene.events.on('prerender', this.resize, this);
    }

    destroy(fromScene) {  // preDestroy method does not have fromScene parameter
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        this.scene.events.off('prerender', this.resize, this);

        super.destroy(fromScene);
    }

    resize() {
        var scene = this.scene;
        var gameSize = scene.scale.gameSize;
        var camera = scene.cameras.main;

        var gameWidth = gameSize.width,
            gameHeight = gameSize.height,
            scale = 1 / camera.zoom;
        this
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setPosition(
                gameWidth / 2,
                gameHeight / 2
            )
            .setScale(
                gameWidth * scale,
                gameHeight * scale
            )
    }
}

export default FullWindowRectangle;