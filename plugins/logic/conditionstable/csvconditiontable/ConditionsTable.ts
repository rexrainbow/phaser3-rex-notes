import Base from '../conditiontable/ConditionsTable';
import GetValue from '../../../utils/object/GetValue';
import CSVParser from 'papaparse/papaparse.min.js';
import CreateTestFunction from './CreateTestFunction';

class ConditionsTable extends Base {
    add: any;
    clear: any;

    loadCSV(csvString?: any, config?: any) {
        this.clear();

        var delimiter = GetValue(config, 'delimiter', ',');
        var table = CSVParser.parse(csvString, {
            delimiter: delimiter
        }).data;
        var keys = table[0];
        keys.shift();
        var items, testName;
        for (var i = 1, cnt = table.length; i < cnt; i++) {
            items = table[i];
            testName = items.shift();
            this.add(testName, CreateTestFunction(keys, items));
        }
        return this;
    }

}

export default ConditionsTable;