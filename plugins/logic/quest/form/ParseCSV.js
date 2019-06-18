import GetValue from '../../../utils/object/GetValue.js';
import CSVParser from 'papaparse/papaparse.js';

var ParseCSV = function (csvString, config) {
    var delimiter = GetValue(config, 'delimiter', ',');
    var arr = CSVParser.parse(csvString, {
        header: true,
        delimiter: delimiter,
    }).data;

    var questType = GetValue(config, 'types.quest', 'q');
    var optionType = GetValue(config, 'types.option', '');

    var items = [];
    var rowObj, rowType,
        item, option;
    for (var i = 0, cnt = arr.length; i < cnt; i++) {
        rowObj = arr[i];
        rowType = rowObj.type;
        delete rowObj.type;

        if (rowType === questType) {
            item = rowObj;
            if (item.key === '') {
                delete item.key;
            }

            item.options = [];
            items.push(item);
        } else if (rowType === optionType) {
            if (item) {
                option = rowObj;
                if (option.key === '') {
                    delete option.key;
                }
                item.options.push(rowObj);
            } else {
                // Error
            }
        }
    }

    return items;
};

export default ParseCSV;