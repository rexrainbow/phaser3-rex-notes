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
            // .setVisible(false)
            .on('drop', function () {
                console.log('Drop file');
            })

        this.add.rectangle(400, 300, 200, 200, 0x00ff00)
            .setInteractive({ draggable: true })
            .on('pointerdown', function () {
                console.log('Pointer down on game object');
            })
            .on('pointerup', function () {
                console.log('Pointer up on game object');
            })
            .on('pointermove', function () {
                console.log('Pointer moving on game object');
            })
            .on('dragstart', function () {
                console.log('Drag-start game object');
            })

        /*
        1. DOM game object always put above game canvas, i.e. render above any other kind of game object.
        2. DOM game object will receive touch event even if it is not the first touched game object.
        3. P3's 'pointerdown', 'pointerup' events will be fired above/under DOM game object.
        4. P3's 'pointermove' event won't be fired above/under DOM game object with 'dragenter', 'dragover' events,
           unless setting DOM game object to be **invisilbe**.
        */
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