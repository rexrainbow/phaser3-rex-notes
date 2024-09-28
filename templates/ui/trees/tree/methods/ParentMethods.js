
export default {
    getTreePatent(gameObject) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        if (!gameObject.rexSizer) {
            return undefined;
        }

        return gameObject.rexSizer.treeParent;
    },

    getTreeRoot(gameObject) {
        if (gameObject === undefined) {
            gameObject = this;
        }

        var treeParent;
        while (1) {
            if (!gameObject.rexSizer) {
                return undefined;
            }

            treeParent = gameObject.rexSizer.treeParent;
            if (treeParent === null) {
                return gameObject;
            }

            gameObject = treeParent;
        }

        return undefined;
    },

    getTreesSizer(gameObject) {
        var root = this.getTreeRoot(gameObject);
        return (root) ? root.getParentSizer() : null;
    },

    isGrandsonNode(gameObject) {
        if ((gameObject === undefined) || (!gameObject.rexSizer)) {
            return false;
        }

        var treeParent;
        while (1) {
            if (!gameObject.rexSizer) {
                return false;
            }

            treeParent = gameObject.rexSizer.treeParent;
            if (treeParent === this) {
                return true;
            } else if (treeParent === null) {
                return false;
            }

            gameObject = treeParent;
        }

        return false;
    },
}