import phaser from 'phaser/src/phaser.js';
import CreateMonitorPanel from '../../templates/mdscenario/monitor/CreateMonitorPanel.js';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        // this.load.image('bg', 'assets/images/ninepatch/black_icon.png');
        this.load.image('bg', 'assets/images/ninepatch/blue_icon.png');
    }

    create() {
        var style = {
            width: 340, height: 300,
            colors: {
                main: 0x424242,
                light: 0x6d6d6d,
                dark: 0x1b1b1b
            },
            fontSize: 24,
            background: {
                key: 'bg',
                leftWidth: 10,
                rightWidth: 10,
                topHeight: 10,
                bottomHeight: 10,
            }
        }

        var memory = {
            coin: 10,
            charA: {
                hp: 100,
                mp: 100,

                poisoned: true,
                chaos: false,

                str: 5,
                agi: 3,
                int: 2
            },
            a: 10,
            b: 20,
            c: 30,
            d: 40,
            e: 50,
            f: 60
        }

        // Formatter of text
        var properties = [
            {
                $key: 'coin',
                max: 100, min: 10, step: 1,
                onValueChange(newValue, oldValue, bindingTarget, bindingKey) {
                    // ValueChange callback only for this bindingKey
                    // console.log(`${oldValue} -> ${newValue}`)
                }
            },
            { $type: 'separator' },
            {
                $type: 'folder', title: 'CharA',
                $properties: [
                    {
                        $type: 'tab',
                        pages: [
                            {
                                title: 'Status',
                                $properties: [
                                    { $key: 'charA.hp', int: true },
                                    { $key: 'charA.mp', int: true }
                                ]
                            },

                            {
                                title: 'States',
                                $properties: [
                                    { $key: 'charA.poisoned' },
                                    { $key: 'charA.chaos' }
                                ]
                            },

                            {
                                title: 'Traits',
                                $properties: [
                                    { $key: 'charA.str', max: 100, min: 0, step: 1 },
                                    { $key: 'charA.agi', max: 100, min: 0, step: 1 },
                                    { $key: 'charA.int', max: 100, min: 0, step: 1 }
                                ]
                            }
                        ]
                    },
                ]
            },
            { $type: 'separator' },
            {
                $key: 'a',
            },
            {
                $key: 'b',
            },
            {
                $key: 'c',
            },
            {
                $key: 'd',
            },
            {
                $key: 'e',
            },
            {
                $key: 'f',
            },
            { $type: 'separator' },
            {
                $type: 'button', title: 'Action', label: 'Dump',
                callback(target) {
                    console.log(target)
                }
            }
        ]

        var viewport = this.scale.getViewPort();
        var panel0 = CreateMonitorPanel(this, style, memory, properties)
            .setPosition(viewport.centerX - 220, viewport.centerY)
            .layout()

        var panel1 = CreateMonitorPanel(this, style, memory, properties)
            .setPosition(viewport.centerX + 220, viewport.centerY)
            .layout()


        panel0.on('valuechange', function (newValue, oldValue, bindingTarget, bindingKey) {
            // ValueChange callback for all keys
            console.log(`${bindingKey}: ${oldValue} -> ${newValue}`)
        })

    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);