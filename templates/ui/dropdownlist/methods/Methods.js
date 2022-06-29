import ConfigListMethods from './listpanel/ConfigMethods.js';
import OpenListPanel from './listpanel/OpenListPanel.js';
import CloseListPanel from './listpanel/CloseListPanel.js';
import ToggleListPanel from './listpanel/ToggleListPanel.js';
import DelayCallMethods from './DelayCallMethods.js';

var Methods = {
    openListPanel: OpenListPanel,
    closeListPanel: CloseListPanel,
    toggleListPanel: ToggleListPanel,
}

Object.assign(
    Methods,
    ConfigListMethods,
    DelayCallMethods
);

export default Methods;

