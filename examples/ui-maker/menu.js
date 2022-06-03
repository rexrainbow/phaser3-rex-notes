import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const content = `
.mylabel:
    $type: Label
    background: 
        $type: RoundRectangle
        color: 0x4e342e
    text:
        $type: Text
        fontSize: 20
    icon:
        $type: RoundRectangle
        color: 0x260e04
        radius: 10
    space: { left: 10,  right: 10, top: 10, bottom: 10, 
        icon: 10}

# Game object
$root:
    $type: Menu
    
    items:
        - $class: mylabel
          text: {text: AA}
          $next:
              - $class: mylabel
                text: {text: AA-0}
                $next:
                    - $class: mylabel
                      text: {text: AA-00}
                    - $class: mylabel
                      text: {text: AA-01}
                    - $class: mylabel
                      text: {text: AA-02}
              - $class: mylabel
                text: {text: AA-1}
                $next:
                    - $class: mylabel
                      text: {text: AA-10}
                    - $class: mylabel
                      text: {text: AA-11}
                    - $class: mylabel
                      text: {text: AA-12}
        - $class: mylabel
          text: {text: BB}
          $next:
              - $class: mylabel
                text: {text: BB-0}
              - $class: mylabel
                text: {text: BB-1}
              - $class: mylabel
                text: {text: BB-2}
        - $class: mylabel
          text: {text: CC}
          $next:
              - $class: mylabel
                text: {text: CC-0}
              - $class: mylabel
                text: {text: CC-1}
              - $class: mylabel
                text: {text: CC-2}
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {

        var scene = this,
            menu = undefined;
        this.print = this.add.text(0, 0, '');
        this.input.on('pointerdown', function (pointer) {
            if (menu === undefined) {
                menu = CreateMenu(scene, pointer.x, pointer.y, function (button) {
                    scene.print.text += 'Click ' + button.text + '\n';
                });
            } else if (!menu.isInTouching(pointer)) {
                menu.collapse();
                menu = undefined;
                scene.print.text = '';
            }
        }, this);
    }

    update() { }
}

var CreateMenu = function (scene, x, y, onClick) {
    var menu = scene.rexUI.maker.make(content)
        .setPosition(x, y)

    menu
        .on('button.over', function (button) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button) {
            button.getElement('background').setStrokeStyle();
        })
        .on('button.click', function (button) {
            onClick(button);
        })
        .on('popup.complete', function (subMenu) {
            console.log('popup.complete')
        })
        .on('scaledown.complete', function () {
            console.log('scaledown.complete')
        })

    return menu;
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