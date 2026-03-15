import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FiArrowLeft, FiArrowRight, FiMapPin, FiGitBranch, FiPhone } from "react-icons/fi"

type BranchCard = {
    number: string
    nameKey: string
    addressKey: string
    accent: string
    dot: string
}

const branchCards: BranchCard[] = [
    {
        number: "01",
        nameKey: "branch1",
        addressKey: "branch1",
        accent: "from-orange-400 to-amber-500",
        dot: "bg-orange-400"
    },
    {
        number: "02",
        nameKey: "branch2",
        addressKey: "branch2",
        accent: "from-cyan-400 to-sky-500",
        dot: "bg-cyan-400"
    },
    {
        number: "03",
        nameKey: "branch3",
        addressKey: "branch3",
        accent: "from-emerald-400 to-teal-500",
        dot: "bg-emerald-400"
    },
    {
        number: "04",
        nameKey: "branch4",
        addressKey: "branch4",
        accent: "from-violet-400 to-purple-500",
        dot: "bg-violet-400"
    },
    {
        number: "05",
        nameKey: "branch5",
        addressKey: "branch5",
        accent: "from-rose-400 to-pink-500",
        dot: "bg-rose-400"
    }
]

const Branches = () => {
    const AUTOPLAY_MS = 3500
    const { t } = useTranslation()
    const sliderRef = useRef<HTMLDivElement | null>(null)
    const rafRef = useRef<number | null>(null)
    const dragRafRef = useRef<number | null>(null)
    const wasDraggingRef = useRef(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [autoplayTick, setAutoplayTick] = useState(0)

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

    const loopBranches = useMemo(() => [...branchCards, ...branchCards, ...branchCards], [])
    const activeBranchIndex =
        ((activeIndex % branchCards.length) + branchCards.length) % branchCards.length

    const updateActiveCard = () => {
        const sliderEl = sliderRef.current
        if (!sliderEl) return
        const cards = sliderEl.querySelectorAll<HTMLElement>("[data-branch-card='true']")
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
    }, [loopBranches.length])

    const getCardStep = () => {
        const sliderEl = sliderRef.current
        if (!sliderEl) return 0
        const firstCard = sliderEl.querySelector<HTMLElement>("[data-branch-card='true']")
        if (!firstCard) return sliderEl.clientWidth * 0.8
        const gap = Number.parseFloat(window.getComputedStyle(sliderEl).columnGap || "0")
        return firstCard.offsetWidth + gap
    }

    const scrollSlider = (direction: "prev" | "next") => {
        const sliderEl = sliderRef.current
        if (!sliderEl) return
        const cardStep = getCardStep()
        sliderEl.scrollBy({ left: direction === "next" ? cardStep : -cardStep, behavior: "smooth" })
        window.setTimeout(() => {
            normalizeLoopPosition()
            updateActiveCard()
        }, 360)
    }

    const scrollToBranch = (branchIndex: number) => {
        const sliderEl = sliderRef.current
        if (!sliderEl) return
        const segmentWidth = sliderEl.scrollWidth / 3
        const cardStep = getCardStep()
        if (segmentWidth === 0 || cardStep === 0) return
        sliderEl.scrollTo({ left: segmentWidth + branchIndex * cardStep, behavior: "smooth" })
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

    const particles = useMemo(
        () =>
            Array.from({ length: 14 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: 3 + Math.random() * 4,
                duration: 5 + Math.random() * 6,
                delay: Math.random() * 3
            })),
        []
    )

    return (
        <section
            id="branches"
            className="relative overflow-hidden bg-linear-to-br from-slate-100 via-white to-orange-50 py-20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:py-28"
        >
            {/* Animated background */}
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-orange-300/25 blur-3xl dark:bg-orange-700/14"
                    animate={{ x: [0, 28, 0], y: [0, -18, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -right-16 bottom-10 h-96 w-96 rounded-full bg-amber-300/22 blur-3xl dark:bg-amber-700/12"
                    animate={{ x: [0, -24, 0], y: [0, 20, 0], scale: [1, 1.12, 1] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />
                <motion.div
                    className="absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-rose-200/18 blur-3xl dark:bg-rose-800/10"
                    animate={{ x: [0, 18, 0], y: [0, 16, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-orange-400)_1px,transparent_0)]/8 bg-size-[40px_40px] dark:bg-[radial-gradient(circle_at_1px_1px,var(--color-orange-300)_1px,transparent_0)]/4" />
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-orange-400/40 dark:bg-orange-300/20"
                        style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
                        animate={{ y: [-10, 10, -10], opacity: [0.3, 0.85, 0.3] }}
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
                {/* Header */}
                <motion.div
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-600 backdrop-blur-sm dark:border-orange-700/40 dark:bg-orange-900/30 dark:text-orange-300">
                        <FiGitBranch className="h-3.5 w-3.5" />
                        {t("branches.badge")}
                    </span>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white sm:text-4xl md:text-5xl">
                        {t("branches.title")}
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-slate-500 dark:text-slate-400">
                        {t("branches.subtitle")}
                    </p>
                </motion.div>

                {/* Slider */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Left arrow */}
                    <button
                        onClick={() => scrollSlider("prev")}
                        aria-label={t("branches.prev")}
                        className="absolute -left-2 top-1/2 z-20 -translate-y-1/2 sm:-left-5"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-400/35 transition duration-200 hover:scale-110 hover:shadow-orange-500/55 dark:from-orange-600 dark:to-amber-800">
                            <FiArrowLeft className="h-5 w-5" />
                        </span>
                    </button>

                    {/* Track */}
                    <div
                        ref={sliderRef}
                        className="flex cursor-grab gap-5 overflow-x-auto pb-4 active:cursor-grabbing [scrollbar-width:none] [touch-action:pan-x] [&::-webkit-scrollbar]:hidden"
                        style={{ scrollSnapType: "x mandatory" }}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerEnd}
                        onPointerLeave={onPointerEnd}
                        onScroll={handleSliderScroll}
                    >
                        {loopBranches.map((branch, idx) => {
                            const isActive = idx === activeIndex
                            const realIdx = idx % branchCards.length

                            return (
                                <motion.div
                                    key={`${idx}-${realIdx}`}
                                    data-branch-card="true"
                                    className="group relative h-full shrink-0 select-none overflow-hidden rounded-3xl"
                                    style={{
                                        scrollSnapAlign: "center",
                                        width: "clamp(260px, 32vw, 360px)"
                                    }}
                                    animate={{
                                        scale: isActive ? 1 : 0.92,
                                        opacity: isActive ? 1 : 0.6
                                    }}
                                    transition={{ duration: 0.35 }}
                                >
                                    {/* Card body */}
                                    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_12px_36px_-16px_rgba(15,23,42,0.18)] transition duration-300 group-hover:shadow-[0_20px_48px_-18px_rgba(15,23,42,0.28)] dark:border-slate-700/60 dark:bg-slate-900">

                                        {/* Top gradient accent bar */}
                                        <div className={`h-1.5 w-full bg-linear-to-r ${branch.accent}`} />

                                        {/* Active ring */}
                                        <div
                                            className={`pointer-events-none absolute inset-0 rounded-3xl ring-2 transition duration-300 ${
                                                isActive
                                                    ? "ring-orange-400/70 dark:ring-orange-500/60"
                                                    : "ring-transparent"
                                            }`}
                                        />

                                        <div className="flex min-h-65 flex-1 flex-col p-7">
                                            {/* Top row: name + animated dot */}
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="text-2xl font-extrabold tracking-tight text-slate-800 transition duration-300 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                                                    {t(`branches.cards.${branch.nameKey}.name`)}
                                                </h3>
                                                {/* Animated dot */}
                                                <span className="relative mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center">
                                                    <span
                                                        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${branch.dot}`}
                                                    />
                                                    <span
                                                        className={`relative h-3 w-3 rounded-full ${branch.dot}`}
                                                    />
                                                </span>
                                            </div>

                                            {/* Phone */}
                                            <div className="mt-4 flex items-center gap-2.5">
                                                <FiPhone className="h-4 w-4 shrink-0 text-orange-400 dark:text-orange-300" />
                                                <a
                                                    href={`tel:${t(`branches.cards.${branch.nameKey}.phone`)}`}
                                                    className="text-sm font-semibold text-slate-700 transition duration-200 hover:text-orange-500 dark:text-slate-300 dark:hover:text-orange-400"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {t(`branches.cards.${branch.nameKey}.phone`)}
                                                </a>
                                            </div>

                                            {/* Divider */}
                                            <div
                                                className={`mt-3 h-0.5 w-10 rounded-full bg-linear-to-r transition-all duration-300 group-hover:w-16 ${branch.accent}`}
                                            />

                                            {/* Address */}
                                            <div className="mt-4 flex flex-1 items-start gap-2.5">
                                                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-400 dark:text-orange-300" />
                                                <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                                                    {t(`branches.cards.${branch.addressKey}.address`)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Hover glow overlay */}
                                        <div
                                            className={`pointer-events-none absolute inset-0 bg-linear-to-br ${branch.accent} rounded-3xl opacity-0 transition duration-500 group-hover:opacity-[0.05]`}
                                        />
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>

                    {/* Right arrow */}
                    <button
                        onClick={() => scrollSlider("next")}
                        aria-label={t("branches.next")}
                        className="absolute -right-2 top-1/2 z-20 -translate-y-1/2 sm:-right-5"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-400/35 transition duration-200 hover:scale-110 hover:shadow-orange-500/55 dark:from-orange-600 dark:to-amber-800">
                            <FiArrowRight className="h-5 w-5" />
                        </span>
                    </button>
                </div>

                {/* Progress bar */}
                <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-orange-100 dark:bg-slate-700/60">
                    <motion.div
                        key={autoplayTick}
                        className="absolute left-0 top-0 h-full rounded-full bg-linear-to-r from-orange-500 to-amber-500"
                        initial={{ width: "0%" }}
                        animate={{ width: isDragging || isHovering ? "0%" : "100%" }}
                        transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                </div>

                {/* Dot indicators */}
                <div className="mt-5 flex items-center justify-center gap-2">
                    {branchCards.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                scrollToBranch(i)
                                setAutoplayTick((prev) => prev + 1)
                            }}
                            aria-label={`${t("branches.badge")} ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                activeBranchIndex === i
                                    ? "w-7 bg-orange-500 dark:bg-orange-400"
                                    : "w-2 bg-slate-300 hover:bg-orange-300 dark:bg-slate-600 dark:hover:bg-orange-700"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Branches
