const ArrayUtils = Phaser.Utils.Array;

export default {
    getChildren() {
        return this.children.getChildren();
    },

    getAllChildren(out) {
        if (out === undefined) {
            out = [];
        }
        var myCildren = this.children.getChildren(),
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

    contains(gameObject) {
        if (this.children.contains(gameObject)) {
            return true;
        }

        var myCildren = this.children.getChildren(),
            myChild;
        for (var i = 0, cnt = myCildren.length; i < cnt; i++) {
            myChild = myCildren[i];

            if (myChild.isRexContainerLite) {
                if (myChild.contains(gameObject)) {
                    return true;
                }
            }
        }

        return false;
    },

    getByName(name) {
        return ArrayUtils.GetFirst(this.list, 'name', name);
    },

    getRandom(startIndex, length) {
        return ArrayUtils.GetRandom(this.list, startIndex, length);
    },

    getFirst(property, value, startIndex, endIndex) {
        return ArrayUtils.GetFirstElement(this.list, property, value, startIndex, endIndex);
    },

    getAll(property, value, startIndex, endIndex) {
        return ArrayUtils.GetAll(this.list, property, value, startIndex, endIndex);
    },

    count(property, value, startIndex, endIndex) {
        return ArrayUtils.CountAllMatching(this.list, property, value, startIndex, endIndex);
    },

    swap(child1, child2) {
        ArrayUtils.Swap(this.list, child1, child2);
        return this;
    },

    moveTo(child, index) {
        ArrayUtils.MoveTo(this.list, child, index);
        return this;
    },

    setAll(property, value, startIndex, endIndex) {
        ArrayUtils.SetAll(this.list, property, value, startIndex, endIndex);
        return this;
    },
};