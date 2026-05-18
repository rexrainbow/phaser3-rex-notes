import Base from '../Base';
import { CmdTypeName } from '../Types';

class Command extends Base {
    callback: any;
    name: any;
    param: any;
    scope: any;

    constructor(parent?: any, name?: any, callback?: any, param?: any, scope?: any) {
        super(parent, CmdTypeName);

        this
            .setName(name)
            .setParameter(param)
            .setCallback(callback, scope);
    }

    setName(name?: any) {
        this.name = name;
        return this;
    }

    setParameter(param?: any) {
        this.param = param;
        return this;
    }

    setCallback(callback?: any, scope?: any) {
        this.callback = callback;
        this.scope = scope;
        return this;
    }

    exec() {
        var result;
        if (this.scope) {
            result = this.callback.call(this.scope, this.param, this.name);
        } else {
            result = this.callback(this.param, this.name);
        }
        return result;
    }

    onFree() {
        super.onFree();
        this
            .setName()
            .setCallback()
            .setParameter()
    }
}

export default Command;