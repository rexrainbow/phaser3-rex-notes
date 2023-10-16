import NameValueLabel from '../namevaluelabel/NameValueLabel';
import LevelCounter from '../../../plugins/levelcounter';

export default ExpBar;

declare namespace ExpBar {
    interface IConfig extends NameValueLabel.IConfig {
        easeDuration?: number,

        levelCounter?: LevelCounter.IConfig,

    }
}

declare class ExpBar extends NameValueLabel {
    constructor(
        scene: Phaser.Scene,
        config?: ExpBar.IConfig
    );

    exp: number;
    level: number;
    readonly requiredExp: number;

    setTotalEaseDuration(duration: number): this;

    setExpTable(table: LevelCounter.TableType): this;

    resetExp(exp: number): this;

    getExp(): number;
    getExp(level: number): number;

    getLevel(): number;
    getLevel(exp: number, level?: number): number;

    getRequiredExpToNextLevel(level?: number, exp?: number): number;

    gainExp(incExp: number): this;

    setExp(exp: number): this;

    setLevel(level: number): this;

}