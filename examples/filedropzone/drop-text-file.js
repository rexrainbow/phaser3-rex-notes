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

        var scene = this;
        fileDropZone
            .on('drop', function () {
                var files = fileDropZone.files;
                console.log('drop', files);

                if (files.length === 0) {
                    return;
                }

                fileDropZone
                    .loadFilePromise(files[0], 'text', 'file')
                    .then(function (content) {
                        console.log(content);
                    })
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