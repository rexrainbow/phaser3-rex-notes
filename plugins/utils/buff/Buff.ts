class Buff {
    buffs: any;

    constructor() {
        this.buffs = {};
    }

    setEnable(key?: any, enable?: any) {
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

    set(key?: any, value?: any) {
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

    remove(key?: any) {
        if (this.buffs.hasOwnProperty(key)) {
            delete this.buffs[key];
        }
        return this;
    }

    buff(baseValue?: any) {
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
            switch (valueType?: any) {
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

const ADD = 0
const ADD_BASE_PERCENT = 1;

export default Buff;