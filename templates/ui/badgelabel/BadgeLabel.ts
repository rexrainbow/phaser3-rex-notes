import OverlapSizer from '../overlapsizer/OverlapSizer';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const BadgeKeys = {
    leftTop: 'left-top', centerTop: 'center-top', rightTop: 'right-top',
    leftCenter: 'left-center', center: 'center', rightCenter: 'right-center',
    leftBottom: 'left-bottom', centerBottom: 'center-bottom', rightBottom: 'right-bottom'
}

class Badge extends OverlapSizer {
    add: any;
    addBackground: any;
    addChildrenMap: any;
    type: any;

    constructor(scene?: any, config?: any) {
        // Create sizer  
        super(scene, config);
        this.type = 'rexBadge';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        if (background?: any) {
            this.addBackground(background);
        }
        this.addChildrenMap('background', background);

        // Base item
        var main = GetValue(config, 'main', undefined);
        if (main?: any) {
            this.add(main, {
                key: 'main',
                align: 'center',
                expand: false,
            })
        }
        this.addChildrenMap('main', main);

        // Badges
        for (var key in BadgeKeys) {
            var badge = GetValue(config, key, undefined);
            if (badge?: any) {
                this.add(badge, {
                    key: key,
                    align: BadgeKeys[key],
                    expand: false,
                })
                this.addChildrenMap(key, badge);
            }            
        }
    }
}

export default Badge;