const frag = `
precision mediump float;

uniform vec2 resolution;
uniform sampler2D iChannel0;

varying vec2 fragCoord;

void rawImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / resolution.xy;

    vec4 tex = texture2D(iChannel0, uv);
 
    // if (tex.w > 0.0)
    // {
    //     fragColor = tex;
    // }

    fragColor = tex;
}

void main () {
    rawImage(gl_FragColor, fragCoord.xy);
}
`;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('character', 'assets/images/characters/src/A-smile.png');
    }

    create() {
        // var img = this.add.image(400, 300, 'character');
        // It maybe non-power-of-2 and have incompatible texture filtering
        //var rt = this.make.renderTexture({
        //    x: 0, y: 0,
        //    width: 1024, height: 1024,
        //    add: false
        //})
        //    .setOrigin(0)
        //    .draw(img);

        var baseShader = new Phaser.Display.BaseShader('outline', frag);
        var shader = this.add.shader(baseShader, 0, 0, 1024, 1024, ['character'])
            //.setSampler2DBuffer('iChannel0', rt.glTexture, rt.width, rt.height, 0)
            .setOrigin(0)

        // img.destroy();
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