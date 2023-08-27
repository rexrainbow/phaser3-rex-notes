import RenderMethods from './RenderMethods.js';
import Contains from './Contains.js';
import GetWorldPosition from './GetWorldPosition.js';
import ScrollTo from './ScrollTo.js';

var Methods = {
    contains: Contains,
    getWorldPosition: GetWorldPosition,
    scrollTo: ScrollTo,
}

Object.assign(
    Methods,
    RenderMethods
)

export default Methods;