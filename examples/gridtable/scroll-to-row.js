import phaser from 'phaser/src/phaser.js';
import GridTablePlugin from '../../plugins/gridtable-plugin.js';
import ContainerLitePlugin from '../../plugins/containerlite-plugin.js';

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
        var onCellVisible = function (cell) {
            var scene = cell.scene;
            var cellIdx = cell.index;
            cell.height = (cellIdx % 2) ? 40 : 80;  // Set height of visible cell

            var color = (cellIdx % 2) ? COLOR_MAIN : COLOR_DARK;
            var bg = scene.add.rectangle(0, 0, cell.width, cell.height, color)
                .setStrokeStyle(2, COLOR_LIGHT)
                .setOrigin(0);
            var txt = scene.add.text(5, 5, cellIdx);
            var container = scene.add.rexContainerLite(0, 0, cell.width, cell.height)
                .setOrigin(0)
                .addLocal(bg)
                .addLocal(txt);

            cell.setContainer(container);
            // console.log('Cell ' + cell.index + ' visible');
        };
        var table = this.add.rexGridTable(400, 300, 250, 300, {
            cellHeight: 1,
            cellsCount: 30,
            columns: 1,
            cellVisibleCallback: onCellVisible.bind(this),
            clampTableOXY: false,

            mask: {
                padding: 2,
            }
        })
            .scrollToRow(25)

        var graphics = this.add.graphics().setDepth(1)

        // Draw bound
        table.drawBounds(graphics, 0xff0000);

        this.input.on('pointerdown', function () {
            graphics.clear();

            table
                .scrollToNextRow()
                .drawBounds(graphics, 0xff0000)
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
        global: [
            {
                key: 'rexContainerLite',
                plugin: ContainerLitePlugin,
                start: true
            },
            {
                key: 'rexGridTable',
                plugin: GridTablePlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);