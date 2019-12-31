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
        var table0 = rexParse.add.itemTable({
            className: 'messages'
        })
            .save([
                { name: 'player0', message: 'hello' },
                { name: 'player0', message: 'world' }
            ])
            .then(function () {
                console.log('save table0 complete');
            })
            .catch(function (error) {
                console.log(error)
            })

        var rexParse = this.plugins.get('rexParse');
        var table1 = rexParse.add.itemTable({
            className: 'characters',
            primaryKeys: ['name']
        })
            .save([
                { name: 'player0', hp: 10 },
                { name: 'player1', hp: 20 }
            ])
            .then(function () {
                console.log('save table1 complete');
            })
            .catch(function (error) {
                console.log(error)
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
            key: 'rexParse',
            plugin: ParsePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);