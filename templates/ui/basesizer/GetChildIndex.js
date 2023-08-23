var GetChildIndex = function (child) {
    if (Array.isArray(this.sizerChildren)) {
        return this.sizerChildren.indexOf(child);
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