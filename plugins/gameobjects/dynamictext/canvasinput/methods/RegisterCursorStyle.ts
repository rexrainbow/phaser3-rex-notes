import IsEmpty from '../../../../utils/object/IsEmpty';
import GetPartialData from '../../../../utils/object/GetPartialData';
import IsKeyValueEqual from '../../../../utils/object/IsKeyValueEqual';

var RegisterCursorStyle = function(cursorStyle?: any) {
    if (IsEmpty(cursorStyle)) {
        return;
    }

    this
        .setCursorStyle(cursorStyle)
        .on('cursorin', function(child?: any) {
            var cursorStyle = this.cursorStyle;
            var styleSave = GetPartialData(child.style, cursorStyle);
            if (IsKeyValueEqual(cursorStyle, styleSave)) {
                return;
            }

            child.styleSave = styleSave;
            child.modifyStyle(cursorStyle);
        }, this)
        .on('cursorout', function(child?: any) {
            if (!child.styleSave) {
                return;
            }

            child.modifyStyle(child.styleSave);
            child.styleSave = undefined;
        }, this)
}

export default RegisterCursorStyle;