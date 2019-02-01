import Parse from 'parse';
import ItemTable from '../../plugins/parse/itemtable/ItemTable.js';
import QuickLogin from '../../plugins/parse/quicklogin/QuickLogin.js';

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

        var table = new ItemTable({
            className: 'ownerTest',
            primaryKeys: ['name'],
            ownerWrite: true,
        });

        QuickLogin('rex', 'aabb')
            .then(function () {
                console.log('login');
                return Promise.resolve();
            })
            .then(function () {
                return table
                    .save({
                        name: 'player0',
                        hp: 20
                    });
            })
            .catch(function (error) {
                console.log(error);
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