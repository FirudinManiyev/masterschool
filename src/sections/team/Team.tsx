import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"

type TeamMember = {
    name: string
    roleIndex: number
    imageFile: string
}

const imageModules = import.meta.glob("../../assets/komanda/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default"
}) as Record<string, string>

const memberData: TeamMember[] = [
    { name: "Aytən Həşimova", roleIndex: 0, imageFile: "Aytən Həşimova.jpg" },
    { name: "Seymur Əliyev", roleIndex: 1, imageFile: "Seymur Əliyev.webp" },
    { name: "Nigar Abbasova", roleIndex: 2, imageFile: "Nigar Abbasova.jpg" },
    { name: "Tamerlan Aslanlı", roleIndex: 3, imageFile: "Tamerlan Aslanlı.webp" },
    { name: "Mehriban Hüseynli", roleIndex: 4, imageFile: "Mehriban Hüseynli.jpg" },
    { name: "Rəşad Kazımzadə", roleIndex: 5, imageFile: "Rəşad Kazımzadə.webp" },
    { name: "Xuraman Sultanova", roleIndex: 6, imageFile: "Xuraman Sultanova.webp" },
    { name: "Cavid Cəfərli", roleIndex: 0, imageFile: "Cavid Cəfərli.jpg" },
    { name: "Gülnar Əhmədova", roleIndex: 2, imageFile: "Gülnar Əhmədova.jpg" },
    { name: "Nişat Zülfüqarlı", roleIndex: 3, imageFile: "Nişat Zülfüqarlı.webp" }
]

