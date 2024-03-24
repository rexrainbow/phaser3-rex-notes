export default {
    getTreeActiveState(title) {
        var eventsheet = this.getTree(title);
        if (!eventsheet) {
            return null;
        }

        return eventsheet.active;
    },

    setTreeActiveState(title, active) {
        var eventsheet = this.getTree(title);
        if (eventsheet) {
            eventsheet.setActive(active);
        }

        return this;
    },
}