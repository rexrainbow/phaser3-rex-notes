import CSVParser from 'papaparse/papaparse.min.js';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

var CSVToArray = function(csvString?: any, config?: any) {
    var delimiter = GetValue(config, 'delimiter', ',');
    var convert = GetValue(config, 'convert', true);

    var arr = CSVParser.parse(csvString, {
        delimiter: delimiter,
        dynamicTyping: convert
    }).data;
    return arr;
};

export default CSVToArray;