import EventEmitter from '../../utils/eventemitter/EventEmitter.js';
import GetValue from '../../utils/object/GetValue.js';
import IsFunction from '../../utils/object/IsFunction.js';

class LevelCounter extends EventEmitter {
    constructor(config) {
        super();

        this.setTable(GetValue(config, 'table'));
        this.setMaxLevel(GetValue(config, 'maxLevel'));

        var exp = GetValue(config, 'exp', 0);
        var level = GetValue(config, 'level', undefined);
        if ((level !== undefined) && !this.checkLevel(level, exp)) {
            console.error(`Level ${level} and Exp ${exp} are mismatch`);
            level = undefined;
        }
        this.resetExp(exp, level);
    }

    // Configuration
    setTable(table) {
        this.levelTable = table;
        this.isLevelMapFunction = IsFunction(table);
        return this;
    }

    setMaxLevel(maxLevel) {
        if (maxLevel === undefined) {
            if (Array.isArray(this.levelTable)) {
                maxLevel = this.levelTable.length - 1;
            } else {
                maxLevel = -1;
            }
        }

        var maxExp;
        if (maxLevel !== -1) {
            maxExp = this.getExp(maxLevel);
        } else {
            maxExp = -1;
        }

        this.hasMaxLevel = (maxLevel !== -1);
        this.maxLevel = maxLevel;
        this.maxExp = maxExp;
        return this;
    }

    resetExp(exp, level) {
        if (this.hasMaxLevel && (exp > this.maxExp)) {
            exp = this.maxExp;
        }
        if (level === undefined) {
            level = this.getLevel(exp);
        }
        this._exp = exp;
        this._level = level;
        this._requiredExp = this.getRequiredExpToNextLevel(level, exp);
        // Won't fire `levelup` event
        return this;
    }

    get exp() {
        return this._exp;
    }

    set exp(exp) {
        if (this.hasMaxLevel && (exp > this.maxExp)) {
            exp = this.maxExp;
        }

        if (exp < this._exp) {
            this.resetExp(exp);
            return;
        }
        if (exp === this._exp) {
            return;
        }

        var level = this.getLevel(exp, this._level);

        // Emit levelup event
        var prevLevel = this._level;
        var fromExp = this._exp,
            toExp;
        while (1) {
            var levelStartExp = this.getExp(prevLevel);
            var levelEndExp = this.getExp(prevLevel + 1);
            toExp = Math.min(levelEndExp, exp);
            this.emit('levelup', prevLevel, fromExp, toExp, levelStartExp, levelEndExp);

            if ((prevLevel === level) && (toExp === exp)) {
                break;
            }

            prevLevel++;
            fromExp = levelEndExp;
        }

        this.resetExp(exp, level);
    }

    get level() {
        return this._level;
    }

    set level(value) {
        if (this.hasMaxLevel && (value > this.maxLevel)) {
            this.exp = this.maxExp;
        } else {
            this.exp = this.getExp(value);
        }
    }

    get requiredExp() {
        return this._requiredExp;
    }

    getExp(level) {
        if (level === undefined) {
            return this._exp;
        }

        if (this.isLevelMapFunction) {
            return this.levelTable(level);
        } else {
            if (this.hasMaxLevel && (level > this.maxLevel)) {
                level = this.maxLevel;
            }
            return this.levelTable[level];
        }
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

            if (this.hasMaxLevel && (nextLevelExp === this.maxExp)) {
                break;
            }
        }

        return level;
    }

    getRequiredExpToNextLevel(level, exp) {
        if (level === undefined) {
            level = this.level;
        }
        if (exp === undefined) {
            exp = this.exp;
        }
        return this.getExp(level + 1) - exp;
    }

    checkLevel(level, exp) {
        return (exp >= this.getExp(level)) && (exp < this.getExp(level + 1));
    }

    gainExp(incExp, callback, scope) {
        if (callback) {
            this.on('levelup', callback, scope);
        }

        this.exp += incExp;

        if (callback) {
            this.off('levelup', callback, scope);
        }
        return this;
    }

    setExp(exp, callback, scope) {
        if (callback) {
            this.on('levelup', callback, scope);
        }

        this.exp = exp;

        if (callback) {
            this.off('levelup', callback, scope);
        }
        return this;
    }

    setLevel(level, callback, scope) {
        if (callback) {
            this.on('levelup', callback, scope);
        }

        this.level = level;

        if (callback) {
            this.off('levelup', callback, scope);
        }
        return this;
    }
}

export default LevelCounter;