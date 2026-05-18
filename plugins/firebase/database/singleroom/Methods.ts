import JoinRoom from './JoinRoom';
import LeaveRoom from './LeaveRoom';
import KickUser from './KickUser';
import ChangeUserName from './ChangeUserName';
import GetUserList from './GetUserList';
import GetRefMethods from './GetRefMethods';

var Methods = {
    joinRoom: JoinRoom,
    leaveRoom: LeaveRoom,
    kickUser: KickUser,
    changeUserName: ChangeUserName,
    getUserList: GetUserList
}

Object.assign(
    Methods,
    GetRefMethods
);

export default Methods;