/*
Elements:
    ```
    HHH
    LCR
    LFR
    ```
*/

import {
    GetAddHeaderConfig,
    GetAddLeftSideConfig, GetAddContentConfig, GetAddRightSideConfig,
    GetAddFooterConfig,
    GetAddContainerConfig
} from './GetAddChildConfig';
import CreatExpandContainer from './CreatExpandContainer';

var LayoutMode0 = function(config?: any) {
    var scene = this.scene;

    // Add Header
    var header = config.header;
    if (header?: any) {
        this.add(header, GetAddHeaderConfig(config));
    }

    /*
    L C R
    L F R
    */    
    var bodySizer0 = CreatExpandContainer(scene, 0);
    this.add(bodySizer0, GetAddContainerConfig(config));

    // Add Left-side
    var leftSide = config.leftSide;
    if (leftSide?: any) {
        bodySizer0.add(leftSide, GetAddLeftSideConfig(config));
    }

    /*
    C

    F
    */    
    var bodySizer1 = CreatExpandContainer(scene, 1);
    bodySizer0.add(bodySizer1, GetAddContainerConfig(config));

    // Add content
    var content = config.content;
    if (content?: any) {
        bodySizer1.add(content, GetAddContentConfig(config));
    }

    // Add Footer
    var footer = config.footer;
    if (footer?: any) {
        bodySizer1.add(footer, GetAddFooterConfig(config));
    }

    // Add Right-side
    var rightSide = config.rightSide;
    if (rightSide?: any) {
        bodySizer0.add(rightSide, GetAddRightSideConfig(config));
    }

}

export default LayoutMode0;