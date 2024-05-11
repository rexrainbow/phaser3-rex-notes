var CreateChild = function (parent, callback, message) {
    var child = callback(parent.scene, message);

    // Destroy this child when
    // Click
    child.onClick(function () {
        DestroyChild(parent, child);
    })

    // Timeout 
    if (parent.displayTime) {
        var delay = parent.transitInTime + parent.displayTime + 10;
        child.delayCall(delay, function () {
            DestroyChild(parent, child);
        })
    }

    return child;
}

var GetChildrenPosition = function (parent) {
    var children = parent.childrenMap.items,
        child;

    var positionList = [];
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        positionList.push({ x: child.x, y: child.y });
    }

    return positionList;
}

var RunLayout = function (parent) {
    var children = parent.childrenMap.items,
        child;

    // Store current scale, reset scale to 1
    var scaleList = [];
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        child = children[i];
        scaleList.push({ x: child.scaleX, y: child.scaleY });
        child.setScale(1);
    }

    // Run layout, with scale1
    parent.layout();
    var newPositionList = GetChildrenPosition(parent);

    // Restore scale
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var scaleData = scaleList[i];
        children[i].setScale(scaleData.x, scaleData.y);
    }

    return newPositionList;
}

var EaseChildren = function (parent, prevPositionList, newPositionList, duration) {
    var children = parent.childrenMap.items;
    var listLength = Math.min(prevPositionList.length, newPositionList.length, children.length);
    var child, prevPositionData, newPostionData;
    var queueDirection = parent.queueDirection;
    for (var i = 0; i < listLength; i++) {
        child = children[i];
        prevPositionData = prevPositionList[i];
        newPostionData = newPositionList[i];

        child.setPosition(prevPositionData.x, prevPositionData.y)

        switch (queueDirection) {
            case 0: // bottom-to-top
                if (prevPositionData.y <= newPostionData.y) {
                    continue;
                }
                break;

            case 1: // top-to-bottom
                if (prevPositionData.y >= newPostionData.y) {
                    continue;
                }
                break;

            case 2: // right-to-left
                if (prevPositionData.x <= newPostionData.x) {
                    continue;
                }
                break;

            case 3: // left-to-right
                if (prevPositionData.x >= newPostionData.x) {
                    continue;
                }
                break;
        }

        child.moveTo(duration, newPostionData.x, newPostionData.y);
    }
}

var DestroyChild = function (parent, child) {
    if (child.__isDestroying) {
        return;
    }

    child.__isDestroying = true;

    var duration = parent.transitOutTime;
    parent.transitOutCallback(child, duration, parent);
    child.delayCall(duration + 10, function () {
        delete child.__isDestroying;
        child.destroy();
    })
}

var PushChild = function (parent, child, duration) {
    var prevPositionList = GetChildrenPosition(parent);
    parent.add(child);
    var newPositionList = RunLayout(parent);

    EaseChildren(parent, prevPositionList, newPositionList, duration);

    parent.transitInCallback(child, duration, parent);
}

export default {
    showMessage(message) {
        var child = CreateChild(this, this.createMessageLabelCallback, message);
        PushChild(this, child, this.transitInTime);
        return this;
    },

    removeAllMessages() {
        var children = this.childrenMap.items;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            DestroyChild(this, children[i]);
        }
        return this;
    }
}