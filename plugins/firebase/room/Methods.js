import CreateRoom from './CreateRoom.js';
import JoinRoom from './JoinRoom.js';
import JoinRandomRoom from './JoinRandomRoom.js';
import LeaveRoom from './LeaveRoom.js';
import RemoveRoom from './RemoveRoom.js';
import GetUserList from './GetUserList.js';
import KickUser from './KickUser.js';
import MonitorMyStateOn from './MonitorMyStateOn.js';
import MonitorMyStateOff from './MonitorMyStateOff.js';
import OnJoinRoom from './OnJoinRoom.js';
import OnLeftRoom from './OnLeftRoom.js';
import GetRefMethods from './GetRefMethods.js';

var Methods = {
    createRoom: CreateRoom,
    joinRoom: JoinRoom,
    joinRandomRoom: JoinRandomRoom,
    leaveRoom: LeaveRoom,
    removeRoom: RemoveRoom,
    getUserList: GetUserList,
    kickUser: KickUser,
    monitorMyStateOn: MonitorMyStateOn,
    MonitorMyStateOff: MonitorMyStateOff,
    onJoinRoom: OnJoinRoom,
    onLeftRoom: OnLeftRoom
}

Object.assign(
    Methods,
    GetRefMethods
);

export default Methods;