import ControlPointsFactory from './controlpoints/Factory';
import CursorAtBoundsFactory from './cursoratbounds/Factory';
import FullWindowRectangleFactory from './fullwindowrectangle/Factory';
import LayerManagerFactory from './layermanager/Factory';
import MouseWhellToUpDownFactory from './mousewheeltoupdown/Factory';
import PinchFactory from './pinch/Factory';
import PropertiesPanelFactory from './propertiespanel/Factory';
import ShellFactory from './shell/Factory';

export default GameObjectShellPlugins;

declare class Factories {
    controlPoints: typeof ControlPointsFactory;
    cursorAtBounds: typeof CursorAtBoundsFactory;
    fullWindowRectangle: typeof FullWindowRectangleFactory;
    layerManager: typeof LayerManagerFactory;
    mouseWhellToUpDown: typeof MouseWhellToUpDownFactory;
    pinch: typeof PinchFactory;
    propertiesPanel: typeof PropertiesPanelFactory;
    shell: typeof ShellFactory;
}

declare class GameObjectShellPlugins {
    constructor(scene: Phaser.Scene);

    add: Factories;
}

import ControlPointsClass from './controlpoints/ControlPoints';
import CursorAtBoundsClass from './cursoratbounds/CursorAtBounds';
import FullWindowRectangleClass from './fullwindowrectangle/FullWindowRectangle';
import LayerManagerClass from './layermanager/LayerManager';
import MouseWhellToUpDownClass from './mousewheeltoupdown/MouseWheelToUpDown';
import PinchClass from './pinch/Pinch';
import PropertiesPanelClass from './propertiespanel/PropertiesPanel';
import ShellClass from './shell/Shell';

declare namespace GameObjectShellPlugins {
    type ControlPoints = ControlPointsClass;
    type CursorAtBounds = CursorAtBoundsClass;
    type FullWindowRectangle = FullWindowRectangleClass;
    type LayerManager = LayerManagerClass
    type MouseWhellToUpDown = MouseWhellToUpDownClass;
    type Pinch = PinchClass;
    type PropertiesPanel = PropertiesPanelClass;
    type Shell = ShellClass;
}