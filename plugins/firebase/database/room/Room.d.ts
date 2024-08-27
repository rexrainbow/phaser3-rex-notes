import EventEmitter from '../../../utils/eventemitter/EventEmitter';
import ItemTable from '../itemtable/ItemTable';

export default Room;

declare namespace Room {
    interface ITableConfig {
        key: string,
        type?: ItemTable.TableType
    }

    interface IUserInfo {
        userID?: string,
        userName?: string
    }

    interface IConfig extends IUserInfo {
        root?: string,

        broadcast: boolean |
        {
            history?: number | boolean,
        },
        tables?: undefined | ITableConfig[],

        eventEmitter?: EventEmitter | false,
    }

    interface IRoomInfo {
        roomID?: string,
        roomName?: string,
    }

    type RoomStateType = 'open' | 'closed';

    interface IRoomData extends IRoomInfo {
        roomType?: string
    }

    interface IRoomConfig extends IRoomData {
        maxUsers?: number,
        presisted?: boolean,
        door?: RoomStateType,
        join?: boolean,
        filterData?: any
    }

    interface ICreateRandomRoomConfig extends IRoomConfig {
        digits?: number,
        candidates?: string,
        retry?: number,
    }

    interface IJoinRoomConfig {
        leftThenJoin?: boolean,
        roomID?: string,
    }

    interface IJoinRandomRoomConfig extends IJoinRoomConfig {
        roomType?: string,
        door?: RoomStateType,
    }
}

declare class Room {
    constructor(config?: Room.IConfig);

    setUser(
        userID: string, userName?: string
    ): this;

    setUser(
        config: { userID: string, userName?: string }
    ): this;

    userID: string;
    userName: string;
    readonly userInfo: Room.IUserInfo;

    getRoomInfo(
        roomID?: string,
        roomName?: string
    ): Room.IRoomInfo;

    isInRoom(roomID?: string): boolean;

    isFull(): boolean;

    isFirstUser(
        userID?: string
    ): boolean;

    getUsers(
    ): { userID: string, userName: string }[];

    readonly maxUsers: number;

    getTable(
        key: string
    ): ItemTable;

    createRoom(
        config?: Room.IRoomConfig
    ): Promise<Room.IRoomConfig>;

    createRandomRoom(
        config?: Room.ICreateRandomRoomConfig
    ): Promise<Room.IRoomConfig>;

    joinRoom(
        config?: Room.IJoinRoomConfig
    ): Promise<Room.IRoomData>;

    joinRandomRoom(
        config?: Room.IJoinRandomRoomConfig
    ): Promise<Room.IRoomData>;

    leaveRoom(
    ): Promise<Room.IRoomInfo>;

    removeRoom(
        roomID?: string
    ): Promise<Room.IRoomInfo>;

    kickUser(
        userID: string
    ): Promise<undefined | Room.IRoomInfo>;

    changeRoomState(
        roomID: string,
        roomState: Room.RoomStateType
    ): Promise<any>;

    changeFilterData(
        filterData: any
    ): Promise<any>;

    changeFilterData(
        roomID:string, 
        filterData: any
    ): Promise<any>;

    changeUserName(
        userName: string
    ): Promise<any>;

    changeRoomName(
        roomID: string,
        roomName: string
    ): Promise<any>;

    openRoom(
        roomID: string
    ): Promise<any>;

    closeRoom(
        roomID: string
    ): Promise<any>;

    getUserList(
    ): Room.IUserInfo[];

    getUserList(
        roomID: string
    ): Promise<Room.IUserInfo[]>;

    getRoomList(
        roomType?: string,
        roomState?: string
    ): Promise<Room.IRoomData[]>;

    hasRoom(
        roomID: string
    ): Promise<boolean>;
}