import phaser from 'phaser/src/phaser.js';

const MaskR = (~(0xff << 16) & 0xffffff);
const MaskG = (~(0xff << 8) & 0xffffff);
const MaskB = (~(0xff) & 0xffffff);

class MyText extends Phaser.GameObjects.Text {
    get fontSize() {
        return this._fontSize;
    }

    set fontSize(value) {
        this._fontSize = value;
        this.setFontSize(value);
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
        this.setFill(`#${value.toString(16)}`);
    }

    get colorR() {
        return (this._color >> 16) & 0xff;
    }

    get colorG() {
        return (this._color >> 8) & 0xff;
    }

    get colorB() {
        return (this._color >> 0) & 0xff;
    }

    set colorR(value) {
        this.color = ((value & 0xff) << 16) | (this.color & MaskR);
    }

    set colorG(value) {
        this.color = ((value & 0xff) << 8) | (this.color & MaskG);
    }

    set colorB(value) {
        this.color = ((value & 0xff) << 0) | (this.color & MaskB);
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var text = new MyText(this, 400, 300, 'Hello world')
        this.add.existing(text);

        // Set initial value value
        text.fontSize = 20;
        text.color = 0xc2185b;

        var tween = this.tweens.add({
            targets: text,

            fontSize: 40,
            colorR: 0xaf,
            colorG: 0xb4,
            colorB: 0x2b,

            repeat: -1,
            yoyo: true,
        })
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: Demo
};

var game = new Phaser.Game(config);