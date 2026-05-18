import { CmdTypeName } from '../bob/Types';
import Command from '../bob/command/Command';

var CreateCommandChild = function(name?: any, callback?: any, param?: any, scope?: any) {
    var child = this.poolManager.allocate(CmdTypeName);

    if (child === null) {
        child = new Command(
            this,               // parent
            name,
            callback, param, scope,
        );
    } else {
        child
            .setParent(this)
            .setActive()
            .setName(name)
            .setCallback(callback, scope)
            .setParameter(param)

    }

    return child;
}

export default CreateCommandChild;