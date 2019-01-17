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

        var table = new ItemTable({
            className: 'characters',
            primaryKeys: ['name']
        });

        table
            // Save json data
            .save({
                name: 'Rex',
                hp: 20,
                mp: 5,
                coin: 20
            })
            .then(function (item) {
                console.log(JSON.parse(JSON.stringify(item)));
                return table.loadItem(item.id);
            })
            .then(function (item) {
                console.log(JSON.parse(JSON.stringify(item)));
            })
            .catch(function (error) {
                console.log(error);
            });

        table
            // save parse item
            .save(
                table.createItem()
                .set('name', 'Alice')
                .set('hp', 100)
                .increment('mp', 1)
                .set('coin', 100)
            )
            .then(function (item) {
                console.log(JSON.parse(JSON.stringify(item)));
                return table.loadItem(item.id);
            })
            .then(function (item) {
                console.log(JSON.parse(JSON.stringify(item)));
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
    scene: Demo
};

var game = new Phaser.Game(config);