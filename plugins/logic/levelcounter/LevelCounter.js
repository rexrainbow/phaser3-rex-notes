import EventEmitter from '../../utils/eventemitter/EventEmitter.js';
import GetValue from '../../utils/object/GetValue.js';
import IsFunction from '../../utils/object/IsFunction.js';

class LevelCounter extends EventEmitter {
    constructor(config) {
        super();

        this.setTable(GetValue(config, 'table'));
        this.setExp(GetValue(config, 'exp', 0));
        this.requiredExp = this.getRequiredExpToNextLevel(this.level, this.exp);
    }

    setTable(table) {
        this.levelTable = table;
        this.isLevelMapFunction = IsFunction(table);
        return this;
    }

    setExp(exp) {
        this.exp = exp;
        this.level = this.getLevel(exp);

        return this;
    }

    getExp(level) {
        if (level === undefined) {
            return this.exp;
        }

        return (this.isLevelMapFunction) ? this.levelTable(level) : this.levelTable[level];
    }

    getLevel(exp, level) {
        if (exp === undefined) {
            return this.level;
        }

        if (level === undefined) {
            level = 0;
        }

        while (1) {
            var nextLevelExp = this.getExp(level + 1);
            if (nextLevelExp >= exp) {
                break;
            }

            level++;
        }

        return level;
    }

    getRequiredExpToNextLevel(level, exp) {
        return this.getExp(level + 1) - exp;
    }

    checkLevel(level, exp) {
        return (exp >= this.getExp(level)) && (exp < this.getExp(level + 1));
    }

    gainExp(incExp) {
        if (incExp === 0) {
            return this;
        }

        var prevExp = this.exp;
        var prevLevel = this.level;

        var exp = prevExp + incExp;
        var level = this.getLevel(exp, prevLevel);

        // Emit levelup event
        var fromExp = prevExp;
        while (1) {
            var levelExp0 = this.getExp(prevLevel);
            var levelExp1 = this.getExp(prevLevel + 1);
            var toExp = Math.min(levelExp1, exp)
            this.emit('levelup', prevLevel, fromExp, toExp, levelExp0, levelExp1);

            prevLevel++;
            if (toExp === exp) {
                break;
            }

            fromExp = levelExp1;
        }

        this.exp = exp;
        this.level = level;
        this.requiredExp = this.getRequiredExpToNextLevel(exp, level);

        return this;
    }

}

export default LevelCounter;