// import Outline from '../../plugins/gameobjects/outline/Outline.js';

const frag = `
precision mediump float;

uniform vec2 resolution;
uniform sampler2D iChannel0;

varying vec2 fragCoord;

void rawImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / resolution.xy;

    vec4 tex = texture2D(iChannel0, uv);

    if (tex.w > 0.0)
    {
        fragColor = tex;
    }

    fragColor = vec4(tex.x + 0.5, tex.y + 0.5, tex.z + 0.5, tex.w + 0.5);
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
        this.mushrooms;
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        // var img = this.add.image(400, 300, 'mushroom');
        var rt = this.make.renderTexture({
            x: 0, y: 0,
            width: 1024, height: 1024,
            // add: false
        })
            .setOrigin(0)
            .fill(0xff0000, 1)

        var baseShader = new Phaser.Display.BaseShader('outline', frag);
        var shader = this.add.shader(baseShader, rt.x, rt.y, rt.width, rt.height)
            //.setSampler2DBuffer('iChannel0', rt.glTexture, rt.width, rt.height, 0)
            //.setOrigin(0)


        //.draw(img)
        // It maybe non-power-of-2 and have incompatible texture filtering

        // img.setPosition(400, 200);
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
    plugins: {
        //global: [{
        //    key: 'rexCanvasData',
        //    plugin: CanvasDataPlugin,
        //    start: true
        //}]
    }
};

var game = new Phaser.Game(config);