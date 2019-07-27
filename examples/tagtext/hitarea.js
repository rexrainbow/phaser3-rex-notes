import TagTextPlugin from '../../plugins/tagtext-plugin.js';

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

        var tags = {
            ABC: {
                color: 'yellow',
                area: 'ABC'
            },
            DEF: {
                area: 'DEF'
            },
            GHI: {
                area: 'GHI'
            },
        };
        var s1 = `1234<class='ABC'> ABC </class>5678
<class='DEF'> DEF </class> 90 <class='GHI'>GHI</class>`;
        var text = this.add.rexTagText(400, 30, s1, {
            backgroundColor: '#555',
            fontSize: '24px',
            align: 'right',
            wrap: {
                mode: 'char',
                width: 200
            },

            tags: tags
        })
            .drawAreaBounds(this.add.graphics(), 0xff0000)
            .setInteractive()
            .on('areadown', function (key) {
                print.text += `Click area:${key}\n`
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
            key: 'TagTextPlugin',
            plugin: TagTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);