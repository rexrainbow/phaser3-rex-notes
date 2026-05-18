import CreateColorPicker from './CreateColorPicker';
import DropDown from '../../../dropdown/DropDown';

var OpenColorPicker = function() {
    if (this.colorPicker) {
        return;
    }

    // Layout it to get full height
    var colorPicker = CreateColorPicker.call(this).layout();

    var dropDownBehavior = new DropDown(colorPicker, {
        // Transition
        duration: {
            in: this.colorPickerEaseInDuration,
            out: this.colorPickerEaseOutDuration
        },
        transitIn: this.colorPickerTransitInCallback,
        transitOut: this.colorPickerTransitOutCallback,

        // Position
        expandDirection: this.colorPickerExpandDirection,

        alignTargetX: this,
        alignTargetY: this,

        bounds: this.colorPickerBounds,

        // Close condition
        touchOutsideClose: true,
    })
        .on('open', function() {
            // After popping up
            // Can click
            colorPicker.on('valuechange', function(value?: any) {
                this.setValue(value);
            }, this);
        }, this)

        .on('close', function() {
            this.colorPicker = undefined;
            this.dropDownBehavior = undefined;
        }, this)

    this.colorPicker = colorPicker;
    this.dropDownBehavior = dropDownBehavior;

    this.pin(colorPicker);

    return this;
}

export default OpenColorPicker;