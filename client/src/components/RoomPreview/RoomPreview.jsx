import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faXmark } from '@fortawesome/free-solid-svg-icons';
import { rooms } from './roomConfig';
import { quadToMatrix3d, fitQuad, scaledQuad } from './quadTransform';
import styles from './RoomPreview.module.css';

// Parses the DB's "size" field ("100x80", meaning 100cm wide x 80cm tall -
// confirmed against real Shoshi/Jacob gallery records) into real cm. Returns
// null on anything that doesn't match, so callers without real dimension
// data (or a malformed one) fall back gracefully instead of throwing.
const parseSizeCm = size => {
    const match = typeof size === 'string' && size.match(/(\d+(?:\.\d+)?)\s*[x×X]\s*(\d+(?:\.\d+)?)/);
    return match ? { w: parseFloat(match[1]), h: parseFloat(match[2]) } : null;
};

// A generic mid-size painting, used only when no real size is available at
// all (e.g. the standalone room-showcase page, which draws from local demo
// images with no backing product record).
const FALLBACK_SIZE_CM = { w: 80, h: 60 };

// The box this renders into uses object-fit:contain purely as a rounding-
// error safety net, not as the real fit strategy - real product photos
// rarely crop pixel-perfect to the canvas edge (a sliver of mat/background,
// a declared size rounded to the nearest 5-10cm), so trusting the DB's
// width and height completely literally can leave the box's aspect ratio
// just off from the actual loaded image's, and *that* mismatch is what
// shows up as visible empty margin above/below (or side to side) the
// painting - confirmed against homepagefirst.jpg: declared 160x140
// (aspect 1.143) vs. its real 1024x817 pixels (aspect 1.253). This reshapes
// a target size to exactly match the real image's aspect ratio while
// preserving its area (rather than trusting either the declared width or
// height alone), so the box always exactly fits the image - zero
// letterboxing - while still landing close to the declared physical size.
const matchAspect = ({ w, h }, aspect) => {
    const matchedH = Math.sqrt((w * h) / aspect);
    return { w: matchedH * aspect, h: matchedH };
};

