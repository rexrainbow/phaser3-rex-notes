const fragShader = `
precision mediump float;

uniform sampler2D uMainSampler[%count%];
uniform float gray;

varying vec2 outTexCoord;
varying float outTexId;
varying vec4 outTint;
varying vec2 fragCoord;

void main()
{
    vec4 texture;

    %forloop%

    gl_FragColor = texture;
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126 * gl_FragColor.r + 0.7152 * gl_FragColor.g + 0.0722 * gl_FragColor.b), gray);
}
`;
class GrayScalePipeline extends Phaser.Renderer.WebGL.Pipelines.MultiPipeline {
    constructor(game) {
        super({
            game,
            fragShader,
            uniforms: [
                'uProjectionMatrix',
                'uMainSampler',
                'gray'
            ]
        });

        this._gray = 1;
    }

    onPreRender() {
        this.set1f('gray', this._gray);
    }

    get gray() {
        return this._gray;
    }

    set gray(value) {
        this._gray = value;
    }
}


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        this.renderer.pipelines.add('Gray', new GrayScalePipeline(this.game));
        const grayscalePipeline = this.renderer.pipelines.get('Gray');
        var sprite = this.add.image(400, 300, 'mushroom')

        // this.cameras.main.setPipeline(grayscalePipeline);
        sprite.setPipeline(grayscalePipeline);
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);