import Parent from './Parent';
import AddChild from './AddChild';
import RemoveChild from './RemoveChild';
import ChildState from './ChildState';
import Transform from './Transform';
import Position from './Position';
import Rotation from './Rotation';
import Scale from './Scale';
import Visible from './Visible';
import Alpha from './Alpha';
import Active from './Active';
import ScrollFactor from './ScrollFactor';
import CameraFilter from './CameraFilter';
import Mask from './Mask';
import Depth from './Depth';
import Children from './Children';
import Tween from './Tween';
import P3Container from './P3Container';
import RendererLayer from './RendererLayer';
import RenderTexture from './RenderTexture';

import DrawBounds from './DrawBounds';
import ChangeOrigin from './ChangeOrigin';

var methods = {
    changeOrigin: ChangeOrigin,
    drawBounds: DrawBounds,
};

Object.assign(
    methods,
    Parent,
    AddChild,
    RemoveChild,
    ChildState,
    Transform,
    Position,
    Rotation,
    Scale,
    Visible,
    Alpha,
    Active,
    ScrollFactor,
    CameraFilter,
    Mask,
    Depth,
    Children,
    Tween,
    P3Container,
    RendererLayer,
    RenderTexture,
);

export default methods;