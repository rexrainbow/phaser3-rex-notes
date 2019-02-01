import GridTablePlugin from '../../plugins/gridtable-plugin.js';
import ScrollerPlugin from '../../plugins/scroller-plugin.js';
import SliderPlugin from '../../plugins/slider-plugin.js';

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
        };
        var table = this.add.rexGridTable(400, 300, 250, 400, {
            cellWidth: 240,
            cellHeight: 100,
            cellsCount: 100,
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
        });


        // drag table content
        var topRight = table.getTopRight();
        var bottomRight = table.getBottomRight();
        var thumb = this.add.image(0, 0, 'dot').setScale(4, 4);
        thumb.slider = this.plugins.get('rexSlider').add(thumb, {
            endPoints: [{
                    x: topRight.x + 10,
                    y: topRight.y + 10
                },
                {
                    x: bottomRight.x + 10,
                    y: bottomRight.y - 10
                }
            ]
        });

        this.add.graphics()
            .lineStyle(3, 0x55ff55, 1)
            .strokePoints(thumb.slider.endPoints);

        // 'valuechange' event
        table.scroller.on('valuechange', function (newValue) {
            table.setTableOY(newValue).updateTable();
            // reflect to slider
            thumb.slider.setValue(table.getTableOYPercentage());
        });
        thumb.slider.on('valuechange', function (newValue) {
            table.setTableOYByPercentage(newValue).updateTable();
            // reflect to scroller
            table.scroller.setValue(table.tableOY);
        });

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
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
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