import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');
    }

    create() {
        var image = this.rexUI.add.transitionImagePack(400, 300, 'classroom')
            .setScale(0.85)
            .on('complete', function () {
                console.log('complete')
            })

        var transitionModes = [
            'fade', 'crossFade',
            'slideAwayRight', 'slideAwayLeft', 'slideAwayUp', 'slideAwayDown',
            'slideRight', 'slideLeft', 'slideUp', 'slideDown',
            'pushRight', 'pushLeft', 'pushUp', 'pushDown',
            'zoomOut', 'zoomIn', 'zoomInOut',
            'blinds', 'squares', 'diamonds', 'curtain',
            'irisOut', 'irisIn', 'pieOut', 'pieIn',
            'wipeLeft', 'wipeRight', 'wipeUp', 'wipeDown',
            'pixellate', 'dissolve',
        ];

        var dropDownList = CreateDropDownList(this, 50, 0, 500, transitionModes)
            .setOrigin(0)
            .layout()

        image
            .setInteractive()
            .on('pointerdown', function () {
                var nextKey = (image.texture.key === 'classroom') ? 'road' : 'classroom';
                image.transit(nextKey, undefined, dropDownList.text);
            })

        this.add.text(0, 580, 'Click image to transit it');
    }

    update() { }
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateDropDownList = function (scene, x, y, menuHeight, options) {
    var maxTextSize = GetMaxTextObjectSize(scene, options);

    var label = scene.rexUI.add.label({
        x: x, y: y,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),

        text: CreateTextObject(scene, '')
            .setFixedSize(maxTextSize.width, maxTextSize.height),

        // action:

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            icon: 10
        }
    })
        .setData('value', '');

    label.data.events.on('changedata-value', function (parent, value, previousValue) {
        label.text = value;
    })
    if (options[0]) {
        label.setData('value', options[0])
    }

    var menu;
    label.onClick(function () {
        if (menu) {
            return;
        }

        var menuX = label.getElement('text').getTopLeft().x,
            menuY = label.bottom;
        menu = CreatePopupList(scene, menuX, menuY, menuHeight, options, function (button) {
            label.setData('value', button.text);
            menu.scaleDownDestroy(100, 'y');
            menu = undefined;
        });

        // Close menu when clicking outside of menu
        menu.onClickOutside(function () {
            menu.scaleDownDestroy(100, 'y');
            menu = undefined;
        });
    })

    return label;
}

var CreatePopupList = function (scene, x, y, height, options, onClick) {
    var items = options.map(function (option) { return { label: option } });

    // Note: Buttons and scrolling are at different touch targets
    scene.input.topOnly = false;

    var background = scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_DARK);
    // Touch event won't pass through background    
    scene.rexUI.add.touchEventStop(background);

    var buttonSizer = scene.rexUI.add.buttons({
        orientation: 'y',

        buttons: items.map(function (item) {
            return CreateButton(scene, item);
        })
    })
        .on('button.over', function (button) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button) {
            button.getElement('background').setStrokeStyle();
        })
        .on('button.click', function (button) {
            onClick(button);
        })
        .layout()

    var menu = scene.rexUI.add.scrollablePanel({
        x: x,
        y: y,
        width: buttonSizer.width,
        height: Math.min(height, buttonSizer.height),
        scrollMode: 0,

        background: background,

        panel: {
            child: buttonSizer
        },

        slider: false,

        mouseWheelScroller: true,

        clamplChildOY: true,

    })
        .setOrigin(0)
        .layout()
        .popUp(100, 'y')

    return menu;
}

var CreateButton = function (scene, item) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_DARK),

        text: CreateTextObject(scene, item.label),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,
            icon: 10
        }
    })
}

var GetMaxTextObjectSize = function (scene, contentArray) {
    var textObject = CreateTextObject(scene, '');
    var width = 0, height = 0;
    for (var i = 0, cnt = contentArray.length; i < cnt; i++) {
        textObject.text = contentArray[i];
        width = Math.max(textObject.width, width);
        height = Math.max(textObject.height, height);
    }
    textObject.destroy();

    return { width: width, height: height };
}

var CreateTextObject = function (scene, text) {
    var textObject = scene.add.text(0, 0, text, {
        fontSize: '20px'
    })
    return textObject;
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