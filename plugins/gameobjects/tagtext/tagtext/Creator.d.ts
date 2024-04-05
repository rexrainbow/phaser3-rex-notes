import TagText from './TagText';

export default Creator;

declare namespace Creator {
    interface IConfig extends Phaser.Types.GameObjects.GameObjectConfig {
        text?: string,
        style?: TagText.TextStyle,
        padding?: Phaser.Types.GameObjects.Text.TextPadding,
        autoRound?: boolean
    }
}

declare function Creator(
    config?: Creator.IConfig,
    addToScene?: boolean,
): TagText;