import phaser from 'phaser/src/phaser.js';

const fragShader = `
#define SHADER_NAME EXAMPLE_PRE_FX_FS

precision mediump float;

uniform sampler2D uMainSampler;
uniform float uOffset;

varying vec2 outTexCoord;

void main ()
{
    vec4 color = texture2D(uMainSampler, outTexCoord);

    vec4 red = vec4(1.0, 0.0, 0.0, 1.0);

    if (outTexCoord.x < uOffset)
    {
        color.rgb *= red.rgb;
    }

    gl_FragColor = vec4(color.rgb, color.a);
}
`;

class RedFX extends Phaser.Renderer.WebGL.Pipelines.PreFXPipeline {
    constructor(game) {
        super({
            game,
            fragShader
        });
    }

    onDraw(renderTarget) {
        var sprite = this.tempSprite;
        this.set1f('uOffset', sprite.redFxOffset);

        super.onDraw(renderTarget);
    }

}

export default class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var pipelineInstance = this.renderer.pipelines.add('RedFX', new RedFX(this.game));

        var img0 = this.add.image(200, 300, 'mushroom').setPipeline(pipelineInstance)
        img0.redFxOffset = 0;

        var img1 = this.add.image(600, 300, 'mushroom').setPipeline(pipelineInstance)
        img1.redFxOffset = 0;

        this.tweens.add({
            targets: img0,
            redFxOffset: 1.0,
            ease: 'Sine.easeInOut',
            duration: 2000,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: img1,
            redFxOffset: 1.0,
            ease: 'Sine.easeInOut',
            duration: 2000,
            yoyo: true,
            repeat: -1,
            delay: 1000
        });
    }
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
    backgroundColor: '#0a0067',
    scene: Example
};


let game = new Phaser.Game(config);