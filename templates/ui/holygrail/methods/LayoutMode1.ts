/*
Elements:
    ```
    HHH
    LCR
    LFF
    ```
*/

import {
    GetAddHeaderConfig,
    GetAddLeftSideConfig, GetAddContentConfig, GetAddRightSideConfig,
    GetAddFooterConfig,
    GetAddContainerConfig
} from './GetAddChildConfig';
import CreatExpandContainer from './CreatExpandContainer';

var LayoutMode1 = function(config?: any) {
    var scene = this.scene;

    // Add Header
    var header = config.header;
    if (header?: any) {
        this.add(header, GetAddHeaderConfig(config));
    }

    /*
    L CR
    L FF
    */
    var bodySizer0 = CreatExpandContainer(scene, 0);
    this.add(bodySizer0, GetAddContainerConfig(config));

    // Add Left-side
    var leftSide = config.leftSide;
    if (leftSide?: any) {
        bodySizer0.add(leftSide, GetAddLeftSideConfig(config));
    }

    /*
    CR

    FF
    */
    var bodySizer1 = CreatExpandContainer(scene, 1);
    bodySizer0.add(bodySizer1, GetAddContainerConfig(config));

    /*
    C R
    */
    var bodySizer2 = CreatExpandContainer(scene, 0);
    bodySizer1.add(bodySizer2, GetAddContainerConfig(config));

    // Add content
    var content = config.content;
    if (content?: any) {
        bodySizer2.add(content, GetAddContentConfig(config));
    }

    // Add Right-side
    var rightSide = config.rightSide;
    if (rightSide?: any) {
        bodySizer2.add(rightSide, GetAddRightSideConfig(config));
    }

    // Add Footer
    var footer = config.footer;
    if (footer?: any) {
        bodySizer1.add(footer, GetAddFooterConfig(config));
    }
}

export default LayoutMode1;