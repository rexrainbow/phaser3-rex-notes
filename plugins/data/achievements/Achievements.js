import CSVParser from 'rexPlugins/utils/papaparser/papaparse.js';
import Clear from 'rexPlugins/utils/object/Clear.js';
import Achievement from './Achievement.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Achievements {
    constructor(config) {
        this.achievements = {};
        this.obtainedStates = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        var rules = GetValue(o, 'rules', undefined);
        var delimiter = GetValue(o, 'delimiter', undefined);
        if (rules !== undefined) {
            this.loadRules(rules, delimiter);
        }
        this.setObtainedState(GetValue(o, 'obtained', {}));
        return this;
    }

    loadRules(rules, delimiter) {
        Clear(this.achievements);

        var table = CSVParser.parse(rules, {
            delimiter: delimiter
        }).data;
        var keys = table[0];
        keys.splice(0, 2);
        var items, achievement, levelName;
        for (var i = 1, cnt = table.length; i < cnt; i++) {
            items = table[i];
            levelName = items[0];
            achievement = new Achievement(keys, items);

            if (!this.achievements.hasOwnProperty(levelName)) {
                this.achievements[levelName] = [];
            }
            this.achievements[levelName].push(achievement);
        }
        return this;
    }

    getAchievements(levelName) {
        return this.achievements[levelName];
    }

    getAchievementNames(levelName, out) {
        if (out === undefined) {
            out = [];
        }
        var achievements = this.getAchievements(levelName);
        if (!achievements) {
            return out;
        }
        for (var i = 0, cnt = achievements.length; i < cnt; i++) {
            n = achievements[i].name;
            if (!names_map.hasOwnProperty(n)) {
                names.push(n);
                names_map[n] = true;
            }
        }
        return names;
    }

    getObtainedState(levelName, achievementName) {
        if (!this.obtainedStates.hasOwnProperty(levelName)) {
            this.obtainedStates[levelName] = {};
        }
        if (!this.obtainedStates[levelName].hasOwnProperty(achievementName)) {
            this.obtainedStates[levelName][achievementName] = {
                isObtained: false,
                pre: false,
                cur: false
            };
        }
        return this.obtainedStates[levelName][achievementName];
    }

    runTest(levelName, values) {
        var achievements = this.getAchievements(levelName);
        if (achievements === undefined) {
            return this;
        }

        var obtainedState;
        for (var i = 0, cnt = achievements.length; i < cnt; i++) {
            obtainedState = this.getObtainedState(levelName, achievements[i].name);
            obtainedState.pre = obtainedState.isObtained;
            obtainedState.cur = false;

            if (!achievements[i].runTest(values)) {
                continue;
            }

            obtainedState.cur = true;
            obtainedState.isObtained = true;
        }

        return this;
    }

    forEachObtainedState(levelName, callback, scope) {
        var achievements = this.getAchievements(levelName);
        if (achievements === undefined) {
            return this;
        }
        var achievementName, obtainedState;
        for (var i = 0, cnt = achievements.length; i < cnt; i++) {
            achievementName = achievements[i].name;
            obtainedState = this.getObtainedState(levelName, achievementName);
            if (scope) {
                callback.call(scope, levelName, achievementName, obtainedState);
            } else {
                callback(levelName, achievementName, obtainedState);
            }
        }

        return this;
    }

    setObtainedState(levelName, achievementName, value) {
        if (value === undefined) {
            value = true;
        }
        var obtainedState = this.getObtainedState(levelName, achievementName);
        obtainedState.isObtained = value;
        obtainedState.cur = value;
        return this;
    }

    loadObtainedStates(states) {
        this.obtainedStates = states; // TODO: 
        return this;
    }

    getObtainedStates() {
        return this.obtainedStates;
    }
}
export default Achievements;