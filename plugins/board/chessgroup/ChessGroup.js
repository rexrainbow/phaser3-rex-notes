const Group = Phaser.GameObjects.Group;
class ChessGroup extends Group {
    constructor(scene, children) {
        super(scene, children);
    }

    // add(chess) {}

    addByTileXYZ(board, tileX, tileY, tileZ) {
        var chess = board.tileXYZToChess(tileX, tileY, tileZ);
        if (chess) {
            this.add(chess);
        }
        return this;
    }

    addByTileXY(board, tileXY, tileZ) {
        if (tileZ === undefined) {
            tileZ = 0;
        }
        if (Array.isArray(tileXY)) {
            for (var i = 0, cnt = tileXY.length; i < cnt; i++) {
                this.addByTileXYZ(board, tileXY[i].x, tileXY[i].y, tileZ);
            }
        } else {
            this.addByTileXYZ(board, tileXY.x, tileXY.y, tileZ);
        }
        return this;
    }

    get chess() {
        return this.getChildren();
    }

    get length() {
        return this.getLength();
    }

    get isEmpty() {
        return (this.length === 0);
    }

    // override
    get(idx) {
        return this.getChildren()[idx];
    }

    pop(idx) {
        var chess = this.get(idx);
        this.remove(chess);
        return chess;
    }

    find(property, value) {
        return this.children.get(property, value);
    }

    union(groupB) {
        var setA = this.children;
        var setB = groupB.children;
        var setC = setA.union(setB);
        var groupC = new ChessGroup(this.scene, setC.entries);
        return groupC;
    }

    intersect(groupB) {
        var setA = this.children;
        var setB = groupB.children;
        var setC = setA.intersect(setB);
        var groupC = new ChessGroup(this.scene, setC.entries);
        return groupC;
    }

    difference(groupB) {
        var setA = this.children;
        var setB = groupB.children;
        var setC = setA.difference(setB);
        var groupC = new ChessGroup(this.scene, setC.entries);
        return groupC;
    }

    isSubset(groupB) {
        var setA = this.children;
        var chessB = groupB.chess;
        for (var i = 0, cnt = chessB.length; i < cnt; i++) {
            if (!setA.contains(chessB[i])) {
                return false;
            }
        }
        return true;
    }

    // destroy() {}
}
export default ChessGroup;