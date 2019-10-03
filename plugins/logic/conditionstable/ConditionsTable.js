import GetValue from '../../utils/object/GetValue.js';
import CSVParser from 'papaparse/papaparse.min.js';
import Clear from '../../utils/object/Clear.js';
import CreateTestFunction from './CreateTestFunction.js';


class ConditionsTable {
    constructor(config) {
        this.tests = [];
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        var table = GetValue(o, 'table', undefined);
        var delimiter = GetValue(o, 'delimiter', ',');
        if (table !== undefined) {
            this.loadTable(table, delimiter);
        }
        return this;
    }

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
            this.tests.push({
                name: testName,
                function: CreateTestFunction(keys, items)
            });
        }
        return this;
    }

    anyPassTest(values, callback, scope) {
        var name, f;
        for (var i = 0, cnt = this.tests.length; i < cnt; i++) {
            name = this.tests[i].name;
            f = this.tests[i].function;
            if (!f(values)) {
                name = false;
                continue;
            }

            if (callback) {
                if (scope) {
                    callback.call(scope, name);
                } else {
                    callback(name);
                }
            }
            break;
        }

        return (callback) ? this : name;
    }

    eachPassTest(values, callback, scope) {
        var name, f;
        for (var i = 0, cnt = this.tests.length; i < cnt; i++) {
            name = this.tests[i].name;
            f = this.tests[i].function;
            if (!f(values)) {
                continue;
            }

            if (scope) {
                callback.call(scope, name);
            } else {
                callback(name);
            }
        }
        return this;
    }

    eachTest(values, callback, scope) {
        var pass, name, f;
        for (var i = 0, cnt = this.tests.length; i < cnt; i++) {
            name = this.tests[i].name;
            f = this.tests[i].function;
            pass = f(values);
            if (scope) {
                callback.call(scope, name, pass);
            } else {
                callback(name, pass);
            }
        }
        return this;
    }
}

export default ConditionsTable;