import ResetDisplayContent from './ResetDisplayContent';
import Modal from './Modal';
import SetButtonIndexMethods from './SetButtonIndexMethods';

var Methods = {
    resetDisplayContent: ResetDisplayContent,
    modal: Modal,
}

Object.assign(
    Methods,
    SetButtonIndexMethods,
)

export default Methods;