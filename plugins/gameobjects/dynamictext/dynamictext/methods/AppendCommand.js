import { CmdTypeName } from '../bob/Types.js';

var AppendCommand = function (name, params) {
    var bob = this.poolManager.allocate(CmdTypeName);
    if (bob === null) {
        bob = new ImageData(
            this,               // parent
            name,
            params
        );
    } else {
        bob
            .setParent(this)
            .setActive()
            .setName(name)
            .setParameters(params);

    }

    this.lastAppendedChildren.length = 0;
    this.children.push(bob);
    this.lastAppendedChildren.push(bob);
    return this;
}

export default AppendCommand;