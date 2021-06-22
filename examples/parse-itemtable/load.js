import 'phaser';
import ParsePlugin from '../../plugins/parse-plugin.js';

const Random = Phaser.Math.Between;
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
            primaryKeys: ['name'],
            itemCount: 3,
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
            .then(function () {
                table.setQuery();  // Reset to base query
                return table.load();  // Load all
            })
            .then(function (results) {
                console.log('---- Load all ----');
                console.log(JSON.parse(JSON.stringify(results)));

                var query = table.baseQuery.ascending('hp');
                table.setQuery(query);
                return table.loadCurrentPage();  // Load a page
            })
            .then(function (results) {
                console.log('---- Load current page ----');
                console.log(JSON.parse(JSON.stringify(results)));
                console.log(table.isLastPage);

                return table.loadNextPage();
            })
            .then(function (results) {
                console.log('---- Load next page ----');
                console.log(JSON.parse(JSON.stringify(results)));
                console.log(table.isLastPage);
                // return Promise.resolve();
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