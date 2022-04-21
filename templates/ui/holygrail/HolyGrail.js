import Sizer from '../sizer/Sizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class HolyGrail extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.orientation = 1; // top-to-bottom
        // Create sizer
        super(scene, config);
        this.type = 'rexHolyGrail';

        // Add Background
        var background = GetValue(config, 'background', undefined);
        if (background) {
            this.addBackground(background);
        }

        // Add Header
        var header = GetValue(config, 'header', undefined);
        if (header) {
            var proportion = GetValue(config, 'proportion.header', 0);
            var align = GetValue(config, 'align.header', 'center');
            var padding = GetValue(config, 'space.header', undefined);
            if (typeof (padding) === 'number') {
                padding = { bottom: padding };
            }
            var expand = GetValue(config, 'expand.header', true);
            this.add(header,
                {
                    proportion: proportion,
                    align: align,
                    padding: padding,
                    expand: expand,
                }
            );
        }

        var bodySizer = new Sizer(scene, {
            orientation: 0 // left-to-right
        })
        this.add(bodySizer,
            {
                proportion: 1,
                align: 'center',
                padding: 0,
                expand: true,
            }
        );

        // Add Left-side
        var leftSide = GetValue(config, 'leftSide', undefined);
        if (leftSide) {
            var proportion = GetValue(config, 'proportion.leftSide', 0);
            var align = GetValue(config, 'align.leftSide', 'center');
            var padding = GetValue(config, 'space.leftSide', undefined);
            if (typeof (padding) === 'number') {
                padding = { right: padding };
            }
            var expand = GetValue(config, 'expand.leftSide', true);
            bodySizer.add(leftSide,
                {
                    proportion: proportion,
                    align: align,
                    padding: padding,
                    expand: expand,
                }
            );
        }

        // Add content
        var content = GetValue(config, 'content', undefined);
        if (content) {
            var proportion = GetValue(config, 'proportion.content', 1);
            var align = GetValue(config, 'align.content', 'center');
            var padding = GetValue(config, 'space.content', undefined);
            var expand = GetValue(config, 'expand.content', true);
            bodySizer.add(content,
                {
                    proportion: proportion,
                    align: align,
                    padding: padding,
                    expand: expand,
                }
            );
        }

        // Add Right-side
        var rightSide = GetValue(config, 'rightSide', undefined);
        if (rightSide) {
            var proportion = GetValue(config, 'proportion.rightSide', 0);
            var align = GetValue(config, 'align.rightSide', 'center');
            var padding = GetValue(config, 'space.rightSide', undefined);
            if (typeof (padding) === 'number') {
                padding = { left: padding };
            }
            var expand = GetValue(config, 'expand.rightSide', true);
            bodySizer.add(rightSide,
                {
                    proportion: proportion,
                    align: align,
                    padding: padding,
                    expand: expand,
                }
            );
        }

        // Add Footer
        var footer = GetValue(config, 'footer', undefined);
        if (footer) {
            var proportion = GetValue(config, 'proportion.footer', 0);
            var align = GetValue(config, 'align.footer', 'center');
            var padding = GetValue(config, 'space.footer', undefined);
            if (typeof (padding) === 'number') {
                padding = { top: padding };
            }
            var expand = GetValue(config, 'expand.footer', true);
            this.add(footer,
                {
                    proportion: proportion,
                    align: align,
                    padding: padding,
                    expand: expand,
                }
            );
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('header', header);
        this.addChildrenMap('leftSide', leftSide);
        this.addChildrenMap('content', content);
        this.addChildrenMap('rightSide', rightSide);
        this.addChildrenMap('footer', footer);
    }
}

export default HolyGrail;