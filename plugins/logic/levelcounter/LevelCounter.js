import EventEmitter from '../../utils/eventemitter/EventEmitter.js';
import GetValue from '../../utils/object/GetValue.js';
import IsFunction from '../../utils/object/IsFunction.js';

class LevelCounter extends EventEmitter {
    constructor(config) {
        super();

        this.setTable(GetValue(config, 'table'));

        var exp = GetValue(config, 'exp', 0);
        var level = GetValue(config, 'level', undefined);
        if ((level !== undefined) && !this.checkLevel(level, exp)) {
            console.error(`Level ${level} and Exp ${exp} are mismatch`);
            level = undefined;
        }
        this.resetExp(exp, level);
    }

    get exp() {
        return this._exp;
    }

    set exp(value) {
        if (value >= this._exp) {
            this.gainExp(value - this._exp);
        } else {
            this.resetExp(value);
        }
    }

    get level() {
        return this._level;
    }

    set level(value) {
        this.exp = this.getExp(value);
    }

    get requiredExp() {
        return this._requiredExp;
    }

    // Configuration
    setTable(table) {
        this.levelTable = table;
        this.isLevelMapFunction = IsFunction(table);
        return this;
    }

    resetExp(exp, level) {
        if (level === undefined) {
            level = this.getLevel(exp);
        }
        this._exp = exp;
        this._level = level;
        this._requiredExp = this.getRequiredExpToNextLevel(level, exp);
        // Won't fire `levelup` event
        return this;
    }

    // Expression
    getExp(level) {
        if (level === undefined) {
            return this._exp;
        }

        return (this.isLevelMapFunction) ? this.levelTable(level) : this.levelTable[level];
    }

    getLevel(exp, level) {
        if (exp === undefined) {
            return this._level;
        }

        if (level === undefined) {
            level = 0;
        }

        while (1) {
            var nextLevelExp = this.getExp(level + 1);
            if (nextLevelExp > exp) {
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

    // Action
    gainExp(incExp) {
        if (incExp === 0) {
            return this;
        }

        var prevExp = this._exp;
        var prevLevel = this._level;

        var exp = prevExp + incExp;
        var level = this.getLevel(exp, prevLevel);

        // Emit levelup event
        var fromExp = prevExp,
            toExp,
            levelStartExp,
            levelEndExp;
        while (1) {
            levelStartExp = this.getExp(prevLevel);
            levelEndExp = this.getExp(prevLevel + 1);
            toExp = Math.min(levelEndExp, exp);
            this.emit('levelup', prevLevel, fromExp, toExp, levelStartExp, levelEndExp);

            if ((prevLevel === level) && (toExp === exp)) {
                break;
            }

            prevLevel++;
            fromExp = levelEndExp;
        }

        this.resetExp(exp, level);

        return this;
    }

    setExp(exp) {
        this.exp = exp;
        return this;
    }

    setLevel(level) {
        this.level = level;
        return this;
    }
}

export default LevelCounter;