import Parent from './Parent.js';
import AddChild from './AddChild.js';
import RemoveChild from './RemoveChild.js';
import ChildState from './ChildState.js';
import Transform from './Transform.js';
import Position from './Position.js';
import Rotation from './Rotation.js';
import Scale from './Scale.js';
import Visible from './Visible.js';
import Alpha from './Alpha.js';
import Active from './Active.js';
import ScrollFactor from './ScrollFactor.js';
import CameraFilter from './CameraFilter.js';
import Mask from './Mask.js';
import Depth from './Depth.js';
import Children from './Children.js';
import Tween from './Tween.js';
import P3Container from './P3Container.js';
import RenderLayer from './RenderLayer.js';
import RenderTexture from './RenderTexture.js';

import DrawBounds from './DrawBounds.js';
import ChangeOrigin from './ChangeOrigin.js';

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
    RenderLayer,
    RenderTexture,
);

export default methods;