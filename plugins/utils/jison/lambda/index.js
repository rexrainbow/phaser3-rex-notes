var Base = require('./parser.js').Parser;

class Parser extends Base {
    constructor(data) {
        if (data === undefined) {
            data = {};
        }
        super();
        this.data = data
    }
}

module.exports = Parser;