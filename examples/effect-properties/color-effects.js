import phaser from 'phaser/src/phaser.js';
import EffectPropertiesPlugin from '../../plugins/effectproperties-plugin.js';
import FSMPlugin from '../../plugins/fsm-plugin.js';

var states = [
    'blackWhite', 'grayscale', 'desaturateLuminance', 'negative',
    'sepia', 'brown', 'vintagePinhole', 'kodachrome', 'technicolor', 'polaroid', 'lsd',
    'hue', 'shiftToBGR',
];
var stateConfig = {
    states: {
        blackWhite: {
            enter: function () {
                this.gameObject.blackWhite = 1;
            },
            exit: function () {
                this.gameObject.blackWhite = null;
            }
        },
        grayscale: {
            enter: function () {
                this.gameObject.grayscale = 1;
            },
            exit: function () {
                this.gameObject.grayscale = null;
            }
        },
        desaturateLuminance: {
            enter: function () {
                this.gameObject.desaturateLuminance = 1;
            },
            exit: function () {
                this.gameObject.desaturateLuminance = null;
            }
        },
        negative: {
            enter: function () {
                this.gameObject.negative = 1;
            },
            exit: function () {
                this.gameObject.negative = null;
            }
        },
        sepia: {
            enter: function () {
                this.gameObject.sepia = 1;
            },
            exit: function () {
                this.gameObject.sepia = null;
            }
        },
        brown: {
            enter: function () {
                this.gameObject.brown = 1;
            },
            exit: function () {
                this.gameObject.brown = null;
            }
        },
        vintagePinhole: {
            enter: function () {
                this.gameObject.vintagePinhole = 1;
            },
            exit: function () {
                this.gameObject.vintagePinhole = null;
            }
        },
        kodachrome: {
            enter: function () {
                this.gameObject.kodachrome = 1;
            },
            exit: function () {
                this.gameObject.kodachrome = null;
            }
        },
        technicolor: {
            enter: function () {
                this.gameObject.technicolor = 1;
            },
            exit: function () {
                this.gameObject.technicolor = null;
            }
        },
        polaroid: {
            enter: function () {
                this.gameObject.polaroid = 1;
            },
            exit: function () {
                this.gameObject.polaroid = null;
            }
        },
        lsd: {
            enter: function () {
                this.gameObject.lsd = 1;
            },
            exit: function () {
                this.gameObject.lsd = null;
            }
        },
        hue: {
            enter: function () {
                this.gameObject.hue = 270;
            },
            exit: function () {
                this.gameObject.hue = null;
            }
        },
        shiftToBGR: {
            enter: function () {
                this.gameObject.shiftToBGR = 1;
            },
            exit: function () {
                this.gameObject.shiftToBGR = null;
            }
        },
    },
    extend: {
        gameObject: null
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('logo', 'assets/images/logo.png');
    }

    create() {
        this.add.image(200, 200, 'logo').setScale(0.75);

        var image = this.add.image(500, 400, 'logo').setScale(0.75);
        this.plugins.get('rexEffectProperties').add(image);

        var state = this.plugins.get('rexFSM').add(stateConfig)
        state.gameObject = image;

        var print = this.add.text(0, 580, '');
        var idx = 0;
        this.input.on('pointerdown', function () {
            var effectName = states[idx];
            state.goto(effectName);
            print.text = effectName;

            idx = (idx + 1) % states.length;
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
        global: [
            {
                key: 'rexEffectProperties',
                plugin: EffectPropertiesPlugin,
                start: true
            },
            {
                key: 'rexFSM',
                plugin: FSMPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);