import RDataPlugin from 'rexPlugins/restorabledata-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var data = this.plugins.get('rexRData').add(this, new Phaser.Events.EventEmitter());
        data
            .set('a', 10)
            .set('b', 100)
            .commit() // version 1: {a:10, b:100}
            .set('a', 20)
            .commit() // version 2: {a:20, b:100}
            .set('a', 30)
            .set('b', 300)
            .commit() // version 3: {a:30, b:300}
            .set('b', 400)

        var dump = function () {
            console.log('---- Dump data, version = ' + data.version + ' ----');
            data.each(function (parent, key, data) {
                console.log(key + ':' + data);
            });
            console.log('----');
        }
        var restore = function (version) {            
            data.restore(version);
            dump();
        }

        restore(1);
        restore(2);
        restore(1);
        restore(3);
        restore(0);
        restore(2);

        console.log('Current version: ' + data.version);
        console.log('Last version: ' + data.lastVersion);

        var s = JSON.stringify(data);
        console.log('Save status to string: ' + s);

        console.log('Reset data');
        data.reset();
        dump();

        console.log('Load status back');
        data.resetFromJSON(JSON.parse(s));
        dump();
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
            key: 'rexRData',
            plugin: RDataPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);