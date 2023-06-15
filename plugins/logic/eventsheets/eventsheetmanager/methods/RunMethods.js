export default {
    start(groupName = 'default') {
        this.getTreeGroup(groupName).start();
        return this;
    },

    continue(groupName = 'default') {
        this.getTreeGroup(groupName).continue();
        return this;
    },

    stop(groupName = 'default') {
        this.getTreeGroup(groupName).stop();
        return this;
    },
}