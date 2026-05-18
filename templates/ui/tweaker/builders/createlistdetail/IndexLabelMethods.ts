import CreateTitleLabel from '../utils/CreateTitleLabel';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const Format = PhaserUtils.String.Format;

var GetIndexLabelStyle = function(style?: any) {
    var indexStyle = GetValue(style, 'index');

    if (!indexStyle) {
        indexStyle = GetValue(style, 'tweaker.inputRow.title') || {};
    }

    return indexStyle;
}

var GetIndexLabelCallback = function(config?: any) {
    var indexLabelCallback = GetValue(config, 'indexLabel', '%1');
    if (typeof (indexLabelCallback) === 'string') {
        var indexLabelTemplate = indexLabelCallback;
        indexLabelCallback = function(index?: any, item?: any, items?: any) {
            // %1=index, %2=total
            return { 'title': Format(indexLabelTemplate, [index, items.length]) };
        }
    }

    return indexLabelCallback;
}

var CreateIndexLabel = function(scene?: any, style?: any) {
    return CreateTitleLabel(scene, undefined, style);
}

export {
    GetIndexLabelStyle,
    GetIndexLabelCallback,
    CreateIndexLabel,
}
