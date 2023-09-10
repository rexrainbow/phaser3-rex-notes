import phaser from 'phaser/src/phaser.js';

const fragShader = `
precision mediump float;
uniform sampler2D uMainSampler;
uniform sampler2D uMaskSampler;
varying vec2 outTexCoord;

void main ()
{
    vec4 color = texture2D(uMainSampler, outTexCoord);
    vec4 maskColor = texture2D(uMaskSampler, outTexCoord);
    gl_FragColor = vec4(color.rgb * maskColor.a, color.a * maskColor.a);
}
`;

class MaskFX extends Phaser.Renderer.WebGL.Pipelines.PreFXPipeline {
    constructor(game) {
        super({
            game,
            fragShader
        });
    }

    onDraw(renderTarget) {
        var sprite = this.tempSprite;
        var glTexture = sprite.maskFrame.glTexture;

        this.set1i('uMainSampler', 0);
        this.set1i('uMaskSampler', 1);
        this.bindTexture(glTexture, 1);

        super.onDraw(renderTarget);
    }
}

export default class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('volume', 'assets/images/volume.png');
    }

    create() {
        var pipelineInstance = this.renderer.pipelines.add('MaskFX', new MaskFX(this.game));

        var img0 = this.add.image(400, 300, 'classroom').setPipeline(pipelineInstance)
        img0.maskFrame = this.textures.getFrame('volume');
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