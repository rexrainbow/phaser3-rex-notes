import SetTextMethods from './SetTextMethods.js';
import UpdateText from './UpdateText.js';

var Methods = {
    updateText: UpdateText,
}

Object.assign(
    Methods,
    SetTextMethods,
)

export default Methods;