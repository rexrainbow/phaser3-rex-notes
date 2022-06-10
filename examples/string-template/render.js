import phaser from 'phaser/src/phaser.js';
import StringTemplatePlugin from '../../plugins/stringtemplate-plugin.js';


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var print = this.add.text(0, 0, '');

        var stringTemplate = this.plugins.get('rexStringTemplate')

        var s = 'xxx {{ a.b.c + 10 }} xxx {{ name }} xxx';
        var f = stringTemplate.compile(s)

        var data = {
            a: { b: { c: 100 } },
            name: 'rex'
        }
        var result = f(data);
        print.text += `${result}\n`;

        var result = stringTemplate.render('Hello <<name>>', data, { delimiters: ['<<', '>>'] })
        print.text += `${result}\n`;
    }

    update() {

    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexStringTemplate',
            plugin: StringTemplatePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);
