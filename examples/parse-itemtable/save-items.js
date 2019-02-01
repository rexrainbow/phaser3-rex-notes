import Parse from 'parse';
import ItemTable from '../../plugins/parse/itemtable/ItemTable.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() {}

    create() {
        Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
        Parse.initialize(
            'HSEc6FPwSQxMPzFwBooEme2n0agfUIBgFcO8LNtr', // This is your Application ID
            'DbgfGW40cdqUQug8cv6NDAplB1D9daNIjcYtdGSQ' // This is your Javascript key
        );

        var table0 = new ItemTable({
                className: 'messages'
            })
            .save([{
                    name: 'player0',
                    message: 'hello'
                },
                {
                    name: 'player0',
                    message: 'world'
                }
            ])
            .then(function () {
                console.log('save table0 complete');
            })
            .catch(function (error) {
                console.log(error)
            })

        var table1 = new ItemTable({
                className: 'characters',
                primaryKeys: ['name']
            })
            .save([{
                    name: 'player0',
                    hp: 10
                },
                {
                    name: 'player1',
                    hp: 20
                }
            ])
            .then(function () {
                console.log('save table1 complete');
            })
            .catch(function (error) {
                console.log(error)
            })
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
    scene: Demo
};

var game = new Phaser.Game(config);