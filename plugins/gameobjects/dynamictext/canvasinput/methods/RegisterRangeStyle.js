import IsEmpty from '../../../../utils/object/IsEmpty.js';
import GetPartialData from '../../../../utils/object/GetPartialData.js';
import IsKeyValueEqual from '../../../../utils/object/IsKeyValueEqual.js';

var RegisterRangeStyle = function (rangeStyle) {
    if (IsEmpty(rangeStyle)) {
        return;
    }

    this
        .setRangeStyle(rangeStyle)
        .on('rangein', function (child) {
            var rangeStyle = this.rangeStyle;
            var styleSave = GetPartialData(child.style, rangeStyle);
            if (IsKeyValueEqual(rangeStyle, styleSave)) {
                return;
            }

            child.styleSave = styleSave;
            child.modifyStyle(rangeStyle);
        }, this)
        .on('rangeout', function (child) {
            if (!child.styleSave) {
                return;
            }

            child.modifyStyle(child.styleSave);
            child.styleSave = undefined;
        }, this)
}

export default RegisterRangeStyle;