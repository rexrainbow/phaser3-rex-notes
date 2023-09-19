import ControlPointsFactory from './controlpoints/Factory';
import FullWindowRectangleFactory from './fullwindowrectangle/Factory';
import LayerManagerFactory from './layermanager/Factory';
import PropertiesPanelFactory from './propertiespanel/Factory';
import ShellFactory from './shell/Factory';

export default GameObjectShellPlugins;

declare class Factories {
    controlPoints: typeof ControlPointsFactory;
    fullWindowRectangle: typeof FullWindowRectangleFactory;
    layerManager: typeof LayerManagerFactory;
    propertiesPanel: typeof PropertiesPanelFactory;
    shell: typeof ShellFactory;
}

declare class GameObjectShellPlugins {
    constructor(scene: Phaser.Scene);

    add: Factories;
}

import ControlPointsClass from './controlpoints/ControlPoints';
import FullWindowRectangleClass from './fullwindowrectangle/FullWindowRectangle';
import LayerManagerClass from './layermanager/LayerManager';
import PropertiesPanelClass from './propertiespanel/PropertiesPanel';
import ShellClass from './shell/Shell';

declare namespace GameObjectShellPlugins {
    type ControlPoints = ControlPointsClass;
    type FullWindowRectangle = FullWindowRectangleClass;
    type LayerManager = LayerManagerClass
    type PropertiesPanel = PropertiesPanelClass;
    type Shell = ShellClass;
}