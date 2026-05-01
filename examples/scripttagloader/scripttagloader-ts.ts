import 'phaser';
import ScriptTagLoad from '../../plugins/scripttagloader';

type FirebaseGlobal = {
    SDK_VERSION: string;
};

class Demo extends Phaser.Scene {
    declare print: Phaser.GameObjects.Text;
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.print = this.add.text(0, 0, 'Preload\n');

        this.load.rexScriptTag('https://www.gstatic.com/firebasejs/7.5.2/firebase-app.js');
    }

    create() {
        this.print.text += 'Create\n';
        this.print.text += ((window as unknown) as Window & { firebase: FirebaseGlobal }).firebase.SDK_VERSION;
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
