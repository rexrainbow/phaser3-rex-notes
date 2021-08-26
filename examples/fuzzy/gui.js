import 'phaser';
import FuzzyPlugin from '../../plugins/fuzzy-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

var fuzzyModuleConfig = `
// Health point
HP-   : 0, 0.25, 0.5
HP    : 0.25, 0.5, 0.75
HP+   : 0.5, 0.75, 1

// Aggressive 
AGG-  : 0, 0.25, 0.5
AGG   : 0.25, 0.5, 0.75
AGG+  : 0.5, 0.75, 1

// Attack
ATK-  : 0, 0.25, 0.5
ATK   : 0.25, 0.5, 0.75
ATK+  : 0.5, 0.75, 1

// Heal
HEAL- : 0, 0.25, 0.5
HEAL  : 0.25, 0.5, 0.75
HEAL+ : 0.5, 0.75, 1

// Rules
// Heal
HP-          => HEAL+
HP and AGG-  => HEAL
HP+ and AGG- => HEAL-

// Attack
HP+ or AGG+   => ATK+
HP and AGG    => ATK
HP- and AGG-  => ATK-
`;

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var fuzzyModule = this.plugins.get('rexFuzzy').add(fuzzyModuleConfig);

        this.add.text(0, 0, fuzzyModuleConfig);

        var ui = this.rexUI.add.sizer({
            x: 600, y: 300,
            width: 400,
            orientation: 'y'
        })
            .addBackground(
                this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK)
            )
            .add(
                CreateBar(this, 'Health point'),
                {
                    expand: true,
                    key: 'HP'
                }
            )
            .add(
                CreateBar(this, 'Aggressive'),
                {
                    expand: true,
                    key: 'AGG'
                }
            )
            .add(
                CreateBar(this, 'Heal', true),
                {
                    expand: true,
                    key: 'HEAL'
                }
            )
            .add(
                CreateBar(this, 'Attack', true),
                {
                    expand: true,
                    key: 'ATK'
                }
            )
            .layout()

        var UpdateFuzzyModule = function () {
            // Compute
            var result = fuzzyModule
                .fuzzify({
                    HP: ui.getElement('HP').value,
                    AGG: ui.getElement('AGG').value
                })
                .defuzzify();

            // Get output
            var heal = result.HEAL;
            var attack = result.ATK;

            // Display output
            ui.getElement('HEAL').setValue(heal);
            ui.getElement('ATK').setValue(attack);

            var healSliderBarAlpha = (heal >= attack) ? 1 : 0.3;
            var attackSliderBarAlpha = (attack >= heal) ? 1 : 0.3;
            ui.getElement('HEAL.slider.indicator').setFillStyle(COLOR_LIGHT, healSliderBarAlpha);
            ui.getElement('ATK.slider.indicator').setFillStyle(COLOR_LIGHT, attackSliderBarAlpha);
        }

        UpdateFuzzyModule();

        ui.getElement('HP').on('valuechange', UpdateFuzzyModule)
        ui.getElement('AGG').on('valuechange', UpdateFuzzyModule)

    }

    update() { }
}

var CreateBar = function (scene, text, readOnly) {
    return scene.rexUI.add.numberBar({
        // background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),

        icon: scene.add.text(0, 0, text).setFixedSize(120, 0),

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
            indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            input: (readOnly) ? 'none' : 'click',
        },

        text: scene.add.text(0, 0).setFixedSize(30, 0),

        space: {
            left: 10,
            right: 10,
            top: 20,
            bottom: 20,

            icon: 10,
            slider: 10,
        },

        valuechangeCallback: function (newValue, oldValue, numberBar) {
            numberBar.text = Math.round(Phaser.Math.Linear(0, 100, newValue));
        },

        value: Math.random(),

        gap: 0.01,
    })
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
            key: 'rexFuzzy',
            plugin: FuzzyPlugin,
            start: true
        }],
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);