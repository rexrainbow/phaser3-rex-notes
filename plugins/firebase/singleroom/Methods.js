import JoinRoom from './JoinRoom.js';
import LeaveRoom from './LeaveRoom.js';
import KickUser from './KickUser.js';
import GetUserList from './GetUserList.js';
import GetRefMethods from './GetRefMethods.js';

var Methods = {
    joinRoom: JoinRoom,
    leaveRoom: LeaveRoom,
    kickUser: KickUser,
    getUserList: GetUserList
}

Object.assign(
    Methods,
    GetRefMethods
);

export default Methods;