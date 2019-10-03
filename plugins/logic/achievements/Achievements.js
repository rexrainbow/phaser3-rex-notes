import GetValue from '../../utils/object/GetValue.js';
import CSVParser from 'papaparse/papaparse.min.js';
import Clear from '../../utils/object/Clear.js';
import Achievement from './Achievement.js';


class Achievements {
    constructor(config) {
        this.achievements = {};
        this.obtainedStates = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setObtainedState(GetValue(o, 'obtained', {}));
        return this;
    }

    loadCSV(csvString, config) {
        Clear(this.achievements);
        var delimiter = GetValue(config, 'delimiter', ',');
        var table = CSVParser.parse(csvString, {
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
            out.push(achievements[i].name);
        }
        return names;
    }

    getObtainedState(levelName, achievementName) {
        if (!this.obtainedStates.hasOwnProperty(levelName)) {
            this.obtainedStates[levelName] = {};
        }
        if (!this.obtainedStates[levelName].hasOwnProperty(achievementName)) {
            this.obtainedStates[levelName][achievementName] = {
                wasObtained: false,
                justObtained: false
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
            obtainedState.justObtained = false;
            if (obtainedState.wasObtained) {
                continue;
            }

            if (!achievements[i].runTest(values)) {
                continue;
            }

            obtainedState.justObtained = true;
            obtainedState.wasObtained = true;
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
        if (obtainedState.wasObtained !== value) {
            obtainedState.justObtained = value;
            obtainedState.wasObtained = value;
        }
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