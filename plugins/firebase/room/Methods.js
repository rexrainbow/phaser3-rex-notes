import CreateRoom from './CreateRoom.js';
import JoinRoom from './JoinRoom.js';
import JoinRandomRoom from './JoinRandomRoom.js';
import LeaveRoom from './LeaveRoom.js';
import RemoveRoom from './RemoveRoom.js';
import GetUserList from './GetUserList.js';
import KickUser from './KickUser.js';
import OnJoinRoom from './OnJoinRoom.js';
import OnLeftRoom from './OnLeftRoom.js';
import IsRoomOpened from './IsRoomOpened.js';
import GetRefMethods from './GetRefMethods.js';

var Methods = {
    createRoom: CreateRoom,
    joinRoom: JoinRoom,
    joinRandomRoom: JoinRandomRoom,
    leaveRoom: LeaveRoom,
    removeRoom: RemoveRoom,
    getUserList: GetUserList,
    kickUser: KickUser,
    onJoinRoom: OnJoinRoom,
    onLeftRoom: OnLeftRoom,
    isRoomOpened: IsRoomOpened
}

Object.assign(
    Methods,
    GetRefMethods
);

export default Methods;