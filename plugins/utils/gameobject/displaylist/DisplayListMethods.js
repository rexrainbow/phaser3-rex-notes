const ArrayUtils = Phaser.Utils.Array;

export const BringMeToTop = function () {
    var list;
    if (this.parentContainer) {
        list = this.parentContainer.list;
    } else if (this.displayList) {
        list = this.displayList.list;
    }
    if (!list) {
        return this;
    }

    ArrayUtils.BringToTop(list, this);

    return this;
}

export const SendMeToBack = function () {
    var list;
    if (this.parentContainer) {
        list = this.parentContainer.list;
    } else if (this.displayList) {
        list = this.displayList.list;
    }
    if (!list) {
        return this;
    }

    ArrayUtils.SendToBack(list, this);

    return this;
}

export const MoveMyDepthBelow = function (gameObject) {
    var list;
    if (gameObject.parentContainer) {
        list = gameObject.parentContainer.list;
        if (list.indexOf(this) === -1) {
            gameObject.parentContainer.add(this);
        }
    } else if (gameObject.displayList) {
        list = gameObject.displayList.list;
        if (list.indexOf(this) === -1) {
            gameObject.displayList.add(this);
        }
    }
    if (!list) {
        return this;
    }

    ArrayUtils.MoveBelow(list, this, gameObject);

    return this;
}

export const MoveMyDepthAbove = function (gameObject) {
    var list;
    if (gameObject.parentContainer) {
        list = gameObject.parentContainer.list;
        if (list.indexOf(this) === -1) {
            if (gameObject.isRexContainerLite) {
                gameObject.addToContainer(gameObject.parentContainer);
            } else {
                gameObject.parentContainer.add(gameObject);
            }
        }
    } else if (gameObject.displayList) {
        list = gameObject.displayList.list;
        if (list.indexOf(this) === -1) {
            if (gameObject.isRexContainerLite) {
                gameObject.addToLayer(gameObject.displayList);
            } else {
                gameObject.displayList.add(gameObject);
            }
        }
    }
    if (!list) {
        return this;
    }

    ArrayUtils.MoveAbove(list, this, gameObject);

    return this;
}

export default {
    bringMeToTop: BringMeToTop,

    sendMeToBack: SendMeToBack,

    moveMyDepthBelow: MoveMyDepthBelow,

    moveMyDepthAbove: MoveMyDepthAbove,
}