import GetValue from '../../utils/object/GetValue.js';

class History {
    constructor(config) {
        this.maxLength = GetValue(config, 'maxLength', -1); // -1: Infinity
        this.records = [];
    }

    add(record) {
        if (this.maxLength === 0) {
            return this;
        }

        this.records.push(record);
        if (this.records.length > this.maxLength) {
            this.records.shift();
        }
        return this;
    }

    clear() {
        this.records.length = 0;
        return this;
    }

    forEach(callback, scope) {
        if (this.maxLength === 0) {
            return this;
        }

        this.records.forEach(callback, scope);
        return this;
    }

    changeUserName(userID, userName) {
        if (this.maxLength === 0) {
            return this;
        }

        this.records.forEach(function (record) {
            if (record.senderID === userID) {
                record.senderName = userName;
            }
        })
        return this;
    }
}

export default History;