import CSVParser from 'papaparse/papaparse.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var ParseCSV = function (csvString, config) {
    var delimiter = GetValue(config, 'delimiter', ',');
    var arr = CSVParser.parse(csvString, {
        delimiter: delimiter,
    }).data;

    var questType = GetValue(config, 'types.quest', 'q');
    var optionType = GetValue(config, 'types.option', 'o');
    var hasHeader = GetValue(config, 'header', true);

    var items = [];
    var row, rowType, rowObj,
        item, option;
    var startIdx = (hasHeader) ? 1 : 0;
    for (var i = startIdx, cnt = arr.length; i < cnt; i++) {
        row = arr[i];
        rowType = row[0];
        rowObj = {
            name: row[1],
            title: row[2],
            description: row[3],
        }

        if (rowType === questType) {
            item = rowObj;
            item.options = [];
            items.push(item);
        } else if (rowType === optionType) {
            if (item) {
                option = rowObj;
                item.options.push(option);
            }
        }
    }

    return items;
};

export default ParseCSV;