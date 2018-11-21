import VDataPlugin from 'rexPlugins/vdata-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var data = this.plugins.get('rexVData').add(this, new Phaser.Events.EventEmitter());
        data
            .set('a', 10)
            .set('b', 100)
            .commit() // version: 1
            .set('a', 20)
            .commit() // version: 2
            .set('a', 30)
            .set('b', 300)
            .commit() // version: 3
            .set('b', 400)

        var rollback = function (version) {
            console.log('Rollback to version: ' + version);
            data
                .rollback(version)
                .each(function (parent, key, data) {
                    console.log(key + ':' + data)
                })
            console.log('----');
        }

        rollback(1);
        rollback(2);
        rollback(1);
        rollback(3);
        rollback(0);
        rollback(2);

        console.log('Current version: ' + data.version);
        console.log('Last version: ' + data.lastVersion);
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexVData',
            plugin: VDataPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);