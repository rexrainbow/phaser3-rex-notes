import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var textArea = this.rexUI.add.textArea({
            x: 400,
            y: 300,
            width: 400,
            height: 220,

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),

            // text: this.add.text(),
            text: this.rexUI.add.BBCodeText(),
            // textMask: false,

            slider: false,
            scroller: false
        })
            .layout()
            .setText(content);

        var tween = this.tweens.add({
            targets: textArea,
            t: '+=1',             // '+=100'
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 300 * textArea.linesCount,
            repeat: 0,            // -1: infinity
            yoyo: false
        });
    }

    update() { }
}

var content = `End-User License Agreement (EULA) of ABC

This End-User License Agreement ("EULA") is a legal agreement between you and DEF

This EULA agreement governs your acquisition and use of our ABC software ("Software") directly from DEF or indirectly through a DEF authorized reseller or distributor (a "Reseller").

Please read this EULA agreement carefully before completing the installation process and using the ABC software. It provides a license to use the ABC software and contains warranty information and liability disclaimers.

If you register for a free trial of the ABC software, this EULA agreement will also govern that trial. By clicking "accept" or installing and/or using the ABC software, you are confirming your acceptance of the Software and agreeing to become bound by the terms of this EULA agreement.

If you are entering into this EULA agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity and its affiliates to these terms and conditions. If you do not have such authority or if you do not agree with the terms and conditions of this EULA agreement, do not install or use the Software, and you must not accept this EULA agreement.

This EULA agreement shall apply only to the Software supplied by DEF herewith regardless of whether other software is referred to or described herein. The terms also apply to any DEF updates, supplements, Internet-based services, and support services for the Software, unless other terms accompany those items on delivery. If so, those terms apply. This EULA was created by EULA Template for ABC.
License Grant

DEF hereby grants you a personal, non-transferable, non-exclusive licence to use the ABC software on your devices in accordance with the terms of this EULA agreement.

You are permitted to load the ABC software (for example a PC, laptop, mobile or tablet) under your control. You are responsible for ensuring your device meets the minimum requirements of the ABC software.

You are not permitted to:

    Edit, alter, modify, adapt, translate or otherwise change the whole or any part of the Software nor permit the whole or any part of the Software to be combined with or become incorporated in any other software, nor decompile, disassemble or reverse engineer the Software or attempt to do any such things
    Reproduce, copy, distribute, resell or otherwise use the Software for any commercial purpose
    Allow any third party to use the Software on behalf of or for the benefit of any third party
    Use the Software in any way which breaches any applicable local, national or international law
    use the Software for any purpose that DEF considers is a breach of this EULA agreement

Intellectual Property and Ownership

DEF shall at all times retain ownership of the Software as originally downloaded by you and all subsequent downloads of the Software by you. The Software (and the copyright, and other intellectual property rights of whatever nature in the Software, including any modifications made thereto) are and shall remain the property of DEF.

DEF reserves the right to grant licences to use the Software to third parties.
Termination

This EULA agreement is effective from the date you first use the Software and shall continue until terminated. You may terminate it at any time upon written notice to DEF.

It will also terminate immediately if you fail to comply with any term of this EULA agreement. Upon such termination, the licenses granted by this EULA agreement will immediately terminate and you agree to stop all access and use of the Software. The provisions that by their nature continue and survive will survive any termination of this EULA agreement.
Governing Law

This EULA agreement, and any dispute arising out of or in connection with this EULA agreement, shall be governed by and construed in accordance with the laws of af.`;

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);