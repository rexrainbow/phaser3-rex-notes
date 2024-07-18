(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexbuffdataplugin = factory());
})(this, (function () { 'use strict';

    class Buff {
        constructor() {
            this.buffs = {};
        }

        setEnable(key, enable) {
            if (enable === undefined) {
                enable = true;
            }
            if (!this.buffs.hasOwnProperty(key)) {
                this.buffs[key] = {
                    enable: true,
                    value: 0,
                    type: ADD,
                };
            }
            this.buffs[key].enable = enable;
            return this;
        }

        set(key, value) {
            this.setEnable(key);

            var valueType = typeof (value);
            if (valueType === 'number') {
                valueType = ADD;
            } else if (valueType === 'string') {
                if (value.indexOf('%') !== -1) {
                    valueType = ADD_BASE_PERCENT;
                    value = parseFloat(value) / 100;
                } else {
                    valueType = ADD;
                    value = parseFloat(value);
                }
            }
            var buff = this.buffs[key];
            buff.value = value;
            buff.type = valueType;
            return this;
        }

        remove(key) {
            if (this.buffs.hasOwnProperty(key)) {
                delete this.buffs[key];
            }
            return this;
        }

        buff(baseValue) {
            var result = baseValue;
            var buffs = this.buffs,
                value, valueType;
            for (var key in buffs) {
                value = buffs[key];
                if (!value.enable) {
                    continue;
                }

                valueType = value.type;
                value = value.value;
                switch (valueType) {
                    case ADD:
                        result += value;
                        break;
                    case ADD_BASE_PERCENT:
                        result += baseValue * value;
                        break;
                }
            }
            return result;
        }
    }

    const ADD = 0;
    const ADD_BASE_PERCENT = 1;

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class MinMaxBounds {
        constructor(min, max) {
            if (IsPlainObject(min)) {
                var config = min;
                min = GetValue(config, 'min', undefined);
                max = GetValue(config, 'max', undefined);
            }
            this.setMin(min);
            this.setMax(max);
        }

        setMin(value) {
            this.min = value;
            return this;
        }

        setMax(value) {
            this.max = value;
            return this;
        }

        clamp(value) {
            if ((this.min !== undefined) && (value < this.min)) {
                value = this.min;
            } else if ((this.max !== undefined) && (value > this.max)) {
                value = this.max;
            }
            return value;
        }
    }

    var methods = {
        setBaseValue(key, value) {
            this.baseValues[key] = value;
            this.set(key, this.getBuffResult(key));
            return this;
        },

        removeBaseValue(key) {
            if (this.baseValues.hasOwnProperty(key)) {
                delete this.baseValues[key];
                this.remove(key);
            }
            return this;
        },

        setBuff(key, buffKey, value) {
            if (!this.buffs.hasOwnProperty(key)) {
                this.buffs[key] = new Buff();
            }
            this.buffs[key].set(buffKey, value);
            this.set(key, this.getBuffResult(key));
            return this;
        },

        enableBuff(key, buffKey, enable) {
            if (!this.buffs.hasOwnProperty(key)) {
                this.buffs[key] = new Buff();
            }
            this.buffs[key].setEnable(buffKey, enable);
            this.set(key, this.getBuffResult(key));
            return this;
        },

        removeBuff(key, buffKey) {
            if (this.buffs.hasOwnProperty(key)) {
                if (buffKey === undefined) {
                    delete this.buffs[key];
                } else {
                    this.buffs[key].remove(buffKey);
                }
            }
            this.set(key, this.getBuffResult(key));
            return this;
        },

        setMin(key, min) {
            if (!this.bounds.hasOwnProperty(key)) {
                this.bounds[key] = new MinMaxBounds();
            }
            this.bounds[key].setMin(min);
            this.set(key, this.getBuffResult(key));
            return this;
        },

        setMax(key, max) {
            if (!this.bounds.hasOwnProperty(key)) {
                this.bounds[key] = new MinMaxBounds();
            }
            this.bounds[key].setMax(max);
            this.set(key, this.getBuffResult(key));
            return this;
        },

        setBounds(key, min, max) {
            if (!this.bounds.hasOwnProperty(key)) {
                this.bounds[key] = new MinMaxBounds();
            }
            this.bounds[key].setMin(min).setMax(max);
            this.set(key, this.getBuffResult(key));
            return this;
        },

        getBuffResult(key) {
            return this.clamp(key, this.buff(key));
        },

        buff(key, baseValue) {
            if (baseValue === undefined) {
                baseValue = this.getBaseValue(key);
            }
            if (!this.buffs.hasOwnProperty(key)) {
                return baseValue;
            }
            return this.buffs[key].buff(baseValue);
        },

        clamp(key, value) {
            if (value === undefined) {
                value = this.list[key];
            }
            if (!this.bounds.hasOwnProperty(key)) {
                return value;
            }
            return this.bounds[key].clamp(value);
        },

        getBaseValue(key) {
            if (!this.baseValues.hasOwnProperty(key)) {
                this.baseValues[key] = 0;
            }
            return this.baseValues[key];
        },

        getBuffs(key, buffKey) {
            var buffs = this.buffs[key];
            if (buffKey === undefined) {
                return buffs;
            }
            if (buffs && buffs.hasOwnProperty(buffKey)) {
                return buffs[buffKey];
            }

            return undefined;
        },

        getBuffValue(key, buffKey) {
            return this.getBuffs(key, buffKey).value
        },

        getBounds(key) {
            if (!this.bounds.hasOwnProperty(key)) {
                this.bounds[key] = new MinMaxBounds();
            }
            return this.bounds[key];
        },

        getMinBound(key) {
            return this.getBounds(key).min;
        },

        getMaxBound(key) {
            return this.getBounds(key).max;
        }
    };

    var Extend = function (dataManager) {
        if (dataManager.buffs === undefined) {
            dataManager.baseValues = {};
            dataManager.buffs = {};
            dataManager.bounds = {};
        }
        if (dataManager.addBuff === undefined) {
            Object.assign(dataManager, methods);
        }
        return dataManager;
    };

    const Base = Phaser.Data.DataManager;
    const EventEmitterClass = Phaser.Events.EventEmitter;

    class DataManager extends Base {
        constructor(parent, eventEmitter) {
            var useDefaultEventEmitter = (eventEmitter === undefined);
            if (useDefaultEventEmitter) {
                eventEmitter = new EventEmitterClass();
            }

            super(parent, eventEmitter);

            if (useDefaultEventEmitter) {
                var parentEventEmitter = (parent.events) ? parent.events : parent;
                if (parentEventEmitter) {
                    parentEventEmitter.once('destroy', this.destroy, this);
                }
            }

            Extend(this);
        }
    }

    Object.assign(
        DataManager.prototype,
        methods
    );

    class DataManagerPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(parent, eventEmitter) {
            return new DataManager(parent, eventEmitter);
        }

        extend(dataManager) {
            return Extend(dataManager);
        }
    }

    return DataManagerPlugin;

}));
