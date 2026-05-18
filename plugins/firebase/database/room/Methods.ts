import CreateRoom from './CreateRoom';
import CreateRandomRoom from './CreateRandomRoom';
import JoinRoom from './JoinRoom';
import JoinRandomRoom from './JoinRandomRoom';
import LeaveRoom from './LeaveRoom';
import RemoveRoom from './RemoveRoom';
import KickUser from './KickUser';
import IsRoomOpened from './IsRoomOpened';
import { ChangeRoomState, OpenRoom, CloseRoom } from './ChangeRoomState';
import ChangeFilterData from './ChangeFilterData';
import ChangeUserName from './ChangeUserName';
import ChangeRoomName from './ChangeRoomName';
import GetUserList from './GetUserList';
import GetRoomList from './GetRoomList';
import HasRoom from './HasRoom';
import GetRefMethods from './GetRefMethods';

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
    changeFilterData: ChangeFilterData,
    changeUserName: ChangeUserName,
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