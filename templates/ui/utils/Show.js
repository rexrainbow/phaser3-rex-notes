import Hide from './Hide.js';

var Show = function (gameObject, shown) {
    if (shown === undefined) {
        shown = true;
    }
    Hide(gameObject, !shown);
}
export default Show;