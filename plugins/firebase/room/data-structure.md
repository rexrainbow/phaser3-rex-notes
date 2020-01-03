```
# filter to monitor opened rooms
room-filters/
    <roomID>
        filter -  open/closed + "|" + public/private/...
        name - The display name of the room


# header of room, write by owner of room. Each room has unique roomID.
# read it when joining the room
room-metadata/
    <roomID>
        name - The display name of the room

        # monitor filter to catch room open/closed event
        filter -  open/closed + "|" + public/private/...

        # moderators of this room
        moderators/
            <userID> - Unique ID of user 

        # join permission
        permission - null("anyone")/("black-list")/("white-list")
        black-list/
            <userID> - Unique ID of user
        white-list/
            <userID> - Unique ID of user
        # ignore room if user can not join

        maxUsers - The maximum number of users that can join this room.
        # limit the amount of users

        extra/

# body of room data. Each room has unique roomID
rooms/
    <roomID>
        alive - true or null

        # users in this room.
        users/
            <joinAt>
                userID - Unique ID of user
                userName - The name of the user

        <"channel-"+channel_name> - custom channel


# write by each user, user could join to many rooms
user-metadata\
    <joinAt>
        user/
            ID - Unique ID of user
            name - The display name of the user
        room/
            ID - The id of the room
            name - The display name of the room
```