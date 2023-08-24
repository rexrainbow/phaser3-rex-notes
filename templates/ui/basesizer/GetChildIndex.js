var GetChildIndex = function (child) {
    if (Array.isArray(this.sizerChildren)) {
        var index = this.sizerChildren.indexOf(child);
        if (index === -1) {
            index = null;
        }
        return index;

    } else {
        if (this.getParentSizer(child) !== this) {
            return null;
        }

        for (var key in this.sizerChildren) {
            if (this.sizerChildre[key] === child) {
                return key;
            }
        }
        return null;
    }
}

export default GetChildIndex;