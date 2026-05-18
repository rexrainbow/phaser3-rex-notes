import GetValue from '../../../utils/object/GetValue';

class History {
    maxLength: any;
    records: any;

    constructor(config?: any) {
        this.maxLength = GetValue(config, 'maxLength', -1); // -1: Infinity
        this.records = [];
    }

    add(record?: any) {
        if (this.maxLength === 0) {
            return this;
        }

        this.records.push(record);
        if ((this.maxLength > 0) && (this.records.length > this.maxLength)) {
            this.records.shift();
        }
        return this;
    }

    clear() {
        this.records.length = 0;
        return this;
    }

    changeUserName(userID?: any, userName?: any) {
        if (this.maxLength === 0) {
            return this;
        }

        this.records.forEach(function(record?: any) {
            if (record.senderID === userID) {
                record.senderName = userName;
            }
        })
        return this;
    }
}

export default History;