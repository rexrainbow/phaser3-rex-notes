import 'phaser';
import ParsePlugin from '../../plugins/parse-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() {
        this.plugins.get('rexParse').preload(this);
    }

    create() {
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'HSEc6FPwSQxMPzFwBooEme2n0agfUIBgFcO8LNtr', // This is your Application ID
            'DbgfGW40cdqUQug8cv6NDAplB1D9daNIjcYtdGSQ' // This is your Javascript key
        );

        var rexParse = this.plugins.get('rexParse');
        var table = rexParse.add.itemTable({
            className: 'characters',
            primaryKeys: ['name']
        });

        table
            // Save json data
            .save(
                {
                    name: 'player0',
                    hp: 20,
                    mp: 5,
                    coin: 20
                }
            )
            .then(function (item) {
                console.log('Save result:', JSON.parse(JSON.stringify(item)));
                return table.loadItem(item.id);
            })
            .then(function (item) {
                console.log('Load result', JSON.parse(JSON.stringify(item)));
                return table.save({
                    name: 'player0',
                    coin: 30
                })
            })
            .then(function (item) {
                console.log('Save result:', JSON.parse(JSON.stringify(item)));
                return table.loadItem(item.id);
            })
            .then(function (item) {
                console.log('Load result', JSON.parse(JSON.stringify(item)));
                return table.save([
                    { name: 'player0', hp: 1 },
                    { name: 'player1', hp: 3 }
                ])
            })
            .then(function (items) {
                console.log('Save result', JSON.parse(JSON.stringify(items)));
            })

            .catch(function (error) {
                console.log(error);
            });

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
            key: 'rexParse',
            plugin: ParsePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);