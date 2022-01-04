import Base from '../achievements/Achievements.js';
import yaml from 'js-yaml';
import CreateTestFunction from '../../conditionstable/ymlconditiontable/CreateTestFunction.js';

class Achievements extends Base {
    loadYML(ymlString) {
        this.clear();

        var doc;
        try {
            doc = yaml.load(ymlString);
        } catch (e) {
            console.log(e);
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