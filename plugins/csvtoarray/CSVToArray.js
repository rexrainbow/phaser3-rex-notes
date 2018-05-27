
'use strict'

import Converter from './../utils/array/CSVToArray.js';
import TypeConvert from './../utils/string/TypeConvert.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CSVToArray = function(csvString, config) {
    var delimiter = GetValue(config, 'delimiter', ',');
    var convert = GetValue(config, 'convertCallback', true);
    var convertCallback = GetValue(config, 'convertCallback', undefined);
    var convertCallbackScope = GetValue(config, 'convertCallbackScope', undefined);
    if (!convert) {
        convertCallback = undefined;
        convertCallbackScope = undefined;
    } else if (!convertCallback) { // convert === true
        convertCallback = TypeConvert;
        convertCallbackScope = undefined;
    }

    return Converter(csvString, delimiter, convertCallback, convertCallbackScope);
};

export default CSVToArray;