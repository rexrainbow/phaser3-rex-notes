import CreateRoom from './CreateRoom.js';
import CreateRandomRoom from './CreateRandomRoom.js';
import JoinRoom from './JoinRoom.js';
import JoinRandomRoom from './JoinRandomRoom.js';
import LeaveRoom from './LeaveRoom.js';
import RemoveRoom from './RemoveRoom.js';
import GetUserList from './GetUserList.js';
import KickUser from './KickUser.js';
import IsRoomOpened from './IsRoomOpened.js';
import GetRefMethods from './GetRefMethods.js';

var Methods = {
    createRoom: CreateRoom,
    createRandomRoom: CreateRandomRoom,
    joinRoom: JoinRoom,
    joinRandomRoom: JoinRandomRoom,
    leaveRoom: LeaveRoom,
    removeRoom: RemoveRoom,
    getUserList: GetUserList,
    kickUser: KickUser,
    isRoomOpened: IsRoomOpened
}

Object.assign(
    Methods,
    GetRefMethods
);

export default Methods;