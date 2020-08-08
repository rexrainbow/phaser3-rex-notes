const frag = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer

uniform sampler2D uMainSampler[16];
varying vec2 outTexCoord;
varying float outTexId;
vec4 MyTexture2D(vec2 coords) {
  if (outTexId < 0.5) {return texture2D(uMainSampler[0], coords);}
  else if (outTexId < 1.5) {return texture2D(uMainSampler[1], coords);}
  else if (outTexId < 2.5) {return texture2D(uMainSampler[2], coords);}
  else if (outTexId < 3.5) {return texture2D(uMainSampler[3], coords);}
  else if (outTexId < 4.5) {return texture2D(uMainSampler[4], coords);}
  else if (outTexId < 5.5) {return texture2D(uMainSampler[5], coords);}
  else if (outTexId < 6.5) {return texture2D(uMainSampler[6], coords);}
  else if (outTexId < 7.5) {return texture2D(uMainSampler[7], coords);}
  else if (outTexId < 8.5) {return texture2D(uMainSampler[8], coords);}
  else if (outTexId < 9.5) {return texture2D(uMainSampler[9], coords);}
  else if (outTexId < 10.5) {return texture2D(uMainSampler[10], coords);}
  else if (outTexId < 11.5) {return texture2D(uMainSampler[11], coords);}
  else if (outTexId < 12.5) {return texture2D(uMainSampler[12], coords);}
  else if (outTexId < 13.5) {return texture2D(uMainSampler[13], coords);}
  else if (outTexId < 14.5) {return texture2D(uMainSampler[14], coords);}
  else {return texture2D(uMainSampler[15], coords);}

}

// Effect parameters=

void main (void) {
  vec4 front = MyTexture2D(outTexCoord);
  float gray = dot(front.rgb, vec3(0.299, 0.587, 0.114));
  gl_FragColor = mix(front, vec4(gray, gray, gray, front.a), 1.0);
}`;

class GrayscalePipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {

    constructor(game) {
        super({
            game: game,
            renderer: game.renderer,
            fragShader: frag
        })
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
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        this.grayscalePipeline = game.renderer.addPipeline('Grayscale', new GrayscalePipeline(this.game));
        this.cameras.main.setRenderToTexture(this.grayscalePipeline);

        // case1: add one 800x600 image ('classroom') works well
        // case2: add image 'classroom' and 'mushroom' works well
        // case3: add image 'mushroom' only, size of camera seems shrink 

        // this.add.image(400, 300, 'classroom')
        this.add.image(400, 300, 'mushroom')
    }

    update(time) { }
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