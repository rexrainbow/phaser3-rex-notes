import ResetDisplayContent from './ResetDisplayContent.js';
import ModalMethods from './ModalMethods.js';

var Methods = {
    resetDisplayContent: ResetDisplayContent,
}

Object.assign(
    Methods,
    ModalMethods,
)

export default Methods;