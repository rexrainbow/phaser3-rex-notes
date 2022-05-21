import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const labelStyle = `
width: 40
height: 40

background:
    type: RoundRectangle
    color: 0x5e92f3
    radius: 20
text:
    type: Text
    text: ''       # Override this property
    fontSize: 24

space:
    left: 10
    right: 10
    top: 10
    bottom: 10
`

const content = `
type: Dialog
width: 500

background:
    type: RoundRectangle
    color: 0x1565c0
    radius: 20
title:
    type: Label
    class: mylabel
    text: {text: Title}
toolbar:
    - type: Label
      class: mylabel
      text: {text: O}
    - type: Label
      class: mylabel
      text: {text: X}
leftToolbar:
    - type: Label
      class: mylabel
      text: {text: A}
    - type: Label
      class: mylabel
      text: {text: B}
content:
    type: Label
    class: mylabel
    text: {text: Content}
description:
    type: Label
    class: mylabel    
    text: {text: Description}
choices:
    - type: Label
      class: mylabel      
      text: {text: Choice0}
    - type: Label
      class: mylabel
      text: {text: Choice1}
    - type: Label
      class: mylabel
      text: {text: Choice2}
actions:
    - type: Label
      class: mylabel
      text: {text: Action0}
    - type: Label
      class: mylabel
      text: {text: Action1}

space:
    left: 20
    right: 20
    top: -20
    bottom: -20
    title: 25
    # titleLeft: 30
    content: 25
    description: 25
    # descriptionLeft: 20
    # descriptionRight: 20
    choices: 25

    leftToolbarItem: 5
    toolbarItem: 5
    choice: 15
    action: 15

expand:
    title: false
    # content: false
    # description: false
    # choices: false
    # actions: true

align:
    title: center
    # content: right
    # description: left
    # choices: left
    actions: right        # center|left|right

click:
    mode: release
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var maker = this.rexUI.add.maker();
        maker.addStyle('.mylabel', labelStyle)

        var dialog = maker.make(content)
            .setPosition(400, 300)
            .layout()
            .setDraggable('title')

        var print = this.add.text(0, 0, '');
        dialog
            .on('button.click', function (button, groupName, index, pointer, event) {
                print.text += groupName + '-' + index + ': ' + button.text + '\n';
            })
            .on('button.over', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle(1, 0xffffff);
            })
            .on('button.out', function (button, groupName, index, pointer, event) {
                button.getElement('background').setStrokeStyle();
            });
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
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }

};

var game = new Phaser.Game(config);