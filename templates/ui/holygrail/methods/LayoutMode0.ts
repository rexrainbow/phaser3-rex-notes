/*
Elements:
    ```
    HHH
    LCR
    FFF
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
    */    
    var bodySizer = CreatExpandContainer(scene, 0);
    this.add(bodySizer, GetAddContainerConfig(config));

    // Add Left-side
    var leftSide = config.leftSide;
    if (leftSide?: any) {
        bodySizer.add(leftSide, GetAddLeftSideConfig(config));
    }

    // Add content
    var content = config.content;
    if (content?: any) {
        bodySizer.add(content, GetAddContentConfig(config));
    }

    // Add Right-side
    var rightSide = config.rightSide;
    if (rightSide?: any) {
        bodySizer.add(rightSide, GetAddRightSideConfig(config));
    }

    // Add Footer
    var footer = config.footer;
    if (footer?: any) {
        this.add(footer, GetAddFooterConfig(config));
    }
}

export default LayoutMode0;