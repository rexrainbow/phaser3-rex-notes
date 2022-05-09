import 'phaser';
import ScriptTagLoad from '../../plugins/scripttagloader';

class Demo extends Phaser.Scene {
    print: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.print = this.add.text(0, 0, 'Preload\n');

        ScriptTagLoad.call(this.load, 'https://www.gstatic.com/firebasejs/7.5.2/firebase-app.js');
    }

    create() {
        this.print.text += 'Create\n';
        this.print.text += (window['firebase'] as any).SDK_VERSION;
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
    scene: Demo
};

var game = new Phaser.Game(config);