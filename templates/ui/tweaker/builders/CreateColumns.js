import Columns from '../gameobjects/columns/Columns.js';
import Title from '../gameobjects/label/Title.js';
import CreateBackground from './CreateBackground.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateColumns = function (parent, config, style) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = parent.scene;

    // title    
    var title = new Title(scene, (style.title || {}));
    scene.add.existing(title);

    // columns, each column has a tweaker panel
    var tweakerConfig = {
        root: style.root,
        styles: style.tweaker,
    }

    var columnConfigArray = GetValue(config, 'columns', 2);
    if (typeof (columnConfigArray) === 'number') {
        var columnCount = columnConfigArray;
        columnConfigArray = [];
        for (var i = 0, cnt = columnCount; i < cnt; i++) {
            columnConfigArray.push({})
        }
    }

    for (var i = 0, cnt = columnConfigArray.length; i < cnt; i++) {
        var columnConfig = columnConfigArray[i];

        tweakerConfig.width = GetValue(columnConfig, 'width', 0)

        var tweakerChild = parent.createTweaker(tweakerConfig);

        columnConfig.child = tweakerChild;
    }

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    var columns = new Columns(scene, {
        title: title,
        columns: columnConfigArray,
        background: background,
        space: style.space,

        alignTitle: style.root.alignTitle
    });
    scene.add.existing(columns);

    return columns;
}

export default CreateColumns;
