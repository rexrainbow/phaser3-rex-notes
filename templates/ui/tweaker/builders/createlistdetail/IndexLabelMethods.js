import CreateTitleLabel from '../utils/CreateTitleLabel.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Format = Phaser.Utils.String.Format;

var GetIndexLabelStyle = function (style, altStyle) {
    var indexStyle = GetValue(style, 'index');

    if (!indexStyle && altStyle) {
        indexStyle = GetValue(altStyle, 'tweaker.inputRow.title') || {};
    }

    if (!indexStyle) {
        indexStyle = GetValue(style, 'tweaker.inputRow.title') || {};
    }

    return indexStyle;
}

var GetIndexLabelCallback = function (config) {
    var indexLabelCallback = GetValue(config, 'indexLabel', '%1');
    if (typeof (indexLabelCallback) === 'string') {
        var indexLabelTemplate = indexLabelCallback;
        indexLabelCallback = function (index, item, items) {
            // %1=index, %2=total
            return { 'title': Format(indexLabelTemplate, [index, items.length]) };
        }
    }

    return indexLabelCallback;
}

var CreateIndexLabel = function (scene, style) {
    return CreateTitleLabel(scene, undefined, style);
}

export {
    GetIndexLabelStyle,
    GetIndexLabelCallback,
    CreateIndexLabel,
}

