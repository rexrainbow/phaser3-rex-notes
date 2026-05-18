import Columns from '../gameobjects/columns/Columns';
import CreateTitleLabel from './utils/CreateTitleLabel';
import CreateBackground from './utils/CreateBackground';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CreateColumns = function(tweaker?: any, config?: any, style?: any) {
    if (!config) { config = {}; }
    if (!style) { style = {}; }

    var scene = tweaker.scene;

    // background
    var background = CreateBackground(scene, (config.background || {}), (style.background || {}));

    // title    
    var title = CreateTitleLabel(scene, undefined, style.title);

    // columns, each column has a tweaker panel
    var tweakerConfig = {
        root: tweaker.root,
        styles: tweaker.styles,
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

        var tweakerChild = tweaker.createTweaker(tweakerConfig);

        columnConfig.child = tweakerChild;
    }

    var columns = new Columns(scene, {
        title: title,
        columns: columnConfigArray,
        background: background,
        space: style.space,

        alignTitle: tweaker.root.alignTitle
    });
    scene.add.existing(columns);

    return columns;
}

export default CreateColumns;