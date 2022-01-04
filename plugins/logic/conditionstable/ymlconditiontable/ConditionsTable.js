import Base from '../conditiontable/ConditionsTable.js';
import yaml from 'js-yaml';
import Clear from '../../../utils/object/Clear.js';
import CreateTestFunction from './CreateTestFunction.js';

class ConditionsTable extends Base {
    loadYML(ymlString) {
        Clear(this.tests);

        var doc;
        try {
            doc = yaml.load(ymlString);
        } catch (e) {
            console.log(e);
            return this;
        }

        if (Array.isArray(doc)) {
            var docArray = doc;
            for (var i = 0, cnt = docArray.length; i < cnt; i++) {
                doc = docArray[i];
                for (var testName in doc) {
                    this.tests.push({
                        name: testName,
                        function: CreateTestFunction(doc[testName])
                    });
                }
            }
        } else {
            for (var testName in doc) {
                this.tests.push({
                    name: testName,
                    function: CreateTestFunction(doc[testName])
                });
            }
        }

        return this;
    }

}

export default ConditionsTable;