import ResetDisplayContent from './ResetDisplayContent.js';
import Modal from './Modal.js';
import SetButtonIndexMethods from './SetButtonIndexMethods.js';

var Methods = {
    resetDisplayContent: ResetDisplayContent,
    modal: Modal,
}

Object.assign(
    Methods,
    SetButtonIndexMethods,
)

export default Methods;