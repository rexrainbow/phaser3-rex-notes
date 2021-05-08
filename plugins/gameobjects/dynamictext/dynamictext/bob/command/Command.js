import Base from '../Base.js';
import { CmdTypeName } from '../Types.js';

class Command extends Base {
    constructor(parent, name, params) {
        super(parent, CmdTypeName);

        this
            .setName(name)
            .setParameters(params);
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setParameters(params) {
        this.clearData();
        if (params) {
            this.setData(params)
        }
        return this;
    }

    draw() { }
}

export default Command;