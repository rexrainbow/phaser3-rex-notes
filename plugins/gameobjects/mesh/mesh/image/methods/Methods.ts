import VertexMethods from './VertexMethods';
import DirtyFlagsMethods from './DirtyFlagsMethods';
import UpdateMethods from './UpdateMethods';
import TintMethods from './TintMethods';
import DebugMethods from './DebugMethods';
import PointMethods from './PointMethods';
import SetFaceInteractive from './setfaceinteractive/SetFaceInteractive';

var Methods = {
    setFaceInteractive: SetFaceInteractive
};

Object.assign(
    Methods,
    VertexMethods,
    DirtyFlagsMethods,
    UpdateMethods,
    TintMethods,
    DebugMethods,
    PointMethods,
)

export default Methods;