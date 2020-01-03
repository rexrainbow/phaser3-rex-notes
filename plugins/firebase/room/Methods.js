import CreateRoom from './CreateRoom.js';
import CreateRandomRoom from './CreateRandomRoom.js';
import JoinRoom from './JoinRoom.js';
import JoinRandomRoom from './JoinRandomRoom.js';
import LeaveRoom from './LeaveRoom.js';
import RemoveRoom from './RemoveRoom.js';
import KickUser from './KickUser.js';
import IsRoomOpened from './IsRoomOpened.js';
import { ChangeRoomState, OpenRoom, CloseRoom } from './ChangeRoomState.js';
import GetUserList from './GetUserList.js';
import GetRoomList from './GetRoomList.js';
import GetRefMethods from './GetRefMethods.js';

var Methods = {
    createRoom: CreateRoom,
    createRandomRoom: CreateRandomRoom,
    joinRoom: JoinRoom,
    joinRandomRoom: JoinRandomRoom,
    leaveRoom: LeaveRoom,
    removeRoom: RemoveRoom,
    kickUser: KickUser,
    isRoomOpened: IsRoomOpened,
    changeRoomState: ChangeRoomState,
    openRoom: OpenRoom,
    closeRoom: CloseRoom,
    getUserList: GetUserList,
    getRoomList: GetRoomList
}

Object.assign(
    Methods,
    GetRefMethods
);

export default Methods;