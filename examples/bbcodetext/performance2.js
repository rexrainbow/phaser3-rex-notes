import phaser from 'phaser/src/phaser.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
var CreateBBCodeText = function (scene, count) {
    var txt = scene.add.rexBBCodeText(200, 300, 'a', {
        wrap: { mode: 'word', width: 300 }
    });

    var t0 = performance.now();
    for (var i = 0; i < count; i++) {
        txt.setText(content).setText('a');
    }
    var t1 = performance.now();
    scene.add.text(200, 250, `BBCodeText: ${Math.floor(t1 - t0)}`);
    /*   
    Width lines pool    : 346
    Widthout lines pool : 10650
    */
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var count = 1000;
        this.time.delayedCall(2000, CreateBBCodeText, [this, count]);
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
            key: 'BBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);