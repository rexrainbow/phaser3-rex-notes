import Base from '../conditiontable/ConditionsTable.js';
import GetValue from '../../../utils/object/GetValue.js';
import CSVParser from 'papaparse/papaparse.min.js';
import Clear from '../../../utils/object/Clear.js';
import CreateTestFunction from './CreateTestFunction.js';

class ConditionsTable extends Base {
    loadCSV(csvString, config) {
        Clear(this.tests);
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
            testFunction = CreateTestFunction(keys, items)
            this.tests.push({
                name: testName,
                function: testFunction
            });
        }
        return this;
    }

}

export default ConditionsTable;