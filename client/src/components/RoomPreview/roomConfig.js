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
// the photo was shot at an angle). All three source photos are the same
// 1408x768 set (replacing an earlier mismatched batch), each shot straight
// on with no real perspective skew, so every `wall` below is a plain
// axis-aligned rectangle.
//
// `wallWidthCm` is the real-world width that wall zone's own bounding box
// represents - what lets scaledQuad (quadTransform.js) render a painting at
// its true physical scale instead of always blowing it up to fill the wall.
// Each is back-calculated from a recognizable object in that same photo,
// measured in pixels (via a ruler grid overlaid on the source image) against
// that object's typical real-world size - see each room's comment below.
export const rooms = [
    {
        id: 'livingroom',
        label: { he: 'סלון', en: 'Living Room' },
        src: livingRoom,
        naturalWidth: 1408,
        naturalHeight: 768,
        // Tightened in from the sofa on the left and the olive tree/curtain
        // on the right, and down to just above the console - a wider box
        // clipped into the vase's branches and the tree's top leaves. Slid
        // left-right (width/height untouched, so wallWidthCm below still
        // means exactly what it did) so the zone's own center lands on the
        // console's center (x~713.5px) rather than the wider open stretch
        // of wall to its right - hAnchor still defaults to 0.5 (centered
        // within this zone), so a painting now centers on the console.
        wall: [
            [0.269, 0.026], [0.745, 0.026],
            [0.745, 0.677], [0.269, 0.677],
        ],
        // The console runs ~427px wide (x500-927px in the 1408px-wide
        // photo); assuming a standard ~180cm sideboard gives ~2.37 px/cm.
        // Cross-checked against its own height (floor to top, ~153px,
        // assuming a ~65cm-tall piece) -> ~2.35 px/cm - consistent. The
        // wall zone's own bounding box is ~670px wide at that scale, so:
        // this number (and every other room's) is a settled, cross-checked
        // measurement - do not adjust it to nudge how big a painting looks;
        // use hAnchor/vAnchor (quadTransform.js) to reposition instead.
        wallWidthCm: 284,
    },
    {
        id: 'kitchen',
        label: { he: 'מטבח', en: 'Kitchen' },
        src: kitchen,
        naturalWidth: 1408,
        naturalHeight: 768,
        // The full backsplash-to-ceiling-beam wall above the counter run,
        // clear of the beams above and the counter clutter below.
        wall: [
            [0.099, 0.117], [0.959, 0.117],
            [0.959, 0.599], [0.099, 0.599],
        ],
        // Standard counter height (floor to countertop surface) is ~90cm -
        // a much more reliable reference than anything sitting on the
        // counter - and measures ~205px in the photo (floor at y~700,
        // countertop at y~495), so ~2.28 px/cm. The wall zone's own
        // bounding box is ~1210px wide at that scale, so: this number (and
        // every other room's) is a settled, cross-checked measurement - do
        // not adjust it to nudge how big a painting looks; use
        // hAnchor/vAnchor (quadTransform.js) to reposition instead.
        wallWidthCm: 531,
        // Centered (the default) put a lot of bare wall between the
        // painting and the counter below it, since this zone runs tall
        // (beams to backsplash) - biased up a bit so it hangs with more
        // clearance above the counter instead of floating mid-wall.
        vAnchor: 0.3,
    },
    {
        id: 'bedroom',
        label: { he: 'חדר שינה', en: 'Bedroom' },
        src: bedroom,
        naturalWidth: 1408,
        naturalHeight: 768,
        // The open wall between the window/curtain and the wardrobe, clear
        // of the ceiling beams above and the headboard below.
        wall: [
            [0.135, 0.091], [0.803, 0.091],
            [0.803, 0.534], [0.135, 0.534],
        ],
        // The headboard runs ~320px wide; assuming a standard queen frame
        // (~160cm) gives ~2.0 px/cm. Cross-checked against the nightstand
        // beside it (~110px -> ~55cm, a normal nightstand width) -
        // consistent. The wall zone's own bounding box is ~940px wide at
        // that scale, so: this number (and every other room's) is a
        // settled, cross-checked measurement - do not adjust it to nudge
        // how big a painting looks; use hAnchor/vAnchor (quadTransform.js)
        // to reposition instead.
        wallWidthCm: 470,
    },
];
