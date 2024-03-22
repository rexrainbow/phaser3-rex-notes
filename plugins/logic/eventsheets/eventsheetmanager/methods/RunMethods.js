export default {
    start() {
        var argumentsCount = arguments.length;
        switch (argumentsCount) {
            case 0:
                this.getTreeGroup(this.defaultTreeGroupName).start();
                break;

            case 1:
                var name = arguments[0];
                if (this.hasTreeGroup(name)) {
                    this.getTreeGroup(name).start();
                } else {
                    this.getTreeGroup(this.defaultTreeGroupName).startTree(name);
                }
                break;

            case 2:
                var title = arguments[0];
                var ignoreCondition, groupName;
                if (typeof (arguments[1]) === 'string') {
                    ignoreCondition = true;
                    groupName = arguments[1];
                } else {
                    ignoreCondition = arguments[1];
                    groupName = this.defaultTreeGroupName;
                }
                this.getTreeGroup(groupName).startTree(title, ignoreCondition);
                break;

            default:
                var title = arguments[0];
                var groupName = arguments[1];
                var ignoreCondition = arguments[2];
                this.getTreeGroup(groupName).startTree(title, ignoreCondition);
                break;
        }
        return this;
    },

    continue(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName;
        }
        this.getTreeGroup(groupName).continue();
        return this;
    },

    stop(groupName) {
        if (groupName === undefined) {
            groupName = this.defaultTreeGroupName;
        }
        this.getTreeGroup(groupName).stop();
        return this;
    },
}