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
            'blinds', 'squares', 'diamonds', 'circles', 'curtain',
            'irisOut', 'irisIn', 'irisInOut', 'pieOut', 'pieIn', 'pieInOut',
            'wipeLeft', 'wipeRight', 'wipeUp', 'wipeDown',
            'pixellate', 'dissolve',
            'revealLeft', 'revealRight', 'revealUp', 'revealDown',
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

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var CreateDropDownList = function (scene, x, y, menuHeight, options) {
    var maxTextSize = GetMaxTextObjectSize(scene, options);

    var label = scene.rexUI.add.label({
        x: x, y: y,

        background: scene.rexUI.add.roundRectangle({ color: COLOR_MAIN }),

        text: CreateTextObject(scene, '')
            .setFixedSize(maxTextSize.width, maxTextSize.height),

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

    var list;
    label.onClick(function () {
        if (list) {
            return;
        }

        var listX = label.getElement('text').getTopLeft().x,
            listY = label.bottom;
        list = CreatePopupList(scene, listX, listY, menuHeight, options, function (button) {
            label.setData('value', button.text);
            list.scaleDownDestroy(100, 'y');
            list = undefined;
        })
            // Close list when clicking outside of list
            .onClickOutside(function () {
                list.scaleDownDestroy(100, 'y');
                list = undefined;
            }, undefined, { threshold: 10 });

        SelectItem(list, label.text);

        list.popUp(100, 'y')
    })

    return label;
}

var CreatePopupList = function (scene, x, y, height, options, onClick) {
    var items = options.map(function (option) { return { label: option } });

    var buttonSizer = scene.rexUI.add.sizer({
        orientation: 'y'
    });
    for (var i = 0, cnt = items.length; i < cnt; i++) {
        buttonSizer.add(
            CreateButton(scene, items[i]),
            { expand: true }
        )
    }
    buttonSizer.layout();

    var list = scene.rexUI.add.scrollablePanel({
        x: x,
        y: y,
        width: buttonSizer.width,
        height: Math.min(height, buttonSizer.height),
        scrollMode: 0,

        panel: {
            child: buttonSizer
        },

        slider: false,

        mouseWheelScroller: true,

        clampChildOY: true,

    })
        .setOrigin(0)
        .layout()

    list
        .setChildrenInteractive({
            targets: [buttonSizer]
        })
        .on('child.click', function (child) {
            onClick(child);
        })
        .on('child.over', function (child) {
            child.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('child.out', function (child) {
            child.getElement('background').setStrokeStyle();
        })

    return list;
}

var CreateButton = function (scene, item) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({ color: COLOR_DARK }),

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

var SelectItem = function (list, name) {
    var buttons = list.getElement('panel.items');
    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
        var button = buttons[i];
        if (button.text === name) {
            button.getElement('background').setFillStyle(COLOR_LIGHT);
            button.getElement('text').setColor('black');
            list.scrollToChild(button, 'top');
            return;
        }
    }
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