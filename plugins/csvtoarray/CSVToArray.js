
'use strict'

import Converter from './../utils/array/CSVToArray.js';
import TypeConvert from './../utils/string/TypeConvert.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var CSVToArray = function(csvString, config) {
    var delimiter = GetValue(config, 'delimiter', ',');
    var convert = GetValue(config, 'convert', true);
    var convertScope = GetValue(config, 'convertScope', undefined);
    if (!convert) {
        convert = undefined;
        convertScope = undefined;
    } else if (convert === true) {
        convert = TypeConvert;
        convertScope = undefined;
    }

    return Converter(csvString, delimiter, convert, convertScope);
};

export default CSVToArray;