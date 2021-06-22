import 'phaser';
import ScriptTagLoaderPlugin from '../../plugins/scripttagloader-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() {
        this.print = this.add.text(0, 0, 'Preload\n');

        this.load.rexScriptTag('https://www.gstatic.com/firebasejs/7.5.2/firebase-app.js');
        // this.load.script('firebase-app', 'https://www.gstatic.com/firebasejs/7.5.2/firebase-app.js');
    }

    create() {
        this.print.text += 'Create\n';
        this.print.text += firebase.SDK_VERSION;
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
    plugins: {
        global: [{
            key: 'rexScriptTagLoader',
            plugin: ScriptTagLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);