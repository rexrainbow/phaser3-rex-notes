import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        CreatePanel(this,
            {
                width: 150,
                height: 300,

                space: { left: 5, right: 5, top: 5, bottom: 5 },

                background: this.rexUI.add.roundRectangle({
                    strokeColor: COLOR_PRIMARY,
                    strokeWidth: 5,
                }),

                header: CreateHeader(this, 'Header'),

                child: CreateInnerPanel(this, 5),

                footer: CreateHeader(this, 'Footer'),
            }
        )
            .setPosition(400, 300)
            .layout()
    }

    update() { }
}

var CreatePanel = function (scene, config) {
    if (config === undefined) {
        config = {};
    }
    if (!config.hasOwnProperty('orientation')) {
        config.orientation = 'y';
    }
    var panel = scene.rexUI.add.sizer(config)

    var background = GetValue(config, 'background');
    if (background) {
        panel.addBackground(background, 'background');
    }

    var header = GetValue(config, 'header');
    if (header) {
        panel.add(
            header,
            { proportion: 0, expand: true, key: 'header' }
        );
    }

    var child = GetValue(config, 'child');
    if (child) {
        var panelWidth = GetValue(config, 'width');
        var panelHeight = GetValue(config, 'height');
        var expandChildWidth = GetValue(config, 'expandChildWidth', (panelWidth !== undefined));
        var expandChildHeight = GetValue(config, 'expandChildHeight', (panelHeight !== undefined));
        panel.add(
            child,
            {
                proportion: (expandChildHeight) ? 1 : 0,
                expand: expandChildWidth,
                key: 'child'
            }
        )
    }

    var footer = GetValue(config, 'footer');
    if (footer) {
        panel.add(
            footer,
            { proportion: 0, expand: true, key: 'footer' }
        );
    }

    return panel
}

var CreateInnerPanel = function (scene, itemCount) {
    var sizer = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { left: 6, right: 6, top: 6, bottom: 6, item: 6 },
    })

    for (var i = 0; i < itemCount; i++) {
        sizer.add(
            CreateLabel(scene, i.toString()),
            { expand: true }
        );
    }
    return sizer;
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            radius: 10,
            color: COLOR_PRIMARY
        }),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),

        align: 'center',
        space: {
            left: 5,
            right: 5,
            top: 5,
            bottom: 5,
        },

    })
}

var CreateHeader = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            color: COLOR_LIGHT
        }),

        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),

        align: 'left',
        space: {
            left: 5, right: 5, top: 5, bottom: 5,
        },

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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);