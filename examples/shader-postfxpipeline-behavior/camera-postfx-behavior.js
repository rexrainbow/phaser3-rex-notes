import phaser from 'phaser/src/phaser.js';
import PostFxPipelineBehavior from '../../dist/rexpostfxpipelinebehavior.js';

const frag = `\
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;
// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;
// Effect parameters
uniform float intensity;
void main (void) {
  vec4 front = texture2D(uMainSampler, outTexCoord);
  float gray = dot(front.rgb, vec3(0.299, 0.587, 0.114));
  gl_FragColor = mix(front, vec4(gray, gray, gray, front.a), intensity);
}
`;

class GrayScalePostFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexGrayScalePostFx',
            game: game,
            renderTarget: true,
            fragShader: frag
        });

        this.intensity = 1;
    }

    onPreRender() {
        this.set1f('intensity', this.intensity);
    }

    // intensity
    setIntensity(value) {
        this.intensity = value;
        return this;
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var gameObject = this.add.image(400, 300, 'classroom')//.setScale(0.75);
        var behavior = new PostFxPipelineBehavior(this.cameras.main, GrayScalePostFxPipeline);
        var postFxPipeline = behavior.getPipeline();
        postFxPipeline.setIntensity(1);

        this.input.once('pointerdown', function () {
            behavior.freePipeline();
        });
    }

    update() {
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
    scene: Demo,
};

var game = new Phaser.Game(config);