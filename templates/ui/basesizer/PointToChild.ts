import IsFunction from '../../../plugins/utils/object/IsFunction';
import IsArray from '../../../plugins/utils/object/IsArray';
import ContainsPoint from '../utils/ContainsPoint';

var PointToChild = function(x?: any, y?: any, preTest?: any, postTest?: any, children?: any) {
    if (!IsFunction(preTest)) {
        children = preTest;
        preTest = undefined;
        postTest = undefined;
    }

    if (children === undefined) {
        if (this.sizerChildren) {
            children = this.sizerChildren; // rexSizer 
        } else if (this.isRexContainerLite) {
            children = this.children; // rexContainerLite
        } else {
            children = this.list; // container, or layer
        }
    }

    if (IsArray(children)) {
        var child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (ContainsPoint(child, x, y, preTest, postTest)) {
                return child;
            }
        }
    } else {
        var child;
        for (var key in children) {
            child = children[key];
            if (ContainsPoint(child, x, y, preTest, postTest)) {
                return child;
            }
        }
    }

    return null;
}

export default PointToChild;