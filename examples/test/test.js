import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const fontStyles = {

    'button': {
        fontSize: '20px',
        fontStyle: '',
        fill: '#cccac6',
        underline: {
            thickness: 2,
        }
    },
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var txt = "See loooooonnnnnggg words"
        TextBlock(this, 10, 40, 200, 100, txt);
        TextBlock(this, 220, 40, 200, 100, txt, true);
        // TextBlock(this, 10, 160, 200, 280, txt);
        // TextBlock(this, 220, 160, 200, 280, txt, true);
        // this.add.text(10, 10, "With Phaser-Text");
        // this.add.text(220, 10, "With Rex-BBCodeText");

    }

}


var TextBlock = function (scene, x, y, width, height, text, useBB) {

    let style = fontStyles.button;
    style = {
        ...style,
        backgroundColor: '#555',
        wrap: {
            mode: 'word',
            width: width
        },
        stroke: 'red',
        strokeThickness: 1,
        wordWrap: {
            width: width,
            useAdvancedWrap: false
        }
    }

    // set position to fit top-left corner
    let txtObject = useBB ? scene.rexUI.add.BBCodeText(0, 0, null, style) :
        scene.add.text(0, 0, text, style);


    let config = {
        x: (x || 0) + width / 2,
        y: (y || 0) + height / 2,
        width: width,
        height: height,
        text: txtObject,
        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            input: 'click',
        },
        mouseWheelScroller: {
            focus: true,
            speed: 0.1
        },
    }
    let area = scene.rexUI.add.textArea(config)
        .layout()
    area
        .setText(text);;
    area.setChildVisible(area.getElement('slider'), area.isOverflow);
    return area;
}


var config = {
    type: Phaser.AUTO,
    parent: 'main',
    width: 800,
    height: 600,
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