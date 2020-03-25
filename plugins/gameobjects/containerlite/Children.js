const ArrayUtils = Phaser.Utils.Array;

export default {
    getChildren() {
        return this.children;
    },

    getAllChildren(out) {
        if (out === undefined) {
            out = [];
        }
        var myCildren = this.children,
            myChild;
        for (var i = 0, cnt = myCildren.length; i < cnt; i++) {
            myChild = myCildren[i];
            out.push(myChild);

            if (myChild.hasOwnProperty('isRexContainerLite')) {
                out.push(...myChild.getAllChildren());
            }
        }

        return out;
    },

    contains(gameObject) { // Override Base.contains method
        var parent = this.getParent(gameObject);
        if (!parent) {
            return false;
        } else if (parent === this) {
            return true;
        } else {
            return this.contains(parent);
        }
    },

    getByName(name) {
        return ArrayUtils.GetFirst(this.children, 'name', name);
    },

    getRandom(startIndex, length) {
        return ArrayUtils.GetRandom(this.children, startIndex, length);
    },

    getFirst(property, value, startIndex, endIndex) {
        return ArrayUtils.GetFirstElement(this.children, property, value, startIndex, endIndex);
    },

    getAll(property, value, startIndex, endIndex) {
        return ArrayUtils.GetAll(this.children, property, value, startIndex, endIndex);
    },

    count(property, value, startIndex, endIndex) {
        return ArrayUtils.CountAllMatching(this.children, property, value, startIndex, endIndex);
    },

    swap(child1, child2) {
        ArrayUtils.Swap(this.children, child1, child2);
        return this;
    },

    moveTo(child, index) {
        ArrayUtils.MoveTo(this.children, child, index);
        return this;
    },

    setAll(property, value, startIndex, endIndex) {
        ArrayUtils.SetAll(this.children, property, value, startIndex, endIndex);
        return this;
    },
};