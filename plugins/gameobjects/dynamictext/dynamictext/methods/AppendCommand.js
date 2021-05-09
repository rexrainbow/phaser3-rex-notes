import { CmdTypeName } from '../bob/Types.js';
import Command from '../bob/command/Command.js';

var AppendCommand = function (name, callback, param, scope) {
    var bob = this.poolManager.allocate(CmdTypeName);
    if (bob === null) {
        bob = new Command(
            this,               // parent
            name,
            callback, param, scope, 
        );
    } else {
        bob
            .setParent(this)
            .setActive()
            .setName(name)
            .setCallback(callback, scope)
            .setParameter(param)

    }

    this.lastAppendedChildren.length = 0;
    this.children.push(bob);
    this.lastAppendedChildren.push(bob);
    return this;
}

export default AppendCommand;