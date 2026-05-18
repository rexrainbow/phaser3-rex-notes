import Base from '../conditiontable/ConditionsTable';
import ParseYaml from '../../../utils/yaml/ParseYaml';
import CreateTestFunction from '../../../math/expressionparser/utils/Complile';

class ConditionsTable extends Base {
    add: any;
    clear: any;

    loadYML(ymlString?: any) {
        this.clear();

        var doc = ParseYaml(ymlString);
        if (!doc) {
            return this;
        }

        if (Array.isArray(doc)) {
            var docArray = doc;
            for (var i = 0, cnt = docArray.length; i < cnt; i++) {
                doc = docArray[i];
                for (var testName in doc) {
                    this.add(testName, CreateTestFunction(doc[testName]));
                }
            }
        } else {
            for (var testName in doc) {
                this.add(testName, CreateTestFunction(doc[testName]));
            }
        }

        return this;
    }

}

export default ConditionsTable;