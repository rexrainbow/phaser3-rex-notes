import phaser from 'phaser/src/phaser.js';
import CarouselPlugin from '../../plugins/carousel-plugin.js';

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
        var table = this.add.rexCarousel(400, 300, 400, 100, {
            scrollMode: 1,
            // cellHeight: 100,
            cellWidth: 100,
            cellsCount: 20,
            cellVisibleCallback: function (cell) {
                var scene = cell.scene;
                var bg = scene.add.rectangle(0, 0, cell.width, cell.height, COLOR_MAIN)
                    .setStrokeStyle(2, COLOR_LIGHT)
                    .setOrigin(0);
                var txt = scene.add.text(5, 5, cell.index);
                var container = scene.add.container(0, 0, [bg, txt]);

                cell.setContainer(container);
                //console.log('Cell ' + cell.index + ' visible');
            },
            reuseCellContainer: true,
            mask: {
                padding: 2,
            },
            enableLayer: true,
        });

        // draw bound
        this.add.graphics()
            .lineStyle(2, 0xff0000)
            .strokeRectShape(table.getBounds())
            .setDepth(1);

        // drag table content
        table
            .setInteractive()
            .on('pointermove', function (pointer) {
                if (!pointer.isDown) {
                    return;
                }
                var dx = pointer.x - pointer.prevPosition.x;
                table.addTableOY(dx).updateTable();
            });

        this.add.text(0, 580, 'Destroy table')
            .setInteractive()
            .on('pointerdown', function () {
                table.destroy();
            })
    }

    update() {
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
        global: [{
            key: 'rexCarousel',
            plugin: CarouselPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);