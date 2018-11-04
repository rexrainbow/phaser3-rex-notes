import GridTablePlugin from 'rexPlugins/gridtable-plugin.js';
import ScrollerPlugin from 'rexPlugins/scroller-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var newCellObject = function (cell) {
            var scene = cell.scene;
            var bg = scene.add.graphics()
                .fillStyle(0x555555)
                .fillRect(2, 2, 240 - 2, 100 - 2);
            var txt = scene.add.text(5, 5, cell.index);
            var container = scene.add.container(0, 0, [bg, txt]);
            return container;
        }

        var onCellVisible = function (cell) {
            cell.setContainer(newCellObject(cell));
            console.log('Cell ' + cell.index + ' visible');
        };
        var table = this.add.rexGridTable(400, 300, 250, 400, {
            cellWidth: 240,
            cellHeight: 100,
            cellsCount: 1000,
            columns: 1,
            cellVisibleCallback: onCellVisible.bind(this),
            clamplTableOXY: false
        });

        // draw bound
        this.add.graphics()
            .lineStyle(3, 0xff0000)
            .strokeRectShape(table.getBounds());

        // drag table content
        table.scroller = this.plugins.get('rexScroller').add(table, {
            bounds: [
                table.bottomTableOY,
                table.topTableOY
            ],
            value: table.topTableOY,

            valuechangeCallback: function (newValue) {
                console.log(newValue);
                table.setTableOY(newValue).updateTable();
            }
        })

        this.table = table;
        this.scrollerState = this.add.text(0, 0, '');
    }

    update() {
        this.scrollerState.setText(this.table.scroller.state + "\n" + this.table.tableOY);
    }
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
                key: 'rexScroller',
                plugin: ScrollerPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);