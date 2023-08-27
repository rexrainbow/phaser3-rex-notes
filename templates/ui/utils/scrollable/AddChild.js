const GetValue = Phaser.Utils.Objects.GetValue;

var AddChild = function (topPatent, childParent, config) {
    var childConfig = GetValue(config, 'child');
    var child = GetValue(childConfig, 'gameObject', undefined)
    if (child) {
        var childSpace = GetValue(config, 'space.child', 0);
        topPatent.childMargin = {};
        var childMargin = topPatent.childMargin;
        var childPadding = {};

        if (typeof (childSpace) === 'number') {
            // Legacy, add childSpace to slider
            switch (topPatent.scrollMode) {
                case 0:
                case 1:
                    childMargin.top = 0;
                    childMargin.bottom = 0;
                    childMargin.left = 0;
                    childMargin.right = 0;
                    break;

                default:
                    childMargin.top = childSpace;
                    childMargin.bottom = childSpace;
                    childMargin.left = childSpace;
                    childMargin.right = childSpace;
                    break;
            }
        } else {
            switch (topPatent.scrollMode) {
                case 0:
                    childMargin.top = GetValue(childSpace, 'top', 0);
                    childMargin.bottom = GetValue(childSpace, 'bottom', 0);

                    childPadding.left = GetValue(childSpace, 'left', 0);
                    childPadding.right = GetValue(childSpace, 'right', 0);
                    break;

                case 1:
                    childMargin.top = GetValue(childSpace, 'left', 0);
                    childMargin.bottom = GetValue(childSpace, 'right', 0);

                    childPadding.top = GetValue(childSpace, 'top', 0);
                    childPadding.bottom = GetValue(childSpace, 'bottom', 0);
                    break;

                default: // 2
                    childMargin.top = GetValue(childSpace, 'top', 0);
                    childMargin.bottom = GetValue(childSpace, 'bottom', 0);
                    childMargin.left = GetValue(childSpace, 'left', 0);
                    childMargin.right = GetValue(childSpace, 'right', 0);
                    break;

            }
        }

        childParent.add(child,
            {
                column: 1,
                row: 1,
                align: GetValue(childConfig, 'align', 'center'),
                padding: childPadding,
                expand: {
                    width: GetValue(childConfig, 'expandWidth', true),  // Private
                    height: GetValue(childConfig, 'expandHeight', true) // Private
                }
            }
        );
    }

    topPatent.addChildrenMap('child', child);

}

export default AddChild;