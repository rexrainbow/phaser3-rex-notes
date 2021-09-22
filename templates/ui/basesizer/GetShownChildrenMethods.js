export default {
    getShownChildren(out) {
        if (out === undefined) {
            out = [];
        }
        var children = this.children,
            child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child.rexSizer && child.rexSizer.hidden) { // Don't add hidden child
                continue;
            }

            out.push(child);
        }

        return out;
    },

    getAllShownChildren(out) {
        if (out === undefined) {
            out = [];
        }

        var children = this.children,
            child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child.rexSizer && child.rexSizer.hidden) { // Don't add hidden child
                continue;
            }

            out.push(child);

            if (child.hasOwnProperty('isRexContainerLite')) {
                out.push(...child.getAllShownChildren());
            }
        }

        return out;
    }
}