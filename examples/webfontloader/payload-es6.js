import WebFontLoaderPlugin from '../../plugins/webfontloader-plugin.js';

var sceneConfig = {
    key: 'examples',
    pack: {
        files: [{
                type: 'rexWebFont',
                key: 'webfont',
                config: {
                    google: {
                        families: ['Bangers']
                    }
                }
            },
            {
                type: 'image',
                key: 'dot',
                url: 'assets/images/white-dot.png'
            }
        ]
    }
};

class Demo extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    preload() {
        this.add.text(100, 0, 'default font', {
            fontSize: '60px'
        });

        this.add.text(100, 100, 'preload stage ', {
            fontFamily: 'Bangers',
            fontSize: '60px'
        });

        var config = {
            google: {
                families: ['Droid Sans']
            }
        };
        this.load.rexWebFont(config);
    }

    create() {
        this.add.text(100, 200, 'create stage ', {
            fontFamily: 'Droid Sans',
            fontSize: '60px'
        });

        this.add.image(700, 500, 'dot').setScale(10);
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
            key: 'WebFontLoader',
            plugin: WebFontLoaderPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);