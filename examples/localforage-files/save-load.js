import 'phaser';
import FilesPlugin from '../../plugins/localforage-files-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var print = this.add.text(0, 0, '');

        var fileManager = this.plugins.get('rexFiles').add();

        fileManager
            .loadHeaders()
            .then(function (result) {
                console.log('Load headers', result.headers);
                return fileManager.save('slot1', { description: 'aabb' }, { a: 10, b: 20 });
            })
            .then(function (result) {
                return fileManager.load(result.fileID);
            })
            .then(function (result) {
                console.log('Load file:', result.fileID, result.header, result.content);

                return fileManager.save('slot2', { description: 'ccdd' }, { c: 10, d: 20 });
            })
            .then(function () {
                return fileManager.loadHeaders();
            })
            .then(function (result) {
                console.log('Load headers', result.headers);
            })
            .catch(function (result) {
                console.log('Error', result.error);
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexFiles',
            plugin: FilesPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);