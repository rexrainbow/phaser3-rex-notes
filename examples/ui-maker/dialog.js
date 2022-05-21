import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const myLabelContent = `
type: label
width: 40
height: 40

background:
    type: roundrectangle
    color: 0x5e92f3
    radius: 20
text:
    type: text
    fontSize: 24

space:
    left: 10
    right: 10
    top: 10
    bottom: 10
`

const content = `
type: dialog
width: 500

background:
    type: roundrectangle
    color: 0x1565c0
    radius: 20
title:
    type: mylabel
    text: Title
toolbar:
    - type: mylabel
      text: O
    - type: mylabel
      text: X
leftToolbar:
    - type: mylabel
      text: A
    - type: mylabel
      text: B
content:
    type: mylabel
    text: Content
description:
    type: mylabel
    text: Description
choices:
    - type: mylabel
      text: Choice0
    - type: mylabel
      text: Choice1
    - type: mylabel
      text: Choice2     
actions:
    - type: mylabel
      text: Action0
    - type: mylabel
      text: Action1

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
        var CreateMyLabel = function (scene, data, view) {
            var gameObject = maker.make(myLabelContent);
            // Or creating game object by traditional way: 
            // var gameObject = scene.add.xxx()
            // var gameObject = scene.rexUI.add.xxx()

            gameObject.setText(maker.renderText(data.text));

            return gameObject;
        }
        maker.addCustomBuilder('mylabel', CreateMyLabel);

        var dialog = maker.make(content)
            .setPosition(400, 300)
            .layout();
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