/*
type: text
name:

text: 
fontFamily:
fontSize:
fontStyle:
color:
stroke:
strokeThickness:
shadow:
    offsetX:
    offsetY:
    color:
    blur:
    stroke:
    fill:
align:
padding:
    left:
    right:
    top:
    bottom:    
fixedWidth:
fixedHeight:
lineSpacing:
maxLines:
testString:
wordWrap:
    width:
    useAdvancedWrap:
*/

import GetConfig from './GetConfig.js';

const PhaserText = Phaser.GameObjects.Text;

var CreateText = function (scene, config, styles, customBuilders) {
    config = GetConfig(config, styles);

    var gameObjects = new PhaserText(scene, 0, 0, config.text, config);
    scene.add.existing(gameObjects);
    return gameObjects;
}

export default CreateText;