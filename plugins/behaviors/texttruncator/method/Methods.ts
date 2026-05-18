import SetTextMethods from './SetTextMethods';
import UpdateText from './UpdateText';

var Methods = {
    updateText: UpdateText,
}

Object.assign(
    Methods,
    SetTextMethods,
)

export default Methods;