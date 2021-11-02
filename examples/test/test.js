import 'phaser';
import BoardPlugin from '../../plugins/board-plugin.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';


const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const fontStyles = {

    'button': {
        fontSize: '20px',
        fontStyle: '',
        fill: '#cccac6'
    },
}
const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        this.cellItemsClicked = 0;
        this.backgroundClicked = 0;

        this.background = this.rexBoard.add.board({
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 20,
            height: 20
        });

        this.background.forEachTileXY((tileXY, board) => {
            var chess = this.rexBoard.add.shape(this.background, tileXY.x, tileXY.y, 0, Random(0, 0xffffff), 0.7);
            this.add.text(chess.x, chess.y, tileXY.x + ',' + tileXY.y)
                .setOrigin(0.5)
                .setTint(0x0);
        }, this);

        this.background
            .setInteractive({ useTouchZone: true })
            .on('tiledown', (pointer, tileXY) => {
                console.log('down ' + tileXY.x + ',' + tileXY.y);
                this.backgroundClicked++;
            })

        let scrollMode = 0;
        this.table = this.rexUI.add.gridTable({
            x: 400,
            y: 350,
            width: 300,
            height: 420,
            scrollMode: scrollMode,
            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

            table: {
                cellHeight: 60,
                columns: 2,
                mask: {
                    padding: 2,
                },
                reuseCellContainer: false,
            },
            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },
            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;
                return new Button(scene, item);
            },

            items: this.Items()


        }).layout();
        this.table.on("cell.click", (cellContainer, cellIndex, pointer) => {
            this.cellItemsClicked++;
        }, this);

        this.add.text(this.game.config.width / 2, 20,
            "RexPlugins - GridTable and cell.click event bubbling"
            + "\nClick a table item will also click the background"
        )
            .setOrigin(0.5, 0);
        this.txtClicks = this.add.text(this.game.config.width / 2, 60,
            "0:0"
        )
            .setOrigin(0.5, 0);


    }

    update() {
        this.txtClicks.setText("Cell-Clicks: " + this.cellItemsClicked + " - Background-Clicks: " + this.backgroundClicked)
    }

    Items() {
        let items = [];
        for (let i = 1; i < 100; i++) {
            items.push("Item - " + i);
        }
        return items;
    }

}


class Button extends Phaser.GameObjects.Container {

    constructor(scene, txt) {
        super(scene);

        this.btnText = this.scene.add.text(20, 20, txt || "", fontStyles.button)
            .setOrigin(0)
            .setDepth(99);
        this.add(this.btnText);
        this.scene.add.existing(this);
    }

}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 50,
        y: 50,
        size: 50,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

var config = {
    type: Phaser.AUTO,
    parent: 'main',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        scene: [
            {
                key: 'rexBoard',
                plugin: BoardPlugin,
                mapping: 'rexBoard'
            },
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }
        ]
    }
};

var game = new Phaser.Game(config);