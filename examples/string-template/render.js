import Phaser from 'phaser';
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
        var log = function (label, value) {
            print.text += `${label}: ${value}\n`;
        }

        var stringTemplate = this.plugins.get('rexStringTemplate')
        var filterTemplate = stringTemplate.add({
            filters: {
                wrap(value, left, right) {
                    return `${left}${value}${right}`;
                }
            }
        });

        var s = 'xxx {{ a.b.c + 10 }} xxx {{ name }} xxx';
        var f = stringTemplate.compile(s)

        var data = {
            a: { b: { c: 100 } },
            name: 'rex'
        }
        var result = f(data);
        log('Default delimiters', result);

        var result = stringTemplate.render('Hello <<name>>', data, { delimiters: ['<<', '>>'] })
        log('Angle delimiters', result);

        result = stringTemplate.render('Hello ${name}', data, { delimiters: ['${', '}'] });
        log('Regex-special delimiters', result);

        result = stringTemplate.render('Hello [name]', data, { delimiters: ['[', ']'] });
        log('Square delimiters', result);

        result = stringTemplate.render(`{{ '{{' + name + '}}' }}`, data);
        log('Delimiter in expression string', result);

        result = stringTemplate.render(`{{ '}}' + name }}`, data);
        log('Right delimiter in quoted string', result);

        result = stringTemplate.render('Escaped delimiter: \\{{name}}', data);
        log('Escaped delimiter', result);

        result = filterTemplate.render(`{{ name | upper | wrap('[', ']') }}: {{ hp | fixed(1) }}`, {
            name: 'rex',
            hp: 12.345
        });
        log('Pipe filters', result);

        result = filterTemplate.render(`{{ name | capitalize }} {{ ratio | percent(1) }} {{ price | currency('USD', 'en-US') }}`, {
            name: 'rex',
            ratio: 0.1234,
            price: 1234.5
        });
        log('Default filters', result);

        var cachedTemplate = stringTemplate.compile('Cached {{ name }}', {
            cache: true,
            expressionCompileConfig: {
                cache: true
            }
        });
        result = cachedTemplate(data);
        log('Template and expression cache', result);

        try {
            stringTemplate.render('{{}}', data);
        } catch (e) {
            log('Expected parse error', e.message.split('\n')[0]);
        }

        result = stringTemplate.render('{{ a }} {{ b }}', { a: 1, b: 2 });
        log('Render after parse error', result);
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
