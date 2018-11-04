import GridTablePlugin from 'rexPlugins/gridtable-plugin.js';
import TouchStatePlugin from 'rexPlugins/touchstate-plugin.js';
import ObjectPoolPlugin from 'rexPlugins/objectpool-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var cellObjectsPool = this.plugins.get('rexObjectPool').add();

        var newCellObject = function (cell) {
            var scene = cell.scene;
            var container = cellObjectsPool.pop();
            if (container === null) {
                console.log(cell.index + ': create new gameboject')
                var bg = scene.add.graphics()
                    .fillStyle(0x555555)
                    .fillRect(2, 2, 58, 58)
                    .setName('background');
                var txt = scene.add.text(5, 5, cell.index)
                    .setName('index');
                container = scene.add.container(0, 0, [bg, txt]);
            } else {
                console.log(cell.index + ': pop from pool');
                container.visible = true;
                container.getByName('index').setText(cell.index);
            }

            return container;
        }

        var onCellVisible = function (cell) {
            cell.setContainer(newCellObject(cell));
            //console.log('Cell ' + cell.index + ' visible');
        };
        var onCellInvisible = function (cell) {
            var container = cell.popContainer();
            container.setPosition(-100, -100);
            container.visible = false;
            cellObjectsPool.push(container);
            console.log(cell.index + ': push to pool')
        }
        var table = this.add.rexGridTable(400, 300, 250, 400, {
            cellHeight: 60,
            cellWidth: 60,
            cellsCount: 100,
            columns: 4,
            cellVisibleCallback: onCellVisible.bind(this),
            cellInvisibleCallback: onCellInvisible.bind(this)
        });

        // draw bound
        this.add.graphics()
            .lineStyle(3, 0xff0000)
            .strokeRectShape(table.getBounds());

        // drag table content
        table.touchState = this.plugins.get('rexTouchState').add(table)
            .on('touchmove', function (pointer) {
                table.addTableOXY(this.dx, this.dy).updateTable();
            });

        this.add.text(10, 10, 'Destroy')
            .setInteractive()
            .on('pointerdown', function () {
                table.destroy();
            });
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
                key: 'rexTouchState',
                plugin: TouchStatePlugin,
                start: true
            },
            {
                key: 'rexObjectPool',
                plugin: ObjectPoolPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);