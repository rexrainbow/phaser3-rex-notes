import RDataPlugin from 'rexPlugins/restorabledata-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var print = this.add.text(0, 0, '');
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

        var rollback = function (version) {
            print.text += 'Restore to version: ' + version + '\n';
            data
                .rollback(version)
                .each(function (parent, key, data) {
                    print.text += key + ':' + data + '\n';
                });
            print.text += '----\n';
        }

        rollback(1);
        rollback(2);
        rollback(1);
        rollback(3);
        rollback(0);
        rollback(2);

        print.text += 'Current version: ' + data.version + '\n';
        print.text += 'Last version: ' + data.lastVersion + '\n';
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