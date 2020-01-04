import CreateRoom from './CreateRoom.js';
import CreateRandomRoom from './CreateRandomRoom.js';
import JoinRoom from './JoinRoom.js';
import JoinRandomRoom from './JoinRandomRoom.js';
import LeaveRoom from './LeaveRoom.js';
import RemoveRoom from './RemoveRoom.js';
import KickUser from './KickUser.js';
import IsRoomOpened from './IsRoomOpened.js';
import { ChangeRoomState, OpenRoom, CloseRoom } from './ChangeRoomState.js';
import ChangeRoomName from './ChangeRoomName.js';
import GetUserList from './GetUserList.js';
import GetRoomList from './GetRoomList.js';
import HasRoom from './HasRoom.js';
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
    changeRoomName: ChangeRoomName,
    openRoom: OpenRoom,
    closeRoom: CloseRoom,
    getUserList: GetUserList,
    getRoomList: GetRoomList,
    hasRoom: HasRoom
}

Object.assign(
    Methods,
    GetRefMethods
);

export default Methods;