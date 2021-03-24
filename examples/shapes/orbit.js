import ShapesPlugin from '../../plugins/shapes-plugin.js';

class Orbit extends RexPlugins.GameObjects.Shapes {
    constructor(scene, x, y, width, height, color) {
        super(scene, x, y, width, height);

        this.addCircle('track').lineStyle(1, color, 0.7);
        this.addCircle('thumb').fillStyle(color);
        this.setColor(color);
        this.setValue(0);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = Phaser.Math.Clamp(value, 0, 1);
        this.dirty = this.dirty || (this._value != value);
        this._value = value;
    }

    setValue(value) {
        this.value = value;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    updateData() {
        var centerX = this.width / 2;
        var centerY = this.height / 2;
        var radius = Math.min(centerX, centerY);
        var trackRadius = radius * 0.9;
        var thumbRadius = radius * 0.1;
        var thumbAngle = Math.PI * 2 * this.value;

        this.getShape('track')
            .lineStyle(1, this.color, 0.7)
            .setRadius(trackRadius)
            .setCenterPosition(centerX, centerY);

        this.getShape('thumb')
            .fillStyle(this.color)
            .setRadius(thumbRadius)
            .setCenterPosition(
                centerX + Math.cos(thumbAngle) * trackRadius,
                centerY + Math.sin(thumbAngle) * trackRadius
            );

        super.updateData();
        return this;
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var progress = new Orbit(this, 400, 300, 200, 100, 0xff0000);
        this.add.existing(progress);

        var tween = this.tweens.add({
            targets: progress,
            value: 1,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 3000,
            repeat: -1,            // -1: infinity
            yoyo: false
        });

        this.add.rectangle(400, 300, 200, 100).setStrokeStyle(2, 0xffffff);
    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexShapes',
            plugin: ShapesPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);