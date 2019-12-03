```
# filter to monitor opened rooms
room-filter/
    <roomID>
        filter -  close/open + "|" + public/private/...
        name - The display name of the room.


# header of room, write by owner of room. Each room has unique roomID.
# read it when joining the room
room-metadata/
    <roomID>
        name - The display name of the room.

        # monitor filter to catch room open/close event
        filter -  close/open + "|" + public/private/...

        # moderators of this room
        moderators/
            <userID> - userName 

        # join permission
        permission - null("anyone")/("black-list")/("white-list")
        black-list/
            <userID> - userName
        white-list/
            <userID> - userName
        # ignore room if user can not join

        maxPeers - The maximum number of peers that can join this room.
        # limit the amount of users

        extra/

# body of room data. Each room has unique roomID.
rooms/
    <roomID>
        alive - true or null

        # users in this room.
        users/
            <joinAt>
                ID - The id of the user.
                # monitor ID == null for "user kicked-out"
                name - The name of the user.

        <"channel-"+channel_name> - custom channel


# write by each user, user could join to many rooms.
user-metadata\
    <joinAt>
        user/
            ID - The id of the user.
            name - The display name of the user.
        room/
            ID - The id of the room
            name - The display name of the room.
```