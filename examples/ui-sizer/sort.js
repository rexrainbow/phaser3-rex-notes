import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import Background from '../../plugins/gameobjects/dynamictext/dynamictext/bob/background/Background.js';

const COLOR_MAIN = 0x4e342e;
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
        var config = {
            space: { left: 10, right: 10, top: 10, bottom: 10 },
            background: { color: COLOR_DARK, strokeColor: COLOR_LIGHT, },
            icon: null,
            text: {
                fontSize: 20,
            },
            action: null,
        }

        var dataList = [
            { name: 'A', text: 'AAA', score: 90 },
            { name: 'B', text: 'BBB', score: 50 },
            { name: 'C', text: 'CCC', score: 80 },
            { name: 'D', text: 'DDD', score: 100 },
        ]

        var panel = this.rexUI.add.sizer({
            x: 400, y: 300,
            orientation: 'y',
        })
        for (var i = 0, cnt = dataList.length; i < cnt; i++) {
            var data = dataList[i];
            var gameObject = this.rexUI.add.simpleLabel(config)
                .resetDisplayContent(data.text)
                .setName(data.name)
                .setData('score', data.score)

            panel.add(gameObject);
        }
        panel.layout();

        panel.sortChildrenByData('score', true);

        // Animation
        var children = panel.getElement('items');
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            child.setData('prevY', child.y);
        }
        panel.layout();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            var targetY = child.y;
            var prevY = child.getData('prevY')
            var targetX = (prevY < targetY) ? 10 : -10;
            child.setY(prevY);
            this.tweens.add({
                targets: child,
                props: {
                    y: { value: targetY, duration: 1000, },
                    x: { value: `+=${targetX}`, yoyo: true, duration: 500 }
                }
            })

        }
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