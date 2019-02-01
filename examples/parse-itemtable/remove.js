import Parse from 'parse';
import ItemTable from '../../plugins/parse/itemtable/ItemTable.js';

const Random = Phaser.Math.Between;
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
            className: 'characters',
            primaryKeys: ['name'],
            lines: 3,
        });

        // Save something
        var promises = [];
        for (var i = 0; i < 5; i++) {
            promises.push(
                table.save({
                    name: 'player' + i,
                    hp: i * 10
                })
            )
        }


        Promise.all(promises)
            // Load all
            .then(function () {
                return table.loadAll();
            })
            .then(function (results) {
                console.log('---- Load all ----');
                console.log(JSON.parse(JSON.stringify(results)));
                return Promise.resolve();
            })
            // Remove
            .then(function () {
                var query = table.createQuery().greaterThanOrEqualTo('hp', 30);
                return table.remove(query);
            })
            // Load all
            .then(function () {
                return table.loadAll();
            })
            .then(function (results) {
                console.log('---- Load all ----');
                console.log(JSON.parse(JSON.stringify(results)));
                return Promise.resolve();
            })
            .catch(function (error) {
                console.log(error);
            });


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