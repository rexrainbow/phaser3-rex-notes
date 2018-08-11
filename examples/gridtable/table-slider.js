'use strict'
import GridTablePlugin from 'rexPlugins/gridtable-plugin.js';
import SliderPlugin from 'rexPlugins/slider-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('dot', 'assets/images/white-dot.png');
    }

    create() {
        var newCellObject = function (scene, cell) {
            var bg = scene.add.graphics()
                .fillStyle(0x555555)
                .fillRect(2, 2, 58, 58);
            var txt = scene.add.text(5, 5, cell.index);
            var container = scene.add.container(0, 0, [bg, txt]);
            return container;
        }

        var onCellVisible = function (cell) {
            cell.setContainer(newCellObject(this, cell));
            //console.log('Cell ' + cell.index + ' visible');
        };
        var table = this.add.rexGridTable(400, 300, 250, 400, {
            cellHeight: 60,
            cellWidth: 60,
            cellsCount: 100,
            columns: 4,
            cellVisibleCallback: onCellVisible.bind(this),
        });

        // draw bound
        this.add.graphics()
            .lineStyle(3, 0xff0000)
            .strokeRectShape(table.getBounds());

        // drag table content
        var topRight = table.getTopRight();
        var bottomRight = table.getBottomRight();
        this.thumb = this.add.image(0, 0, 'dot').setScale(4, 4);
        this.thumb.slider = this.plugins.get('rexSlider').add(this.thumb, {
            endPoints: [{
                    x: topRight.x,
                    y: topRight.y
                },
                {
                    x: bottomRight.x,
                    y: bottomRight.y
                }
            ]
        });
        this.thumb.slider.on('valuechange', function (newValue) {
            table.setTableOYByPercentage(newValue).updateTable();
        });
        this.add.graphics()
            .lineStyle(3, 0x55ff55, 1)
            .strokePoints(this.thumb.slider.endPoints);
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
                key: 'rexGridTable',
                plugin: GridTablePlugin,
                start: true
            },
            {
                key: 'rexSlider',
                plugin: SliderPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);