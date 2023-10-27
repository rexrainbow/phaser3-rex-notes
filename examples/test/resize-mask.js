import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
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
        var gridTable = this.rexUI.add.gridTable({
            anchor: {
                width: '100%', height: '100%',
                onResizeCallback: function (width, height, gameObject, anchor) {
                    gameObject.setMinSize(width, height).layout()

                    if (!gameObject.getElement('table')) {
                        return;
                    }
                    UpdateMask(gameObject);
                }
            },

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_MAIN),

            table: {
                cellHeight: 300,

                columns: 4,

                // rex, comment this mask and enableLayer
                mask: false,
                enableLayer: true,

                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,

                table: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;
                if (cellContainer === null) {
                    cellContainer = new Card(scene, item)
                }

                if (cell.width > 1) {
                    cell.height = cell.width;
                    cellContainer.setMinSize(cell.width - 2, cell.width - 2)
                }

                return cellContainer;
            },
            items: CreateItems(14)
        })
            .setOrigin(0)
            .layout()

        // 1. Create bitmap mask from a canvas
        var canvas = this.rexUI.add.canvas()
        gridTable.maskCanvas = canvas;
        var mask = canvas.createBitmapMask();
        // 2. Apply mask on tableBodyLayer
        // gridTable.getElement('table').getLayer().setMask(mask);

        UpdateMask(gridTable);
    }

    update() { }
}

var Card = function (scene, { id }) {
    var sizer = scene.rexUI.add.sizer();
    sizer
        .setName(`cell-${id}`)
        .addBackground(scene.rexUI.add.roundRectangle(0, 0, 1, 1, 0, 0x888888))
        .addSpace()
        .add(scene.add.text(0, 0, id.toString()))
        .addSpace()

    return sizer;
}

var CreateItems = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({ id: i });
    }
    return data;
}

var UpdateMask = function (gridTable) {
    var tableBody = gridTable.getElement('table');
    // var layer = tableBody.getLayer();
    // var canvas = layer.mask.bitmapMask;
    var canvas = gridTable.maskCanvas

    canvas
        .resize(tableBody.width, tableBody.height)
        .setPosition(tableBody.x, tableBody.y)
        .setOrigin(tableBody.originX, tableBody.originY)
        //.setVisible(false)
        .setAlpha(0.3)
        .clear()

        .updateTexture(function (canvasElem, context) {
            var gradient = context.createLinearGradient(0, 0, 0, tableBody.height);
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(0.2, 'red');
            gradient.addColorStop(0.8, 'red');
            gradient.addColorStop(1, 'transparent');
            context.fillStyle = gradient;
            context.fillRect(0, 0, tableBody.width, tableBody.height);
        });
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.Center.CENTER_BOTH,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
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