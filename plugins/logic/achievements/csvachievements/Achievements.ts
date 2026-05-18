import Base from '../achievements/Achievements';
import GetValue from '../../../utils/object/GetValue';
import CSVParser from 'papaparse/papaparse.min.js';
import CreateTestFunction from '../../conditionstable/csvconditiontable/CreateTestFunction';

class Achievements extends Base {
    add: any;
    clear: any;

    loadCSV(csvString?: any, config?: any) {
        this.clear();

        var delimiter = GetValue(config, 'delimiter', ',');
        var table = CSVParser.parse(csvString, {
            delimiter: delimiter
        }).data;

        var keys = table[0];
        keys.splice(0, 2);
        var levelName, achievementName, items;
        for (var i = 1, cnt = table.length; i < cnt; i++) {
            [levelName, achievementName, ...items] = table[i];
            this.add(levelName, achievementName, CreateTestFunction(keys, items));
        }

        return this;
    }
}
export default Achievements;