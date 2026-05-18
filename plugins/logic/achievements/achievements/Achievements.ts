import Clear from '../../../utils/object/Clear';

class Achievements {
    achievements: any;
    obtainedStates: any;

    constructor() {
        this.achievements = {};
        this.obtainedStates = {};
    }

    clear() {
        Clear(this.achievements);
        Clear(this.obtainedStates);

        return this;
    }

    add(levelName?: any, achievementName?: any, callback?: any) {
        if (!this.achievements.hasOwnProperty(levelName)) {
            this.achievements[levelName] = [];
        }

        this.achievements[levelName].push({
            name: achievementName,
            function: callback
        });

        return this;
    }

    getAchievements(levelName?: any) {
        return this.achievements[levelName];
    }

    getObtainedState(levelName?: any, achievementName?: any) {
        if (levelName === undefined) {
            return this.obtainedStates;
        }

        if (!this.obtainedStates.hasOwnProperty(levelName)) {
            this.obtainedStates[levelName] = {};
        }
        var obtainedStates = this.obtainedStates[levelName];

        if (achievementName === undefined) {
            return obtainedStates;
        }

        if (!obtainedStates.hasOwnProperty(achievementName)) {
            obtainedStates[achievementName] = {
                wasObtained: false,
                justObtained: false
            };
        }
        return obtainedStates[achievementName];
    }

    runTest(levelName?: any, context?: any) {
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

            if (!achievements[i].function(context?: any)) {
                continue;
            }

            obtainedState.justObtained = true;
            obtainedState.wasObtained = true;
        }

        return this;
    }

    getTestResults(levelName?: any, context?: any) {
        this.runTest(levelName, context);
        return this.getObtainedState(levelName);
    }

    forEachObtainedState(levelName?: any, callback?: any, scope?: any) {
        var achievements = this.getAchievements(levelName);
        if (achievements === undefined) {
            return this;
        }
        var achievementName, obtainedState;
        for (var i = 0, cnt = achievements.length; i < cnt; i++) {
            achievementName = achievements[i].name;
            obtainedState = this.getObtainedState(levelName, achievementName);
            if (scope?: any) {
                callback.call(scope, levelName, achievementName, obtainedState);
            } else {
                callback(levelName, achievementName, obtainedState);
            }
        }

        return this;
    }

    getLevelNames(out?: any) {
        if (out === undefined) {
            out = [];
        }
        for (var levelName in this.achievements) {
            out.push(levelName);
        }
        return out;
    }

    getAchievementNames(levelName?: any, out?: any) {
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
        return out;
    }

    loadObtainedStates(states?: any) {
        this.obtainedStates = states;
        return this;
    }

    getObtainedStates() {
        return this.obtainedStates;
    }

    setObtainedState(levelName?: any, achievementName?: any, value?: any) {
        if (value === undefined) {
            value = true;
        }
        var obtainedState = this.getObtainedState(levelName, achievementName);
        obtainedState.wasObtained = value;
        obtainedState.justObtained = value;
        return this;
    }

    clearObtainedState(levelName?: any, achievementName?: any) {
        this.setObtainedState(levelName, achievementName, false);
        return this;
    }
}
export default Achievements;