const Team = () => {
    const AUTOPLAY_MS = 3600
    const { t } = useTranslation()
    const sliderRef = useRef<HTMLDivElement | null>(null)
    const rafRef = useRef<number | null>(null)
    const dragRafRef = useRef<number | null>(null)
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

    const fallbackImage = useMemo(() => {
        const firstImagePath = Object.keys(imageModules).sort()[0]
        return firstImagePath ? imageModules[firstImagePath] : ""
    }, [])

    const roles = t("team.roles", { returnObjects: true }) as string[]

    const members = memberData.map((member) => {
        const imagePath = `../../assets/komanda/${member.imageFile}`

        return {
            ...member,
            image: imageModules[imagePath] ?? fallbackImage,
            role: roles[member.roleIndex] ?? roles[0] ?? "Müəllim"
        }
    })

    const loopMembers = useMemo(() => [...members, ...members, ...members], [members])
    const activeMemberIndex = ((activeIndex % members.length) + members.length) % members.length

    const updateActiveCard = () => {
        const sliderEl = sliderRef.current

        if (!sliderEl) {
            return
        }

        const cards = sliderEl.querySelectorAll<HTMLElement>("[data-team-card='true']")

        if (cards.length === 0) {
            return
        }

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

        if (!sliderEl) {
            return
        }

        const segmentWidth = sliderEl.scrollWidth / 3

        if (segmentWidth === 0) {
            return
        }

        if (sliderEl.scrollLeft < segmentWidth * 0.35) {
            sliderEl.scrollLeft += segmentWidth
        } else if (sliderEl.scrollLeft > segmentWidth * 1.65) {
            sliderEl.scrollLeft -= segmentWidth
        }
    }

    useEffect(() => {
        const sliderEl = sliderRef.current

        if (!sliderEl) {
            return
        }

        const placeAtCenterSegment = () => {
            const segmentWidth = sliderEl.scrollWidth / 3

            if (segmentWidth > 0) {
                sliderEl.scrollLeft = segmentWidth
                updateActiveCard()
            }
        }

        placeAtCenterSegment()
        window.addEventListener("resize", placeAtCenterSegment)

        return () => {
            window.removeEventListener("resize", placeAtCenterSegment)
        }
    }, [loopMembers.length])

    const getCardStep = () => {
        const sliderEl = sliderRef.current

        if (!sliderEl) {
            return 0
        }

        const firstCard = sliderEl.querySelector<HTMLElement>("[data-team-card='true']")

        if (!firstCard) {
            return sliderEl.clientWidth * 0.8
        }

        const gap = Number.parseFloat(window.getComputedStyle(sliderEl).columnGap || "0")

        return firstCard.offsetWidth + gap
    }

    const scrollSlider = (direction: "prev" | "next") => {
        const sliderEl = sliderRef.current

        if (!sliderEl) {
            return
        }

        const cardStep = getCardStep()
        const nextScroll = direction === "next" ? cardStep : -cardStep

        sliderEl.scrollBy({ left: nextScroll, behavior: "smooth" })
        window.setTimeout(() => {
            normalizeLoopPosition()
            updateActiveCard()
        }, 360)
    }

    const scrollToMember = (memberIndex: number) => {
        const sliderEl = sliderRef.current

        if (!sliderEl) {
            return
        }

        const segmentWidth = sliderEl.scrollWidth / 3
        const cardStep = getCardStep()

        if (segmentWidth === 0 || cardStep === 0) {
            return
        }

        const target = segmentWidth + memberIndex * cardStep
        sliderEl.scrollTo({ left: target, behavior: "smooth" })

        window.setTimeout(() => {
            normalizeLoopPosition()
            updateActiveCard()
        }, 420)
    }

    useEffect(() => {
        const autoPlay = window.setInterval(() => {
            if (isDragging || isHovering || document.hidden) {
                return
            }

            scrollSlider("next")
            setAutoplayTick((prev) => prev + 1)
        }, AUTOPLAY_MS)

        return () => {
            window.clearInterval(autoPlay)
        }
    }, [isDragging, isHovering])

    useEffect(() => {
        return () => {
            if (rafRef.current) {
                window.cancelAnimationFrame(rafRef.current)
            }

            if (dragRafRef.current) {
                window.cancelAnimationFrame(dragRafRef.current)
            }
        }
    }, [])

    const handleSliderScroll = () => {
        normalizeLoopPosition()

        if (rafRef.current) {
            window.cancelAnimationFrame(rafRef.current)
        }

        rafRef.current = window.requestAnimationFrame(() => {
            updateActiveCard()
            rafRef.current = null
        })
    }

    const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
        const sliderEl = sliderRef.current

        if (!sliderEl) {
            return
        }

        if (event.pointerType !== "mouse" || event.button !== 0) {
            return
        }

        event.preventDefault()

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

        setIsDragging(true)
    }

    const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
        const sliderEl = sliderRef.current

        if (!sliderEl || !dragStateRef.current.isPointerDown || event.pointerType !== "mouse") {
            return
        }

        const deltaX = event.clientX - dragStateRef.current.startX
        const now = performance.now()

        if (!dragStateRef.current.isDragging && Math.abs(deltaX) < 14) {
            return
        }

        if (!dragStateRef.current.isDragging) {
            dragStateRef.current.isDragging = true
            setIsDragging(true)
        }

        const dragDistance = dragStateRef.current.startScrollLeft - deltaX * 0.55
        const dt = Math.max(1, now - dragStateRef.current.lastMoveTime)
        const dx = event.clientX - dragStateRef.current.lastClientX

        dragStateRef.current.targetScrollLeft = dragDistance
        dragStateRef.current.velocity = -(dx / dt) * 11
        dragStateRef.current.lastClientX = event.clientX
        dragStateRef.current.lastMoveTime = now

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

        if (!sliderEl || event.pointerType !== "mouse") {
            return
        }

        dragStateRef.current.isPointerDown = false
        dragStateRef.current.isDragging = false
        setIsDragging(false)

        if (dragRafRef.current) {
            window.cancelAnimationFrame(dragRafRef.current)
            dragRafRef.current = null
        }

        const releaseVelocity = dragStateRef.current.velocity
        let inertiaFrame: number | null = null

        const inertiaStep = () => {
            if (Math.abs(dragStateRef.current.velocity) < 0.2) {
                inertiaFrame = null
                normalizeLoopPosition()
                updateActiveCard()
                return
            }

            sliderEl.scrollLeft += dragStateRef.current.velocity
            dragStateRef.current.velocity *= 0.92
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

    return (
        <section
            id="team"
            className="relative overflow-hidden bg-linear-to-br from-slate-100 via-white to-emerald-50 py-18 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:py-24"
        >
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{ x: [0, -26, 0], y: [0, 18, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 right-10 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-800/20"
                />
                <motion.div
                    animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl dark:bg-cyan-900/20"
                />
                <motion.div
                    animate={{ x: [0, 20, 0], y: [0, 14, 0] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/3 h-60 w-60 rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-900/20"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(16,185,129,0.2),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(14,165,233,0.18),transparent_34%)] dark:bg-[radial-gradient(circle_at_12%_22%,rgba(5,150,105,0.2),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(6,182,212,0.16),transparent_34%)]" />

                {[...Array(12)].map((_, idx) => (
                    <motion.span
                        key={`team-particle-${idx}`}
                        animate={{ y: [0, -16, 0], opacity: [0.25, 0.75, 0.25] }}
                        transition={{ duration: 4 + idx * 0.3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.15 }}
                        className="absolute block h-1.5 w-1.5 rounded-full bg-emerald-400/45 dark:bg-teal-300/35"
                        style={{ left: `${6 + idx * 7.8}%`, top: `${16 + (idx % 4) * 18}%` }}
                    />
                ))}
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t("team.title")}</h2>
                    <p className="mt-4 text-base text-slate-600 dark:text-slate-300 md:text-lg">{t("team.subtitle")}</p>
                </motion.div>

                <div className="mt-10">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("team.dragHint")}</p>
                </div>

                <div className="relative mt-6">
                    <button
                        type="button"
                        onClick={() => scrollSlider("prev")}
                        className="group absolute top-1/2 left-0 z-20 hidden h-13 w-13 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-300/70 bg-linear-to-br from-white to-emerald-50 text-emerald-700 shadow-[0_18px_34px_-18px_rgba(16,185,129,0.95)] transition-all duration-300 hover:scale-110 hover:border-emerald-400 hover:shadow-[0_24px_42px_-16px_rgba(16,185,129,0.95)] dark:border-emerald-700/70 dark:bg-linear-to-br dark:from-slate-900 dark:to-emerald-950/70 dark:text-emerald-300 dark:hover:border-emerald-500 dark:hover:text-emerald-200 md:inline-flex"
                        aria-label={t("team.prev")}
                    >
                        <span className="absolute inset-0 rounded-full bg-emerald-400/0 transition group-hover:bg-emerald-400/15 dark:group-hover:bg-emerald-500/20" />
                        <FiArrowLeft size={21} className="relative" />
                    </button>

                    <button
                        type="button"
                        onClick={() => scrollSlider("next")}
                        className="group absolute top-1/2 right-0 z-20 hidden h-13 w-13 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-300/70 bg-linear-to-br from-white to-emerald-50 text-emerald-700 shadow-[0_18px_34px_-18px_rgba(16,185,129,0.95)] transition-all duration-300 hover:scale-110 hover:border-emerald-400 hover:shadow-[0_24px_42px_-16px_rgba(16,185,129,0.95)] dark:border-emerald-700/70 dark:bg-linear-to-br dark:from-slate-900 dark:to-emerald-950/70 dark:text-emerald-300 dark:hover:border-emerald-500 dark:hover:text-emerald-200 md:inline-flex"
                        aria-label={t("team.next")}
                    >
                        <span className="absolute inset-0 rounded-full bg-emerald-400/0 transition group-hover:bg-emerald-400/15 dark:group-hover:bg-emerald-500/20" />
                        <FiArrowRight size={21} className="relative" />
                    </button>

                    <div
                        ref={sliderRef}
                        onScroll={handleSliderScroll}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerEnd}
                        onPointerCancel={onPointerEnd}
                        className={`flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-3 select-none touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-16 lg:px-18 xl:px-24 ${isDragging ? "md:cursor-grabbing" : "md:cursor-grab"}`}
                    >
                        {loopMembers.map((member, index) => (
                            <motion.article
                                key={`${member.name}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: (index % members.length) * 0.05 }}
                                whileHover={{ y: -6 }}
                                data-team-card="true"
                                className={`group relative w-[84%] shrink-0 snap-center overflow-hidden rounded-3xl border bg-white/85 p-4 backdrop-blur-sm transition-all duration-500 sm:w-[58%] sm:p-5 md:w-[44%] lg:w-[calc((100%-2.5rem)/3)] ${index === activeIndex
                                    ? "z-10 scale-100 border-emerald-300/85 shadow-[0_22px_44px_-18px_rgba(16,185,129,0.6)] dark:border-emerald-600"
                                    : "z-0 md:scale-[0.95] border-slate-200/80 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.45)] dark:border-slate-700"
                                } dark:bg-slate-900/80`}
                            >
                                <div className="relative overflow-hidden rounded-2xl">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        loading="lazy"
                                        draggable={false}
                                        className={`h-72 w-full object-cover transition duration-500 sm:h-80 ${index === activeIndex ? "group-hover:scale-[1.05]" : "md:opacity-85"}`}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
                                </div>

                                <div className="absolute right-7 bottom-24 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                                    {t("team.badge")}
                                </div>

                                <div className="px-2 pb-2 pt-5">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                                    <p className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">{member.role}</p>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <div className="mx-auto mt-5 flex w-full max-w-xl flex-col items-center gap-3 px-2">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-100/80 dark:bg-emerald-900/45">
                            <motion.div
                                key={`${autoplayTick}-${activeMemberIndex}`}
                                initial={{ width: "0%" }}
                                animate={{ width: isDragging || isHovering ? "0%" : "100%" }}
                                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                                className="h-full rounded-full bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {members.map((member, idx) => (
                                <button
                                    key={`team-dot-${member.name}`}
                                    type="button"
                                    onClick={() => scrollToMember(idx)}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${activeMemberIndex === idx
                                        ? "w-7 bg-emerald-500 dark:bg-emerald-400"
                                        : "w-2.5 bg-slate-300 hover:bg-emerald-300 dark:bg-slate-700 dark:hover:bg-emerald-600"
                                    }`}
                                    aria-label={`${member.name} profilinə keç`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Team
