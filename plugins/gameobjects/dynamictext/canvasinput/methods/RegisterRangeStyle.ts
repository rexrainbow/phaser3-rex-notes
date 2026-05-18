import IsEmpty from '../../../../utils/object/IsEmpty';
import GetPartialData from '../../../../utils/object/GetPartialData';
import IsKeyValueEqual from '../../../../utils/object/IsKeyValueEqual';

var RegisterRangeStyle = function(rangeStyle?: any) {
    if (IsEmpty(rangeStyle)) {
        return;
    }

    this
        .setRangeStyle(rangeStyle)
        .on('rangein', function(child?: any) {
            var rangeStyle = this.rangeStyle;
            var styleSave = GetPartialData(child.style, rangeStyle);
            if (IsKeyValueEqual(rangeStyle, styleSave)) {
                return;
            }

            child.styleSave = styleSave;
            child.modifyStyle(rangeStyle);
        }, this)
        .on('rangeout', function(child?: any) {
            if (!child.styleSave) {
                return;
            }

            child.modifyStyle(child.styleSave);
            child.styleSave = undefined;
        }, this)
}

export default RegisterRangeStyle;