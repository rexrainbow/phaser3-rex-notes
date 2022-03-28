var AddChild = function (bob) {
    this.lastAppendedChildren.length = 0;

    if (Array.isArray(bob)) {
        var bobArray = bob;
        for (var i = 0, cnt = bobArray.length; i < cnt; i++) {
            this.children.add(bobArray[i]);
        }
        this.lastAppendedChildren.push(...bobArray);
    } else {
        this.children.add(bob);
        this.lastAppendedChildren.push(bob);
    }

    return this;
}

export default AddChild;