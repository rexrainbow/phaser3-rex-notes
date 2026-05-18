import RemovePenMethods from './RemovePenMethods';
import AddTextPens from './AddTextPens';
import SetTextPens from './SetTextPens';
import RunWordWrap from './runwordwrap/RunWordWrap';
import RunVerticalWrap from './runverticalwrap/RunVerticalWrap';

var Methods = {
    addTextPens: AddTextPens,
    setTextPens: SetTextPens,
    runWordWrap: RunWordWrap,
    runVerticalWrap: RunVerticalWrap,
}

Object.assign(
    Methods,
    RemovePenMethods
);

export default Methods;