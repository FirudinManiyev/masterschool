import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FiBookOpen, FiGlobe, FiShield, FiAward, FiSmile, FiClipboard, FiChevronRight } from "react-icons/fi"

const Services = () => {
    const { t } = useTranslation()

    const cards = [
        {
            icon: FiBookOpen,
            title: t("services.cards.0.title"),
            desc: t("services.cards.0.desc"),
            details: t("services.cards.0.details")
        },
        {
            icon: FiClipboard,
            title: t("services.cards.1.title"),
            desc: t("services.cards.1.desc"),
            details: t("services.cards.1.details")
        },
        {
            icon: FiShield,
            title: t("services.cards.2.title"),
            desc: t("services.cards.2.desc"),
            details: t("services.cards.2.details")
        },
        {
            icon: FiAward,
            title: t("services.cards.3.title"),
            desc: t("services.cards.3.desc"),
            details: t("services.cards.3.details")
        },
        {
            icon: FiGlobe,
            title: t("services.cards.4.title"),
            desc: t("services.cards.4.desc"),
            details: t("services.cards.4.details")
        },
        {
            icon: FiSmile,
            title: t("services.cards.5.title"),
            desc: t("services.cards.5.desc"),
            details: t("services.cards.5.details")
        }
    ]

    const cardThemes = [
        "from-blue-100/80 via-white to-cyan-100/60 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/40",
        "from-indigo-100/70 via-white to-sky-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40",
        "from-cyan-100/70 via-white to-emerald-100/60 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/35",
        "from-amber-100/60 via-white to-blue-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-sky-950/35",
        "from-sky-100/70 via-white to-blue-100/60 dark:from-slate-900 dark:via-slate-900 dark:to-blue-900/35",
        "from-violet-100/60 via-white to-cyan-100/60 dark:from-slate-900 dark:via-slate-900 dark:to-violet-950/35"
    ]

    return (
        <section
            id="services"
            className="relative overflow-hidden bg-linear-to-br from-sky-50 via-white to-cyan-50 py-18 dark:from-slate-950 dark:via-slate-900 dark:to-black md:py-24"
        >
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{ x: [0, 28, 0], y: [0, -12, 0] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-16 left-8 h-56 w-56 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-700/25"
                />
                <motion.div
                    animate={{ x: [0, -22, 0], y: [0, 14, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl dark:bg-cyan-800/20"
                />
                <motion.div
                    animate={{ x: [0, 18, 0], y: [0, 16, 0] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 left-1/3 h-60 w-60 rounded-full bg-indigo-200/35 blur-3xl dark:bg-indigo-800/15"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(56,189,248,0.18),transparent_26%),radial-gradient(circle_at_85%_80%,rgba(59,130,246,0.14),transparent_30%)] dark:bg-[radial-gradient(circle_at_15%_25%,rgba(37,99,235,0.22),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(8,145,178,0.16),transparent_32%)]" />

                {[...Array(10)].map((_, idx) => (
                    <motion.span
                        key={`bubble-${idx}`}
                        animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 4 + idx * 0.35, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                        className="absolute block h-1.5 w-1.5 rounded-full bg-blue-400/45 dark:bg-cyan-400/35"
                        style={{ left: `${8 + idx * 9}%`, top: `${18 + (idx % 4) * 16}%` }}
                    />
                ))}
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                        {t("services.title")}
                    </h2>
                    <p className="mt-4 text-base text-slate-600 dark:text-slate-300 md:text-lg">
                        {t("services.subtitle")}
                    </p>
                </motion.div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card, index) => {
                        const Icon = card.icon

                        return (
                            <motion.article
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: index * 0.06 }}
                                whileHover={{ y: -6 }}
                                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-blue-100/80 bg-linear-to-br shadow-[0_10px_30px_-20px_rgba(37,99,235,0.6)] transition-shadow duration-300 hover:shadow-[0_18px_38px_-18px_rgba(37,99,235,0.8)] dark:border-slate-700 md:min-h-85 ${cardThemes[index]}`}
                            >
                                {/* Ana məzmun */}
                                <div className="flex flex-1 flex-col p-8">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/40 dark:text-blue-300 dark:group-hover:bg-blue-500">
                                        <Icon size={26} />
                                    </div>

                                    <h3 className="mt-6 text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">
                                        {card.title}
                                    </h3>

                                    <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                                        {card.desc}
                                    </p>

                                    <div className="mt-auto pt-6">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all duration-300 group-hover:gap-3 dark:text-blue-400"
                                            aria-label={`${card.title} ${t("services.more")}`}
                                        >
                                            {t("services.more")}
                                            <FiChevronRight size={17} />
                                        </button>
                                    </div>
                                </div>

                                {/* Mobil: details həmişə görünür */}
                                <div className="border-t border-blue-100/80 px-8 pb-7 pt-4 dark:border-slate-700/60 md:hidden">
                                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                        {t("services.more")}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                        {card.details}
                                    </p>
                                </div>

                                {/* Desktop: hover paneli — tamamilə gizli, hover-da yuxarı qalxır */}
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full rounded-t-2xl border-t border-blue-200/70 bg-white/95 p-6 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 dark:border-blue-500/30 dark:bg-slate-900/95">
                                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                        {t("services.more")}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                                        {card.details}
                                    </p>
                                </div>
                            </motion.article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Services