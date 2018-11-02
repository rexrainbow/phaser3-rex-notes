import Sizer from '../sizer/Sizer.js';
import GridTableBase from 'rexPlugins/gameobjects/gridtable/GridTable.js';
import Slider from 'rexPlugins/input/slider/Slider.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class GridTable extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = defaultConfig;
        }
        // Create sizer
        var x = GetValue(config, 'x', 0);
        var y = GetValue(config, 'y', 0);
        var minWidth = GetValue(config, 'width', 0);
        var minHeight = GetValue(config, 'height', 0);
        config.orientation = 0; // Left-to-right
        super(scene, x, y, minWidth, minHeight, config);
        scene.add.existing(this);
        this.type = 'rexGridTable';

        // Add elements
        var table = new GridTableBase(scene, 0, 0, minWidth, minHeight, config);
        var track = GetValue(config, 'slider.track', undefined);
        var thumb = GetValue(config, 'slider.thumb', undefined);

        this.add(table, 0, 'center', undefined, true);

        if (track) {
            this.add(track, 0, 'center', undefined, true);
        }
        if (track && thumb) {
            var topRight = track.getTopRight();
            var bottomRight = track.getBottomRight();
            thumb.slider = new Slider(thumb, {
                endPoints: [{
                        x: topRight.x,
                        y: topRight.y + 10
                    },
                    {
                        x: bottomRight.x,
                        y: bottomRight.y - 10
                    }
                ]
            });
        }

        this.childrenMap = {};
        this.childrenMap.table = table;
        this.childrenMap.track = track;
        this.childrenMap.thumb = thumb;
    }

    setItems(items) {
        this.items = items;
        this.childrenMap.table.setCellsCount(items.length).setTableOY(0).updateTable(true);
        return this;
    }
}

const defaultConfig = {};

export default GridTable;