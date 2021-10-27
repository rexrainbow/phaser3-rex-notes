import 'phaser';
import ModalPlugin from '../../plugins/modal-plugin.js';

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
        var print = this.add.text(0, 0, 'Any click or wait timeout\n').setDepth(1);

        this.add.image(400, 300, 'classroom')
            .setInteractive()
            .on('pointerup', function () {
                print.text += 'Click bottom image\n';
            })

        var button = this.add.rectangle(400, 300, 100, 100, 0xffffff)
            .on('modal.open', function () {
                print.text += 'modal.open\n';
            })
            .on('modal.close', function () {
                print.text += 'modal.close\n';
            })
        // button will be destroyed after modal closing
        this.plugins.get('rexModal').promise(button, {
            manualClose: false,
            duration: {
                in: 1000,
                hold: 3000,
                out: 1000
            },
            anyTouchClose: true
        })
            .then(function () {
                print.text += 'Modal close\n';
            })
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
            key: 'rexModal',
            plugin: ModalPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);