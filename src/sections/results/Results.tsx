import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FiArrowLeft, FiArrowRight, FiAward, FiX, FiZoomIn } from "react-icons/fi"

const imageModules = import.meta.glob("../../assets/abituriyent/*.{jpg,jpeg,png,webp,PNG,JPG}", {
    eager: true,
    import: "default"
}) as Record<string, string>

const Results = () => {
    const AUTOPLAY_MS = 3800
    const { t } = useTranslation()
    const sliderRef = useRef<HTMLDivElement | null>(null)
    const rafRef = useRef<number | null>(null)
    const dragRafRef = useRef<number | null>(null)
    const wasDraggingRef = useRef(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [autoplayTick, setAutoplayTick] = useState(0)
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    const dragStateRef = useRef({
        isPointerDown: false,
        isDragging: false,
        startX: 0,
        startScrollLeft: 0,
        targetScrollLeft: 0,
        velocity: 0,
        lastClientX: 0,
        lastMoveTime: 0
    })

    const images = useMemo(() => {
        return Object.entries(imageModules)
            .sort(([a], [b]) => {
                const numA = parseInt(a.match(/img(\d+)/i)?.[1] ?? "0")
                const numB = parseInt(b.match(/img(\d+)/i)?.[1] ?? "0")
                return numA - numB
            })
            .map(([, src]) => src as string)
    }, [])

    const loopImages = useMemo(() => [...images, ...images, ...images], [images])
    const activeImageIndex = ((activeIndex % images.length) + images.length) % images.length

    const updateActiveCard = () => {
        const sliderEl = sliderRef.current
        if (!sliderEl) return
        const cards = sliderEl.querySelectorAll<HTMLElement>("[data-result-card='true']")
        if (cards.length === 0) return
        const viewportCenter = sliderEl.scrollLeft + sliderEl.clientWidth / 2
        let nearestIdx = 0
        let nearestDistance = Number.POSITIVE_INFINITY
        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + card.clientWidth / 2
            const distance = Math.abs(cardCenter - viewportCenter)
            if (distance < nearestDistance) {
                nearestDistance = distance
                nearestIdx = index
            }
        })
        setActiveIndex(nearestIdx)
    }

    const normalizeLoopPosition = () => {
        const sliderEl = sliderRef.current
        if (!sliderEl) return
        const segmentWidth = sliderEl.scrollWidth / 3
        if (segmentWidth === 0) return
        if (sliderEl.scrollLeft < segmentWidth * 0.35) {
            sliderEl.scrollLeft += segmentWidth
        } else if (sliderEl.scrollLeft > segmentWidth * 1.65) {
            sliderEl.scrollLeft -= segmentWidth
        }
    }

    useEffect(() => {
        const sliderEl = sliderRef.current
        if (!sliderEl) return
        const placeAtCenter = () => {
            const segmentWidth = sliderEl.scrollWidth / 3
            if (segmentWidth > 0) {
                sliderEl.scrollLeft = segmentWidth
                updateActiveCard()
            }
        }
        placeAtCenter()
        window.addEventListener("resize", placeAtCenter)
        return () => window.removeEventListener("resize", placeAtCenter)
    }, [loopImages.length])

    const getCardStep = () => {
        const sliderEl = sliderRef.current
        if (!sliderEl) return 0
        const firstCard = sliderEl.querySelector<HTMLElement>("[data-result-card='true']")
        if (!firstCard) return sliderEl.clientWidth * 0.8
        const gap = Number.parseFloat(window.getComputedStyle(sliderEl).columnGap || "0")
        return firstCard.offsetWidth + gap
    }

    const scrollSlider = (direction: "prev" | "next") => {
        const sliderEl = sliderRef.current
        if (!sliderEl) return
        const cardStep = getCardStep()
        const nextScroll = direction === "next" ? cardStep : -cardStep
        sliderEl.scrollBy({ left: nextScroll, behavior: "smooth" })
        window.setTimeout(() => {
            normalizeLoopPosition()
            updateActiveCard()
        }, 360)
    }

    const scrollToImage = (imageIndex: number) => {
        const sliderEl = sliderRef.current
        if (!sliderEl) return
        const segmentWidth = sliderEl.scrollWidth / 3
        const cardStep = getCardStep()
        if (segmentWidth === 0 || cardStep === 0) return
        const target = segmentWidth + imageIndex * cardStep
        sliderEl.scrollTo({ left: target, behavior: "smooth" })
        window.setTimeout(() => {
            normalizeLoopPosition()
            updateActiveCard()
        }, 420)
    }

    const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
        const sliderEl = sliderRef.current
        if (!sliderEl || event.pointerType !== "mouse" || event.button !== 0) return
        event.preventDefault()
        wasDraggingRef.current = false
        dragStateRef.current = {
            isPointerDown: true,
            isDragging: false,
            startX: event.clientX,
            startScrollLeft: sliderEl.scrollLeft,
            targetScrollLeft: sliderEl.scrollLeft,
            velocity: 0,
            lastClientX: event.clientX,
            lastMoveTime: performance.now()
        }
    }

    const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
        const sliderEl = sliderRef.current
        const ds = dragStateRef.current
        if (!sliderEl || !ds.isPointerDown || event.pointerType !== "mouse") return
        const deltaX = event.clientX - ds.startX
        const now = performance.now()
        if (!ds.isDragging && Math.abs(deltaX) < 14) return
        if (!ds.isDragging) {
            ds.isDragging = true
            wasDraggingRef.current = true
            setIsDragging(true)
        }
        const dt = Math.max(1, now - ds.lastMoveTime)
        const dx = event.clientX - ds.lastClientX
        ds.targetScrollLeft = ds.startScrollLeft - deltaX * 0.55
        ds.velocity = -(dx / dt) * 11
        ds.lastClientX = event.clientX
        ds.lastMoveTime = now
        if (!dragRafRef.current) {
            const smoothStep = () => {
                const current = sliderEl.scrollLeft
                const target = dragStateRef.current.targetScrollLeft
                const diff = target - current
                if (Math.abs(diff) < 0.4) {
                    sliderEl.scrollLeft = target
                    dragRafRef.current = null
                    return
                }
                sliderEl.scrollLeft = current + diff * 0.2
                dragRafRef.current = window.requestAnimationFrame(smoothStep)
            }
            dragRafRef.current = window.requestAnimationFrame(smoothStep)
        }
    }

    const onPointerEnd: React.PointerEventHandler<HTMLDivElement> = (event) => {
        const sliderEl = sliderRef.current
        const ds = dragStateRef.current
        if (!sliderEl || event.pointerType !== "mouse") return
        ds.isPointerDown = false
        ds.isDragging = false
        setIsDragging(false)
        if (dragRafRef.current) {
            window.cancelAnimationFrame(dragRafRef.current)
            dragRafRef.current = null
        }
        const releaseVelocity = ds.velocity
        let inertiaFrame: number | null = null
        const inertiaStep = () => {
            if (Math.abs(ds.velocity) < 0.2) {
                inertiaFrame = null
                normalizeLoopPosition()
                updateActiveCard()
                return
            }
            sliderEl.scrollLeft += ds.velocity
            ds.velocity *= 0.92
            inertiaFrame = window.requestAnimationFrame(inertiaStep)
        }
        if (Math.abs(releaseVelocity) > 0.2) {
            inertiaFrame = window.requestAnimationFrame(inertiaStep)
            window.setTimeout(() => {
                if (inertiaFrame) {
                    window.cancelAnimationFrame(inertiaFrame)
                    inertiaFrame = null
                }
                normalizeLoopPosition()
                updateActiveCard()
            }, 520)
        }
        normalizeLoopPosition()
        updateActiveCard()
    }

    useEffect(() => {
        const autoPlay = window.setInterval(() => {
            if (isDragging || isHovering || document.hidden) return
            scrollSlider("next")
            setAutoplayTick((prev) => prev + 1)
        }, AUTOPLAY_MS)
        return () => window.clearInterval(autoPlay)
    }, [isDragging, isHovering])

    useEffect(() => {
        return () => {
            if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
            if (dragRafRef.current) window.cancelAnimationFrame(dragRafRef.current)
        }
    }, [])

    const handleSliderScroll = () => {
        normalizeLoopPosition()
        if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
        rafRef.current = window.requestAnimationFrame(() => {
            updateActiveCard()
            rafRef.current = null
        })
    }

    const lightboxNext = () =>
        setLightboxIndex((idx) => (idx !== null ? (idx + 1) % images.length : null))
    const lightboxPrev = () =>
        setLightboxIndex((idx) =>
            idx !== null ? (idx - 1 + images.length) % images.length : null
        )

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return
            if (e.key === "Escape") setLightboxIndex(null)
            if (e.key === "ArrowRight") lightboxNext()
            if (e.key === "ArrowLeft") lightboxPrev()
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [lightboxIndex, images.length])

    const particles = useMemo(
        () =>
            Array.from({ length: 14 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: 3 + Math.random() * 5,
                duration: 5 + Math.random() * 7,
                delay: Math.random() * 4
            })),
        []
    )

    const stats = [
        { value: t("results.statStudents"), label: t("results.statStudentsLabel") },
        { value: t("results.statRate"), label: t("results.statRateLabel") },
        { value: t("results.statYears"), label: t("results.statYearsLabel") },
        { value: t("results.statUniversities"), label: t("results.statUniversitiesLabel") }
    ]

    return (
        <section
            id="results"
            className="relative overflow-hidden bg-linear-to-br from-violet-50 via-white to-purple-50 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950 md:py-28"
        >
            {/* ── Animated background ─────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    className="absolute -left-28 top-0 h-96 w-96 rounded-full bg-violet-300/25 blur-3xl dark:bg-violet-700/15"
                    animate={{ x: [0, 38, 0], y: [0, -28, 0], scale: [1, 1.14, 1] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl dark:bg-purple-700/12"
                    animate={{ x: [0, -30, 0], y: [0, 22, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                <motion.div
                    className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-300/15 blur-3xl dark:bg-fuchsia-800/10"
                    animate={{ x: [0, 18, 0], y: [0, 18, 0], scale: [1, 1.07, 1] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                {/* dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-violet-400)_1px,transparent_0)]/12 bg-size-[38px_38px] dark:bg-[radial-gradient(circle_at_1px_1px,var(--color-violet-300)_1px,transparent_0)]/6" />
                {/* particles */}
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-violet-400/50 dark:bg-violet-300/20"
                        style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
                        animate={{ y: [-12, 12, -12], opacity: [0.3, 0.85, 0.3] }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: p.delay
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* ── Header ──────────────────────────────────────── */}
                <motion.div
                    className="mb-10 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-violet-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-600 backdrop-blur-sm dark:border-violet-700/40 dark:bg-violet-900/30 dark:text-violet-300">
                        <FiAward className="h-3.5 w-3.5" />
                        {t("results.badge")}
                    </span>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white sm:text-4xl md:text-5xl">
                        {t("results.title")}
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 dark:text-slate-400">
                        {t("results.subtitle")}
                    </p>
                </motion.div>

                {/* ── Stats ────────────────────────────────────────── */}
                <motion.div
                    className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            className="group flex flex-col items-center rounded-2xl border border-violet-100/80 bg-white/70 px-4 py-5 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:border-violet-300/60 hover:shadow-md hover:shadow-violet-200/40 dark:border-violet-800/30 dark:bg-white/5 dark:hover:border-violet-600/40 dark:hover:shadow-violet-900/30"
                            whileHover={{ y: -3 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="text-2xl font-extrabold text-violet-600 dark:text-violet-400 sm:text-3xl">
                                {stat.value}
                            </span>
                            <span className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Slider wrapper ──────────────────────────────── */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Left arrow */}
                    <button
                        onClick={() => scrollSlider("prev")}
                        aria-label={t("results.prev")}
                        className="absolute -left-2 top-1/2 z-20 -translate-y-1/2 sm:-left-5"
                    >
                        <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-violet-500 to-violet-700 text-white shadow-lg shadow-violet-400/35 transition duration-200 hover:scale-110 hover:shadow-violet-500/55 dark:from-violet-600 dark:to-violet-900">
                            <FiArrowLeft className="h-5 w-5 drop-shadow" />
                        </span>
                    </button>

                    {/* Scroll track */}
                    <div
                        ref={sliderRef}
                        className="flex cursor-grab gap-4 overflow-x-auto pb-4 active:cursor-grabbing [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
                        style={{ scrollSnapType: "x mandatory" }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerEnd}
                        onPointerLeave={onPointerEnd}
                        onScroll={handleSliderScroll}
                    >
                        {loopImages.map((src, idx) => {
                            const isActive = idx === activeIndex
                            const realIdx = idx % images.length

                            return (
                                <motion.div
                                    key={`${idx}-${realIdx}`}
                                    data-result-card="true"
                                    className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-md"
                                    style={{
                                        scrollSnapAlign: "center",
                                        width: "clamp(180px, 26vw, 290px)"
                                    }}
                                    animate={{
                                        scale: isActive ? 1 : 0.92,
                                        opacity: isActive ? 1 : 0.65
                                    }}
                                    transition={{ duration: 0.35 }}
                                    onClick={() => {
                                        if (!wasDraggingRef.current) {
                                            setLightboxIndex(realIdx)
                                        }
                                        wasDraggingRef.current = false
                                    }}
                                >
                                    {/* Active ring glow */}
                                    <div
                                        className={`pointer-events-none absolute inset-0 z-10 rounded-2xl ring-2 transition duration-300 ${
                                            isActive
                                                ? "ring-violet-400/80 dark:ring-violet-500/70"
                                                : "ring-transparent"
                                        }`}
                                    />
                                    {/* Active top glow bar */}
                                    <div
                                        className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-1 rounded-t-2xl bg-linear-to-r from-violet-400 to-fuchsia-400 transition-opacity duration-300 ${
                                            isActive ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                    <img
                                        src={src}
                                        alt={`${t("results.imageAlt")} ${realIdx + 1}`}
                                        draggable={false}
                                        className="aspect-3/4 w-full select-none object-cover transition duration-500 group-hover:scale-[1.05]"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-violet-900/0 transition duration-300 group-hover:bg-violet-900/35">
                                        <span className="flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition duration-300 group-hover:scale-100">
                                            <FiZoomIn className="h-6 w-6 text-white drop-shadow-lg" />
                                        </span>
                                    </div>
                                    {/* Bottom gradient */}
                                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-black/50 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Right arrow */}
                    <button
                        onClick={() => scrollSlider("next")}
                        aria-label={t("results.next")}
                        className="absolute -right-2 top-1/2 z-20 -translate-y-1/2 sm:-right-5"
                    >
                        <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-violet-500 to-violet-700 text-white shadow-lg shadow-violet-400/35 transition duration-200 hover:scale-110 hover:shadow-violet-500/55 dark:from-violet-600 dark:to-violet-900">
                            <FiArrowRight className="h-5 w-5 drop-shadow" />
                        </span>
                    </button>
                </div>

                {/* ── Progress bar ─────────────────────────────────── */}
                <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-violet-100 dark:bg-slate-700/60">
                    <motion.div
                        key={autoplayTick}
                        className="absolute left-0 top-0 h-full rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500"
                        initial={{ width: "0%" }}
                        animate={{ width: isDragging || isHovering ? "0%" : "100%" }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                </div>

                {/* ── Dot indicators ───────────────────────────────── */}
                <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                scrollToImage(i)
                                setAutoplayTick((prev) => prev + 1)
                            }}
                            aria-label={`${t("results.imageAlt")} ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                activeImageIndex === i
                                    ? "w-7 bg-violet-500 dark:bg-violet-400"
                                    : "w-2 bg-slate-300 hover:bg-violet-300 dark:bg-slate-600 dark:hover:bg-violet-700"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* ── Lightbox ─────────────────────────────────────────── */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightboxIndex(null)}
                    >
                        {/* Close */}
                        <button
                            aria-label="Close"
                            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25"
                            onClick={() => setLightboxIndex(null)}
                        >
                            <FiX className="h-5 w-5" />
                        </button>

                        {/* Prev */}
                        <button
                            aria-label={t("results.prev")}
                            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 sm:left-6"
                            onClick={(e) => {
                                e.stopPropagation()
                                lightboxPrev()
                            }}
                        >
                            <FiArrowLeft className="h-6 w-6" />
                        </button>

                        {/* Image */}
                        <motion.img
                            key={lightboxIndex}
                            src={images[lightboxIndex]}
                            alt={`${t("results.imageAlt")} ${lightboxIndex + 1}`}
                            className="max-h-[85vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
                            initial={{ scale: 0.82, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.82, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Next */}
                        <button
                            aria-label={t("results.next")}
                            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 sm:right-6"
                            onClick={(e) => {
                                e.stopPropagation()
                                lightboxNext()
                            }}
                        >
                            <FiArrowRight className="h-6 w-6" />
                        </button>

                        {/* Counter */}
                        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white/80 backdrop-blur-sm">
                            {lightboxIndex + 1} / {images.length}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Results
