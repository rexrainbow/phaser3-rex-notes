const GetValue = Phaser.Utils.Objects.GetValue;

var AddMainChild = function (topPatent, childParent, config) {
    var child = GetValue(config, 'child.gameObject', undefined),
        childPadding;
    if (child) {
        var childSpace = GetValue(config, 'space.child', 0);
        topPatent.childMargin = {};
        var childMargin = topPatent.childMargin;

        if (typeof (childSpace) !== 'number') {
            switch (topPatent.scrollMode) {
                case 0:
                    childPadding = {
                        left: GetValue(childSpace, 'left', 0),
                        right: GetValue(childSpace, 'right', 0),
                    }
                    childMargin.top = GetValue(childSpace, 'top', 0);
                    childMargin.bottom = GetValue(childSpace, 'bottom', 0);
                    childMargin.left = 0;
                    childMargin.right = 0;
                    break;

                case 1:
                    childPadding = {
                        top: GetValue(childSpace, 'top', 0),
                        bottom: GetValue(childSpace, 'bottom', 0),
                    }
                    childMargin.top = GetValue(childSpace, 'left', 0);
                    childMargin.bottom = GetValue(childSpace, 'right', 0);
                    childMargin.left = 0;
                    childMargin.right = 0;
                    break;

                default: // 2
                    childPadding = 0;
                    childMargin.top = GetValue(childSpace, 'top', 0);
                    childMargin.bottom = GetValue(childSpace, 'bottom', 0);
                    childMargin.left = GetValue(childSpace, 'left', 0);
                    childMargin.right = GetValue(childSpace, 'right', 0);
                    break;

            }

        } else {
            childPadding = 0;
            childMargin.top = childSpace;
            childMargin.bottom = childSpace;
            childMargin.left = childSpace;
            childMargin.right = childSpace;
        }

        childParent.add(child,
            {
                column: 1,
                row: 1,
                align: 'center',
                padding: childPadding,
                expand: {
                    width: GetValue(config, 'child.expandWidth', true),  // Private
                    height: GetValue(config, 'child.expandHeight', true) // Private
                }
            }
        );
    }

    topPatent.addChildrenMap('child', child);

}

export default AddMainChild;