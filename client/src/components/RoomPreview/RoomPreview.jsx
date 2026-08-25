import React, { useEffect, useRef, useState } from 'react';
import { rooms } from './roomConfig';
import { quadToMatrix3d, fitQuad } from './quadTransform';
import styles from './RoomPreview.module.css';

// Drops any painting into a handful of real room photos (kitchen/living
// room/bedroom), warped flush onto that room's wall via a CSS 3D transform -
// see quadTransform.js. Visitors swipe/drag between rooms, same interaction
// as the homepage's mobile artwork carousel, so it feels consistent with the
// rest of the site rather than like a bolted-on widget.
function RoomPreview({ image, alt, language }) {
    const trackRef = useRef(null);
    const wrapperRef = useRef(null);
    const dragState = useRef({ dragging: false, startX: 0, startScrollLeft: 0, moved: false });
    const [width, setWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [paintingAspect, setPaintingAspect] = useState(null);

    // Paintings come in every shape - tall, wide, near-square - and each
    // room's wall area (roomConfig.js) is sized for its photo, not for any
    // one piece. Rather than stretch or crop every painting to fill that
    // exact rectangle (which badly distorts a shape that doesn't match),
    // its real aspect ratio is read once it loads, then fitQuad() finds the
    // largest centered area within the wall that keeps that ratio intact.
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

    return (
        <div className={styles['roomPreview']} ref={wrapperRef}>
            <div
                className={styles['roomPreview-track']}
                ref={trackRef}
                style={{ height: trackHeight }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerLeave={endDrag}
            >
                {rooms.map((room, index) => {
                    const height = width ? width * (room.naturalHeight / room.naturalWidth) : 0;
                    const fullQuad = room.wall.map(([qx, qy]) => [qx * width, qy * height]);
                    const quad = paintingAspect ? fitQuad(fullQuad, paintingAspect) : fullQuad;
                    const xs = quad.map(p => p[0]);
                    const ys = quad.map(p => p[1]);
                    const boundW = Math.max(...xs) - Math.min(...xs);
                    const boundH = Math.max(...ys) - Math.min(...ys);

                    return (
                        <div className={styles['roomPreview-slide']} data-index={index} key={room.id}>
                            <img src={room.src} alt="" className={styles['roomPreview-room']} draggable={false} />
                            {width > 0 && paintingAspect && (
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
                            )}
                        </div>
                    );
                })}
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
    );
}

export default RoomPreview;
