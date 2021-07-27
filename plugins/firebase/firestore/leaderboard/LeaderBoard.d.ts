export default LeaderBoard;

declare namespace LeaderBoard {
    type TimeFiltersType = {
        day?: boolean, week?: boolean, month?: boolean, year?: boolean, all?: boolean,
    }

    type TimeFilterType = 'day' | 'd' | 'week' | 'w' | 'month' | 'm' | 'year' | 'y' | 'all' | 'a';

    interface IConfig {
        root?: string,
        timeFilters?: boolean | TimeFiltersType,
        timeFilterType?: TimeFilterType,
        pageItemCount?: number
        boardID?: string,
        tag?: string,
    }

    interface IRecord {
        userID: string; userName?: string;
        boardID?: string; tag?: string;

        score?: number;
        tagD?: string; tagW?: string; tagM?: string; tagY?: string; tagA?: string;
        scoreD?: number; scoreW?: number; scoreM?: number; scoreY?: number; scoreA?: number

        // Other properties
        [name: string]: any;
    }

    type RankResultType = {
        userID: string,
        rank: number
    }
}

declare class LeaderBoard {
    constructor(
        config?: LeaderBoard.IConfig
    );

    setUser(userID: string, userName?: string): this;

    setUser(
        config: { userID: string, userName?: string }
    ): this;

    setBoardID(boardID?: string): this;

    setTag(tag?: string): this;

    setTimeFilterType(type: LeaderBoard.TimeFilterType): this;

    post(
        score: number,
        extraData?: { [name: string]: any },
        timestamp?: number
    ): Promise<void>;

    getScore(
        userID?: string
    ): Promise<LeaderBoard.IRecord>;

    getRank(
        userID?: string
    ): Promise<LeaderBoard.RankResultType>;

    loadFirstPage(
    ): Promise<LeaderBoard.IRecord[]>;

    loadNextPage(
    ): Promise<LeaderBoard.IRecord[]>;

    loadPreviousPage(
    ): Promise<LeaderBoard.IRecord[]>;

    loadCurrentPage(
    ): Promise<LeaderBoard.IRecord[]>;

    readonly pageIndex: number;
    readonly isFirstPage: boolean;
    readonly isLastPage: boolean;

    deleteUserScore(
        userID?: string
    ): Promise<void>;

    deleteBoard(
        boardID?: string, tag?: string
    ): Promise<void>;

}