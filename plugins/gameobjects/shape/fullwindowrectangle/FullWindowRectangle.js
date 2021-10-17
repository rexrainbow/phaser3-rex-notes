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

    get alpha() {
        return this.fillAlpha;
    }

    set alpha(value) {
        this.setFillStyle(this.fillColor, value);  
    }

    get tint() {
        return this.fillColor;
    }

    set tint(value) {
        this.setFillStyle(value, this.fillAlpha);  
    }

    resize() {
        var scene = this.scene;
        var gameSize = scene.scale.gameSize;
        var camera = scene.cameras.main;

        var gameWidth = gameSize.width,
            gameHeight = gameSize.height,
            scale = 1 / camera.zoom;

        var x = gameWidth / 2,
            y = gameHeight / 2,
            width = gameWidth * scale,
            height = gameHeight * scale;

        this
            .setOrigin(0.5)
            .setScrollFactor(0)
            .setPosition(x, y)
            .setSize(width, height)
    }

}

export default FullWindowRectangle;