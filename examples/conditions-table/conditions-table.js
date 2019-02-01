import ConditionsTablePlugin from '../../plugins/conditionstable-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.print;
    }

    preload() {}

    create() {
        var table = `,A,A,B
Test1,>= 10,<= 20,
Test2,,,3`;
        var conditionstable = this.plugins.get('rexConditionsTable').add().loadCSV(table);

        console.log('---- Each pass ----');
        conditionstable.eachPassTest({
            A: 10,
            B: 3
        }, function (testName) {
            console.log(testName);
        })

        console.log('---- Each ----');
        conditionstable.eachTest({
            A: 15,
            B: 6
        }, function (testName, pass) {
            var s = ((pass) ? 'Pass' : 'Fail') + ': ' + testName;
            console.log(s);
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
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexConditionsTable',
            plugin: ConditionsTablePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);