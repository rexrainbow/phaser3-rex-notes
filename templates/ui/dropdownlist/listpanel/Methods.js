import ConfigListMethods from './ConfigMethods.js';
import OpenListPanel from './OpenListPanel.js';
import CloseListPanel from './CloseListPanel.js';
import ToggleListPanel from './ToggleListPanel.js';

var Methods = {
    openListPanel: OpenListPanel,
    closeListPanel: CloseListPanel,
    toggleListPanel: ToggleListPanel,
}

Object.assign(
    Methods,
    ConfigListMethods
);

export default Methods;

