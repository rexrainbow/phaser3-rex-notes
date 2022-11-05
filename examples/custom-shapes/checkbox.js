import phaser from 'phaser/src/phaser.js';
import CustomShapesPlugin from '../../plugins/customshapes-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var checkbox = CreateCheckboxShape(this)
            .setColor(0x005cb2)
            .setSize(30, 30)
            .setPosition(400, 300)

        checkbox
            .setInteractive()
            .on('pointerdown', function () {
                checkbox.setChecked(!checkbox.checked);
            })

    }

    update() { }
}

var CreateCheckboxShape = function (scene) {
    var shape = scene.add.rexCustomShapes({
        type: 'Checkbox',
        create: [
            { name: 'box', type: 'rectangle' },
            { name: 'check', type: 'lines' },
        ],
        update: function () {
            var centerX = this.width / 2,
                centerY = this.height / 2,
                radius = Math.min(centerX, centerY);
            var width = radius * 2,
                height = width;
            var x = centerX - radius,
                y = centerY - radius,
                step = width / 4;
            var boxLineWidth = 4;
            var checkLineWidth = Math.max(width / 10, 2);

            if (this.isSizeChanged) {
                var halfBoxLineWidth = boxLineWidth / 2;
                this.getShape('box')
                    .setTopLeftPosition(x + halfBoxLineWidth, y + halfBoxLineWidth)
                    .setSize(width - boxLineWidth, height - boxLineWidth)

                this.getShape('check')
                    .startAt(x + step * 1, y + step * 2)
                    .lineTo(x + step * 2, y + step * 3)
                    .lineTo(x + step * 3, y + step * 1)
                    .end()
            }

            if (this.checked) {
                this.getShape('box').fillStyle(this.fillColor).lineStyle(boxLineWidth, this.fillColor)
                this.getShape('check').lineStyle(checkLineWidth, 0xffffff)
            } else {
                this.getShape('box').fillStyle().lineStyle(boxLineWidth, this.fillColor)
                this.getShape('check').lineStyle()
            }
        }
    })

    shape.setColor = function (color) {
        shape.setFillStyle(color);
        return shape;
    }

    shape.setChecked = function (checked) {
        if (checked === undefined) {
            checked = true;
        }
        if (shape.checked === checked) {
            return shape;
        }
        shape.checked = checked;
        shape.setDirty();
        return shape;
    }

    shape.setChecked(false);

    return shape;
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
            key: 'CustomShapesPlugin',
            plugin: CustomShapesPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);