// Drops any painting into a handful of real room photos (kitchen/living
// room/bedroom), warped flush onto that room's wall via a CSS 3D transform -
// see quadTransform.js. Visitors swipe/drag between rooms, same interaction
// as the homepage's mobile artwork carousel, so it feels consistent with the
// rest of the site rather than like a bolted-on widget.
function RoomPreview({ image, alt, language, size }) {
    const trackRef = useRef(null);
    const wrapperRef = useRef(null);
    const modalPhotoRef = useRef(null);
    const dragState = useRef({ dragging: false, startX: 0, startScrollLeft: 0, moved: false });
    const [width, setWidth] = useState(0);
    const [modalWidth, setModalWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [paintingAspect, setPaintingAspect] = useState(null);
    // Real-world scale means a modest painting can render as a genuinely
    // tiny detail once the whole (multi-meter-wide) wall is squeezed into a
    // phone-width strip - accurate, but not "comfortable to look at" the way
    // the user asked for. Rather than fight that by inflating the inline
    // preview (which would misrepresent the actual scale), this lets anyone
    // tap through to a much bigger version of the same render for a closer
    // look, most useful on mobile but available everywhere.
    const [zoomOpen, setZoomOpen] = useState(false);

    // Doubles as the "has the painting actually loaded" gate below (nothing
    // renders until this is set) and, via fitQuad(), as the defensive
    // fallback sizing if a room is ever added without a calibrated
    // wallWidthCm - in that case this is at least what stops a tall/wide/
    // near-square painting from being stretched or cropped to fit the wall
    // rectangle exactly: the largest centered area that keeps its aspect
    // ratio intact, same as before real-world scale (scaledQuad, below) was
    // the normal path.
    useEffect(() => {
        let cancelled = false;
        setPaintingAspect(null);
        const img = new window.Image();
        img.onload = () => {
            if (!cancelled) setPaintingAspect(img.naturalWidth / img.naturalHeight);
        };
        img.src = image;
        return () => { cancelled = true; };
    }, [image]);

    // Slides are always width:100% of the wrapper, so one ResizeObserver on
    // the wrapper (rather than one per slide) is enough to know every
    // slide's live pixel width - each slide's height then follows from its
    // own room photo's aspect ratio (see roomConfig.js).
    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const observer = new ResizeObserver(entries => {
            setWidth(entries[0].contentRect.width);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Same idea as the wrapper's own ResizeObserver above, but for the
    // modal's photo, which renders at a different (larger) width than the
    // inline track - the modal only exists in the DOM while zoomOpen is
    // true, so this attaches/detaches with it rather than running always.
    useEffect(() => {
        if (!zoomOpen) return;
        const el = modalPhotoRef.current;
        if (!el) return;
        const observer = new ResizeObserver(entries => {
            setModalWidth(entries[0].contentRect.width);
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, [zoomOpen]);

    // Lets Escape close the zoom modal, same as clicking its backdrop/close
    // button - only listens while it's actually open.
    useEffect(() => {
        if (!zoomOpen) return;
        const handleKey = e => { if (e.key === 'Escape') setZoomOpen(false); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [zoomOpen]);

    // Highlights whichever room tab is currently scrolled into view, the
    // same way a native mobile gallery's dots track a swipe - derived
    // directly from scrollLeft rather than an IntersectionObserver, which
    // turned out not to reliably fire in this environment at all (confirmed:
    // scrollLeft genuinely moved to the tapped room, but the observer's
    // callback simply never ran, leaving the tab highlight and the
    // height-lock below both stuck on whichever room loaded first).
    useEffect(() => {
        const track = trackRef.current;
        if (!track || !width) return;
        const handleScroll = () => {
            const rtlSign = language === 'he' ? -1 : 1;
            const index = Math.round((track.scrollLeft * rtlSign) / track.clientWidth);
            setActiveIndex(Math.max(0, Math.min(rooms.length - 1, index)));
        };
        track.addEventListener('scroll', handleScroll, { passive: true });
        return () => track.removeEventListener('scroll', handleScroll);
    }, [width, language]);

    const scrollToIndex = index => {
        const track = trackRef.current;
        if (!track) return;
        // Set directly rather than waiting on the scroll listener above -
        // instant, and avoids depending on a 'scroll' event actually firing
        // for a same-pixel no-op scroll (tapping the already-active tab).
        setActiveIndex(index);
        // `behavior: 'smooth'` here silently no-ops in this RTL container
        // (confirmed: works fine with a positive/LTR target, but a negative
        // RTL scrollLeft target is simply ignored) - 'instant' avoids that
        // browser quirk entirely and snaps to the tapped room right away.
        track.scrollTo({ left: track.clientWidth * index * (language === 'he' ? -1 : 1), behavior: 'instant' });
    };

    // Same click-and-drag scrolling as the homepage carousel (native touch
    // scrolling already works for free on overflow-x:auto) - including the
    // same RTL scrollLeft sign flip, since this site's Hebrew layout inverts
    // which direction a positive scrollLeft actually moves the content.
    const handlePointerDown = e => {
        const el = trackRef.current;
        if (!el || e.pointerType === 'touch') return;
        dragState.current = { dragging: true, startX: e.clientX, startScrollLeft: el.scrollLeft, moved: false };
        try {
            el.setPointerCapture(e.pointerId);
        } catch {
            // Best-effort only - see HomePage.jsx's handlePointerDown for why this can throw.
        }
    };

    const handlePointerMove = e => {
        const el = trackRef.current;
        const state = dragState.current;
        if (!el || !state.dragging) return;
        const delta = e.clientX - state.startX;
        if (Math.abs(delta) > 3) state.moved = true;
        const rtlSign = language === 'he' ? -1 : 1;
        el.scrollLeft = state.startScrollLeft - delta * rtlSign;
    };

    const endDrag = () => {
        dragState.current.dragging = false;
        setTimeout(() => { dragState.current.moved = false; }, 0);
    };

    // The track holds all 3 rooms side by side (only one visible at a time
    // via horizontal scroll), so its own height would otherwise default to
    // whichever room photo is tallest - leaving a blank gap under every
    // shorter one. Locking it to just the active room's height (it's the
    // only one actually on screen) removes that gap entirely.
    const activeRoom = rooms[activeIndex];
    const trackHeight = width ? width * (activeRoom.naturalHeight / activeRoom.naturalWidth) : undefined;

    // Real cm when the caller has it (both product pages do, straight from
    // the DB's "size" field), otherwise the generic fallback - either way
    // then reshaped to the actual loaded image's aspect ratio (see
    // matchAspect above). Before the image has loaded, paintingAspect is
    // still null; the unmatched value computed here is harmless since
    // nothing renders it yet (see the paintingAspect && ... gate below).
    const declaredSizeCm = parseSizeCm(size) || FALLBACK_SIZE_CM;
    const sizeCm = paintingAspect ? matchAspect(declaredSizeCm, paintingAspect) : declaredSizeCm;

    // Shared by the inline track below and the zoom modal - same math, just
    // handed a different live-measured width, so "zoomed in" is genuinely
    // the same render at a bigger size rather than a separate approximation.
    const renderArt = (room, w) => {
        if (!(w > 0 && paintingAspect)) return null;
        const height = w * (room.naturalHeight / room.naturalWidth);
        const fullQuad = room.wall.map(([qx, qy]) => [qx * w, qy * height]);
        // Real physical scale (scaledQuad) whenever the room has a
        // calibrated wall width; fitQuad (old max-fill behavior) is only a
        // defensive fallback for a room added without one.
        const quad = room.wallWidthCm
            ? scaledQuad(fullQuad, sizeCm.w, sizeCm.h, room.wallWidthCm, room.hAnchor, room.vAnchor)
            : fitQuad(fullQuad, paintingAspect);
        const xs = quad.map(p => p[0]);
        const ys = quad.map(p => p[1]);
        const boundW = Math.max(...xs) - Math.min(...xs);
        const boundH = Math.max(...ys) - Math.min(...ys);
        return (
            <img
                src={image}
                alt={alt}
                draggable={false}
                className={styles['roomPreview-art']}
                style={{
                    width: boundW,
                    height: boundH,
                    transform: quadToMatrix3d(boundW, boundH, quad),
                }}
            />
        );
    };

    return (
        <div className={styles['roomPreview']} ref={wrapperRef}>
            <div className={styles['roomPreview-photoWrap']}>
                <div
                    className={styles['roomPreview-track']}
                    ref={trackRef}
                    style={{ height: trackHeight }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={endDrag}
                    onPointerLeave={endDrag}
                >
                    {rooms.map((room, index) => (
                        <div className={styles['roomPreview-slide']} data-index={index} key={room.id}>
                            <img src={room.src} alt="" className={styles['roomPreview-room']} draggable={false} />
                            {renderArt(room, width)}
                        </div>
                    ))}
                </div>
                {width > 0 && paintingAspect && (
                    <button
                        type="button"
                        className={styles['roomPreview-zoomBtn']}
                        onClick={() => setZoomOpen(true)}
                        aria-label={language === 'he' ? 'הגדלה' : 'View larger'}
                    >
                        <FontAwesomeIcon icon={faExpand} />
                    </button>
                )}
            </div>
            <div className={styles['roomPreview-tabs']}>
                {rooms.map((room, index) => (
                    <button
                        key={room.id}
                        className={`${styles['roomPreview-tab']} ${index === activeIndex ? styles['roomPreview-tab-active'] : ''}`}
                        onClick={() => scrollToIndex(index)}
                        type="button"
                    >
                        {room.label[language]}
                    </button>
                ))}
            </div>

            {zoomOpen && (
                <div className={styles['roomPreview-modal']} onClick={() => setZoomOpen(false)}>
                    <div className={styles['roomPreview-modalContent']} onClick={e => e.stopPropagation()}>
                        <button
                            type="button"
                            className={styles['roomPreview-modalClose']}
                            onClick={() => setZoomOpen(false)}
                            aria-label={language === 'he' ? 'סגירה' : 'Close'}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <div className={styles['roomPreview-modalPhoto']} ref={modalPhotoRef}>
                            <img src={activeRoom.src} alt="" className={styles['roomPreview-room']} draggable={false} />
                            {renderArt(activeRoom, modalWidth)}
                        </div>
                        <div className={styles['roomPreview-tabs']}>
                            {rooms.map((room, index) => (
                                <button
                                    key={room.id}
                                    className={`${styles['roomPreview-tab']} ${index === activeIndex ? styles['roomPreview-tab-active'] : ''}`}
                                    onClick={() => scrollToIndex(index)}
                                    type="button"
                                >
                                    {room.label[language]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RoomPreview;
