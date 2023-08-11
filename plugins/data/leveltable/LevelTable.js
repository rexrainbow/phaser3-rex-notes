import EventEmitterMethods from '../../utils/eventemitter/EventEmitterMethods.js';
import IsFunction from '../../utils/object/IsFunction.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class LevelTable {
    constructor(config) {
        // Event emitter
        var eventEmitter = GetValue(config, 'eventEmitter', undefined);
        var EventEmitterClass = GetValue(config, 'EventEmitterClass', undefined);
        this.setEventEmitter(eventEmitter, EventEmitterClass);

        this.setTable(GetValue(config, 'table'));
        this.level = GetValue(config, 'level', 0);
        this.exp = GetValue(config, 'exp', 0);
        this.requiredExp = this.getRequiredExpToNextLevel(this.level, this.exp);
    }

    setTable(table) {
        this.levelTable = table;
        this.isLevelMapFunction = IsFunction(table);
        return this;
    }

    getExp(level) {
        return (this.isLevelMapFunction) ? this.levelTable(level) : this.levelTable[level];
    }

    getLevel(exp, level) {
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

Object.assign(
    LevelTable.prototype,
    EventEmitterMethods
);

export default LevelTable;