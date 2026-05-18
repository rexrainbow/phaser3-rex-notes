import Base from '../achievements/Achievements';
import ParseYaml from '../../../utils/yaml/ParseYaml';
import CreateTestFunction from '../../../math/expressionparser/utils/Complile';

class Achievements extends Base {
    add: any;
    clear: any;

    loadYML(ymlString?: any) {
        this.clear();

        var doc = ParseYaml(ymlString);
        if (!doc) {
            return this;
        }

        for (var levelName in doc) {
            var levelAchevements = doc[levelName];
            for (var achievementName in levelAchevements) {
                this.add(levelName, achievementName, CreateTestFunction(levelAchevements[achievementName]));
            }
        }

        return this;
    }
}
export default Achievements;