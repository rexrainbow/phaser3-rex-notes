import { CmdTypeName } from '../bob/Types.js';

var AppendCommand = function (name, callback, scope, param) {
    var bob = this.poolManager.allocate(CmdTypeName);
    if (bob === null) {
        bob = new ImageData(
            this,               // parent
            name,
            callback, scope, param
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