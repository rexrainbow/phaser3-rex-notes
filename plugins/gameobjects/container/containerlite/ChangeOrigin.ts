import ChangeOriginBase from '../../../utils/origin/ChangeOrigin';

var ChangeOrigin = function(originX?: any, originY?: any) {
    this.syncChildrenEnable = false;
    ChangeOriginBase(this, originX, originY);
    this.syncChildrenEnable = true;

    var children = this.getAllChildren();
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        this.resetChildPositionState(children[i]);
    }
    return this;
}

export default ChangeOrigin;