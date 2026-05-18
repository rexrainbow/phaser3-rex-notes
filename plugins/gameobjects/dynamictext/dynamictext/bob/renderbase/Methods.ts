import RenderMethods from './RenderMethods';
import Contains from './Contains';
import GetWorldPosition from './GetWorldPosition';

var Methods = {
    contains: Contains,
    getWorldPosition: GetWorldPosition,
}

Object.assign(
    Methods,
    RenderMethods
)

export default Methods;