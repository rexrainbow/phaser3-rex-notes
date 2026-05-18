import ConfigurationMethods from './listpanel/ConfigurationMethods';
import OpenListPanel from './listpanel/OpenListPanel';
import CloseListPanel from './listpanel/CloseListPanel';
import ToggleListPanel from './listpanel/ToggleListPanel';
import EmitButtonClick from './EmitButtonClick';
import EmitButtonOver from './EmitButtonOver';
import FocusButtonMethods from './FocusButtonMethods';

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
