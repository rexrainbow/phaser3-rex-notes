import phaser from 'phaser/src/phaser.js';
import FileDropZonePlugin from '../../plugins/filedropzone-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var fileDropZone = this.add.rexFileDropZone(400, 300, 200, 200, {
            style: {
                'background-color': 'brown'
            }
        })

        fileDropZone
            .on('drop', function () {
                console.log('Drop file');
            })

        this.add.rectangle(400, 300, 200, 200, 0x00ff00)
            .setInteractive({ draggable: true })
            .on('pointerdown', function () {
                console.log('Click game object');
            })
            .on('dragstart', function( ) {
                console.log('Drag-start game object');
            })
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
    dom: {
        createContainer: true
    },
    scene: Demo,
    plugins: {
        global: [
            {
                key: 'rexFileDropZone',
                plugin: FileDropZonePlugin,
                start: true
            },
        ]
    }
};

var game = new Phaser.Game(config);