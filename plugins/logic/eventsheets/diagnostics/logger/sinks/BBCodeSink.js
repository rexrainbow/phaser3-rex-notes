import BBCodeLog from '../../../../../bbcodelog.js';

class BBCodeSink {
    constructor(config) {
        this.logger = new BBCodeLog(config);
    }

    setEnable(enable = true) {
        this.logger.setEnable(enable);
        return this;
    }

    write(value) {
        this.logger.log(value);
        return this;
    }
}

export default BBCodeSink;
