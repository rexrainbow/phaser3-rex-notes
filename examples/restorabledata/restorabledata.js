import RDataPlugin from '../../plugins/restorabledata-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var data = this.plugins.get('rexRData').add(this);
        data
            .set('a', 10)
            .set('b', 100)
            .commit('save0') // save0: {a:10, b:100}
            .set('a', 20)
            .commit('save1') // save1: {a:20, b:100}
            .set('a', 30)
            .set('b', 300)
            .commit('save2') // save2: {a:30, b:300}
            .set('b', 400)

        var dump = function () {
            console.log('---- Dump data, version = ' + data.versionAlias + ' ----');
            data.each(function (parent, key, data) {
                console.log(key + ':' + data);
            });
            console.log('----');
        }
        var restore = function (version) {
            data.restore(version);
            dump();
        }

        console.log(data.versionAliases);

        restore();
        restore('save0');
        restore('save1');
        restore('save0');
        restore('save2');
        restore('save1');

        console.log('Current version: ' + data.versionAlias);

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
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
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