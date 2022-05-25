import CreateImage from './CreateImage.js';
import CreateText from './CreateText.js';
import CreateBBCodeText from './CreateBBCodeText.js';
import CreateRoundRectangle from './CreateRoundRectangle.js';
import CreateNinePatch from './CreateNinePatch.js';
import CreateNinePatch2 from './CreateNinePatch2.js';

import CreateSizer from './CreateSizer.js';
import CreateFixWidthSizer from './CreateFixwidthSizer.js';
import CreateGridSizer from './CreateGridSizer.js';
import CreateOverlapSizer from './CreateOverlapSizer.js';

import CreateButtons from './CreateButtons.js';
import CreateFixWidthButtons from './CreateFixWidthButtons.js';
import CreategGridButtons from './CreategGridButtons.js';

import CreateLabel from './CreateLabel.js';
import CreateBadgeLabel from './CreateBadgeLabel.js';
import CreateDialog from './CreateDialog.js';
import CreateTextBox from './CreateTextbox.js';
import CreateSlider from './CreateSlider.js';
import CreateTextArea from './CreateTextArea.js';

var Builders = {
    Image: CreateImage,
    Text: CreateText,
    BBCodeText: CreateBBCodeText,
    RoundRectangle: CreateRoundRectangle,
    Ninepatch: CreateNinePatch,
    Ninepatch2: CreateNinePatch2,

    Sizer: CreateSizer,
    FixWidthSizer: CreateFixWidthSizer,
    GridSizer: CreateGridSizer,
    OverlapSizer: CreateOverlapSizer,

    Buttons: CreateButtons,
    FixWidthButtons: CreateFixWidthButtons,
    GridButtons: CreategGridButtons,

    Label: CreateLabel,
    BadgeLabel: CreateBadgeLabel,
    Dialog: CreateDialog,
    TextBox: CreateTextBox,
    Slider: CreateSlider,
    TextArea: CreateTextArea,
};

/*
function(scene, data, styles, customBuilders) {
    return gameObject;
}
*/

export default Builders;