import IsEmpty from '../../../../utils/object/IsEmpty';
import GetPartialData from '../../../../utils/object/GetPartialData';
import IsKeyValueEqual from '../../../../utils/object/IsKeyValueEqual';

var RegisterFocusStyle = function(focusStyle?: any) {
    if (IsEmpty(focusStyle)) {
        return;
    }

    this
        .setFocusStyle(focusStyle)
        .on('open', function() {
            var child = this.background;
            var focusStyle = this.focusStyle;
            var styleSave = GetPartialData(child, focusStyle);
            if (IsKeyValueEqual(focusStyle, styleSave)) {
                return;
            }

            child.styleSave = styleSave;
            child.modifyStyle(focusStyle);
        }, this)
        .on('close', function() {
            var child = this.background;

            if (!child.styleSave) {
                return;
            }

            child.modifyStyle(child.styleSave);
            child.styleSave = undefined;
        }, this)
}

export default RegisterFocusStyle;