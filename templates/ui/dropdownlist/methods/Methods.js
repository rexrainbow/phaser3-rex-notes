import ConfigurationMethods from './listpanel/ConfigurationMethods.js';
import OpenListPanel from './listpanel/OpenListPanel.js';
import CloseListPanel from './listpanel/CloseListPanel.js';
import ToggleListPanel from './listpanel/ToggleListPanel.js';
import EmitButtonClick from './EmitButtonClick.js';
import EmitButtonOver from './EmitButtonOver.js';
import FocusButtonMethods from './FocusButtonMethods.js';

var Methods = {
    openListPanel: OpenListPanel,
    closeListPanel: CloseListPanel,
    toggleListPanel: ToggleListPanel,
    emitButtonClick: EmitButtonClick,
    emitButtonOver: EmitButtonOver,
}

Object.assign(
    Methods,
    ConfigurationMethods,
    FocusButtonMethods,
);

export default Methods;

