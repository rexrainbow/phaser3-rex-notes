export default {
    getTreeActiveState(title?: any) {
        var eventsheet = this.getTree(title);
        if (!eventsheet) {
            return null;
        }

        return eventsheet.active;
    },

    setTreeActiveState(title?: any, active?: any) {
        var eventsheet = this.getTree(title);
        if (eventsheet?: any) {
            eventsheet.setActive(active);
        }

        return this;
    },
}