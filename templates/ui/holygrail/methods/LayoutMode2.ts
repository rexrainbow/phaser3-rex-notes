/*
Elements:
    ```
    HHH
    LCR
    FFR
    ```
*/

import {
    GetAddHeaderConfig,
    GetAddLeftSideConfig, GetAddContentConfig, GetAddRightSideConfig,
    GetAddFooterConfig,
    GetAddContainerConfig
} from './GetAddChildConfig';
import CreatExpandContainer from './CreatExpandContainer';

var LayoutMode2 = function(config?: any) {
    var scene = this.scene;

    // Add Header
    var header = config.header;
    if (header?: any) {
        this.add(header, GetAddHeaderConfig(config));
    }

    /*
    LC R
    FF R
    */
    var bodySizer0 = CreatExpandContainer(scene, 0);
    this.add(bodySizer0, GetAddContainerConfig(config));

    /*
    LC

    FF
    */
    var bodySizer1 = CreatExpandContainer(scene, 1);
    bodySizer0.add(bodySizer1, GetAddContainerConfig(config));

    /*
    L C
    */
    var bodySizer2 = CreatExpandContainer(scene, 0);
    bodySizer1.add(bodySizer2, GetAddContainerConfig(config));

    // Add Left-side
    var leftSide = config.leftSide;
    if (leftSide?: any) {
        bodySizer2.add(leftSide, GetAddLeftSideConfig(config));
    }

    // Add content
    var content = config.content;
    if (content?: any) {
        bodySizer2.add(content, GetAddContentConfig(config));
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

export default LayoutMode2;