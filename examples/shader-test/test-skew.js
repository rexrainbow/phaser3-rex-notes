import phaser from 'phaser/src/phaser.js';

const skewShader = `
precision mediump float;
uniform mat4 uProjectionMatrix;
uniform vec2 uResolution;
      
attribute vec2 inPosition;
attribute vec2 inTexCoord;
attribute float inTexId;
attribute float inTintEffect;
attribute vec4 inTint;

varying vec2 outTexCoord;
varying float outTexId;
varying float outTintEffect;
varying vec4 outTint;

float xSkew = 0.6;
float ySkew = 0.0;
      
void main ()
{
    mat4 skewMatrix;
    skewMatrix[0] = vec4(1.0,       tan(xSkew), 0.0,      0.0);
    skewMatrix[1] = vec4(tan(ySkew), 1.0,       0.0,      0.0);
    skewMatrix[2] = vec4(0.0,        0.0,       1.0,      0.0);
    skewMatrix[3] = vec4(0.0,        0.0,       0.0,      1.0);  
    
    gl_Position = uProjectionMatrix * vec4(inPosition, 1.0, 1.0) * skewMatrix;
    
    outTexCoord = inTexCoord;
    outTexId = inTexId;
    outTint = inTint;
    outTintEffect = inTintEffect;
}`;

class SkewPipeline extends Phaser.Renderer.WebGL.Pipelines.SinglePipeline {
    constructor(game) {
        let config = {
            game,
            renderer: game.renderer,
            vertShader: skewShader,
        };
        super(config);
    }
}

class Pen extends Phaser.Scene {
    constructor() {
        super("Pen");
    }

    preload() {
        this.load.image(
            "casino",
            "https://fielding.github.io/assets/sprites/casino.png"
        );
    }
    create() {
        this.renderer.pipelines.add("skew", new SkewPipeline(this.game));

        const shadow = this.add.sprite(800, 600, "casino").setOrigin(0.5, 1)
            .setPipeline("skew");

        this.add.graphics()
            .lineStyle(8, 0x000000)
            .strokeRectShape(shadow.getBounds())

        const point = this.add.circle(800, 600, 40, 0xff0000);


        this.cameras.main.setZoom(0.25);

        const cursors = this.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 1.0
        };

        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

        this.input.on("wheel", this.onWheel, this);
    }

    update(time, delta) {
        this.controls.update(delta);
    }

    onWheel(pointer) {
        let target = Phaser.Math.Clamp(
            this.cameras.main.zoom - 0.2 * Math.sign(pointer.deltaY),
            0.1,
            1
        );
        this.cameras.main.zoomTo(target, 300, undefined, true);
    }

}

const config = {
    type: Phaser.WEBGL,
    backgroundColor: 0xffffff,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: [Pen],
};

const game = new Phaser.Game(config);

console.log(game);
