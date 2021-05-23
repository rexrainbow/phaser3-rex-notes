import OverlapSizer from '../overlapsizer/OverlapSizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BadgeKeys = [
    'left-top', 'center-top', 'right-top',
    'left-center', 'center', 'right-center',
    'left-bottom', 'center-bottom', 'right-bottom',
];

class Badge extends OverlapSizer {
    constructor(scene, config) {
        // Create sizer  
        super(scene, config);
        this.type = 'rexBadge';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        if (background) {
            this.addBackground(background);
        }
        this.addChildrenMap('background', background);

        // Base item
        var main = GetValue(config, 'main', undefined);
        if (main) {
            this.add(main, {
                key: 'main',
                align: 'center',
                expand: false,
            })
        }
        this.addChildrenMap('main', main);

        // Badges
        for (var i = 0, cnt = BadgeKeys.length; i < cnt; i++) {
            var key = BadgeKeys[i];
            var badge = GetValue(config, key, undefined);
            if (badge) {
                this.add(badge, {
                    key: key,
                    align: key,
                    expand: false,
                })
            }
            this.addChildrenMap(key, badge);
        }
    }
}

export default Badge;