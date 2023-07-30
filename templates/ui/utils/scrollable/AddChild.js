const GetValue = Phaser.Utils.Objects.GetValue;

var AddChild = function (topPatent, childParent, config) {
    var child = GetValue(config, 'child.gameObject', undefined)
    if (child) {
        var childSpace = GetValue(config, 'space.child', 0);
        topPatent.childMargin = {};
        var childMargin = topPatent.childMargin;

        if (typeof (childSpace) === 'number') {
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
                    childMargin.top = GetValue(childSpace, 'top', childSpace);
                    childMargin.bottom = GetValue(childSpace, 'bottom', childSpace);
                    childMargin.left = 0;
                    childMargin.right = 0;
                    break;

                case 1:
                    childMargin.top = GetValue(childSpace, 'left', childSpace);
                    childMargin.bottom = GetValue(childSpace, 'right', childSpace);
                    childMargin.left = 0;
                    childMargin.right = 0;
                    break;

                default: // 2
                    childMargin.top = GetValue(childSpace, 'top', childSpace);
                    childMargin.bottom = GetValue(childSpace, 'bottom', childSpace);
                    childMargin.left = GetValue(childSpace, 'left', childSpace);
                    childMargin.right = GetValue(childSpace, 'right', childSpace);
                    break;

            }
        }

        childParent.add(child,
            {
                column: 1,
                row: 1,
                align: 'center',
                expand: {
                    width: GetValue(config, 'child.expandWidth', true),  // Private
                    height: GetValue(config, 'child.expandHeight', true) // Private
                }
            }
        );
    }

    topPatent.addChildrenMap('child', child);

}

export default AddChild;