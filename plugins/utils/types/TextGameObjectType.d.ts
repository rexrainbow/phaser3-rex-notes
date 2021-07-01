import BBCodeText from "../../bbcodetext";
import TagText from "../../tagtext";

export type CanvasTextGameObjectType = Phaser.GameObjects.Text | BBCodeText | TagText;
export type TextGameObjectType = CanvasTextGameObjectType | Phaser.GameObjects.BitmapText | Phaser.GameObjects.DynamicBitmapText;