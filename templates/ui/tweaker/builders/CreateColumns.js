import Columns from '../gameobjects/columns/Columns.js';
import Title from '../gameobjects/label/Title.js';
import CreateTweaker from '../gameobjects/utils/CreateTweaker.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CreateColumns = function (scene, config, style) {
    // Create title
    var titleStyle = GetValue(style, 'title') || {};
    var title = new Title(scene, titleStyle);
    scene.add.existing(title);

    var tweakerConfig = {
        root: GetValue(style, 'root'),
        styles: GetValue(style, 'tweaker')
    }

    var backgroundStyle = GetValue(style, 'background');
    if (backgroundStyle && !Array.isArray(backgroundStyle)) {
        backgroundStyle = [backgroundStyle];
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

        if (backgroundStyle) {
            tweakerConfig.background = backgroundStyle[i % backgroundStyle.length];
        }

        tweakerConfig.width = GetValue(columnConfig, 'width', 0)

        var tweakerChild = CreateTweaker(scene, tweakerConfig);

        columnConfig.child = tweakerChild;
    }

    var columns = new Columns(scene, {
        header: title,
        columns: columnConfigArray,
        space: GetValue(style, 'space'),
    });
    scene.add.existing(columns);

    return columns;
}

export default CreateColumns;