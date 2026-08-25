import livingRoom from '../../images/rooms/room-livingroom.jpg';
import kitchen from '../../images/rooms/room-kitchen.jpg';
import bedroom from '../../images/rooms/room-bedroom.jpg';

// Each room's `naturalWidth`/`naturalHeight` are the photo's real pixel
// dimensions - used to reproduce its aspect ratio responsively (the slide is
// always rendered at width:100%, height:auto). `wall` is the blank wall area
// picked out by eye in that photo, as fractions (0-1) of the photo's own
// width/height so it stays correct at any render size - four corners in
// [topLeft, topRight, bottomRight, bottomLeft] order, matching the slight
// perspective of the actual wall (not a plain axis-aligned rectangle when
// the photo was shot at an angle).
export const rooms = [
    {
        id: 'livingroom',
        label: { he: 'סלון', en: 'Living Room' },
        src: livingRoom,
        naturalWidth: 1800,
        naturalHeight: 1012,
        // Generous, but with real margin at top and bottom - a painting
        // using the zone's full height was previously landing flush
        // against the sofa (fitQuad only ever shrinks to fit the zone, it
        // never adds its own breathing room, so the zone itself has to
        // leave that gap).
        wall: [
            [0.05, 0.04], [0.972, 0.04],
            [0.972, 0.642], [0.05, 0.642],
        ],
    },
    {
        id: 'kitchen',
        label: { he: 'מטבח', en: 'Kitchen' },
        src: kitchen,
        naturalWidth: 1800,
        naturalHeight: 1151,
        // Almost the entire frame is blank wall above a low shelf - about
        // as generous a canvas as a real photo gets, so any painting shape
        // can render at a genuinely large, realistic size.
        wall: [
            [0.017, 0.017], [0.983, 0.017],
            [0.983, 0.799], [0.017, 0.799],
        ],
    },
    {
        id: 'bedroom',
        label: { he: 'חדר שינה', en: 'Bedroom' },
        src: bedroom,
        naturalWidth: 1373,
        naturalHeight: 1218,
        // Same photo as before, cropped tighter at the bottom - the raw
        // version had a lot of empty floor/rug below the bed that just
        // made this room's slide far taller than living room/kitchen's for
        // no benefit (none of that floor is usable wall space anyway).
        // Centered over the headboard, well clear of the lamp/plant.
        wall: [
            [0.251, 0.016], [0.757, 0.016],
            [0.757, 0.575], [0.251, 0.575],
        ],
    },
];
