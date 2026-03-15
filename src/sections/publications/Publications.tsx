import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FiBookOpen, FiLayers } from "react-icons/fi"

type PublicationItem = {
    key: string
    image: string
    accent: string
}

import abituriyentImage from "../../assets/nesrler/az(abituriyent).webp"
import doktoranturaImage from "../../assets/nesrler/english(doktorantura).webp"
import magistrEnglishImage from "../../assets/nesrler/english(magistr).webp"
import inforImage from "../../assets/nesrler/infor2.webp"
import logicImage from "../../assets/nesrler/logic.webp"
import mentiqImage from "../../assets/nesrler/mentiq.webp"
import magistrRussianImage from "../../assets/nesrler/rus(magistr).webp"
import tarixImage from "../../assets/nesrler/tarix.webp"

const publicationItems: PublicationItem[] = [
    {
        key: "abituriyent",
        image: abituriyentImage,
        accent: "from-amber-100/70 via-white to-orange-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/40"
    },
    {
        key: "doktorantura",
        image: doktoranturaImage,
        accent: "from-sky-100/70 via-white to-cyan-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-sky-950/40"
    },
    {
        key: "magistrEnglish",
        image: magistrEnglishImage,
        accent: "from-emerald-100/70 via-white to-teal-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40"
    },
    {
        key: "informatika",
        image: inforImage,
        accent: "from-violet-100/70 via-white to-indigo-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-violet-950/40"
    },
    {
        key: "logic",
        image: logicImage,
        accent: "from-rose-100/70 via-white to-pink-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-rose-950/40"
    },
    {
        key: "mentiq",
        image: mentiqImage,
        accent: "from-cyan-100/70 via-white to-blue-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-cyan-950/40"
    },
    {
        key: "magistrRussian",
        image: magistrRussianImage,
        accent: "from-fuchsia-100/70 via-white to-purple-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-fuchsia-950/40"
    },
    {
        key: "tarix",
        image: tarixImage,
        accent: "from-lime-100/70 via-white to-emerald-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-lime-950/40"
    }
]

const Publications = () => {
    const { t } = useTranslation()

    return (
        <section
            id="publications"
            className="relative overflow-hidden bg-linear-to-br from-amber-50 via-white to-cyan-50 py-18 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 md:py-24"
        >
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{ x: [0, 26, 0], y: [0, -16, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-20 left-4 h-64 w-64 rounded-full bg-amber-300/35 blur-3xl dark:bg-amber-700/18"
                />
                <motion.div
                    animate={{ x: [0, -22, 0], y: [0, 18, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                    className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-300/28 blur-3xl dark:bg-cyan-800/15"
                />
                <motion.div
                    animate={{ x: [0, 16, 0], y: [0, 14, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute top-1/2 left-1/3 h-56 w-56 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-800/12"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(251,191,36,0.14),transparent_30%),radial-gradient(circle_at_84%_78%,rgba(34,211,238,0.14),transparent_32%)] dark:bg-[radial-gradient(circle_at_20%_18%,rgba(180,83,9,0.2),transparent_30%),radial-gradient(circle_at_84%_78%,rgba(8,145,178,0.18),transparent_32%)]" />

                {[...Array(12)].map((_, idx) => (
                    <motion.span
                        key={`publication-particle-${idx}`}
                        animate={{ y: [0, -16, 0], opacity: [0.25, 0.8, 0.25] }}
                        transition={{ duration: 4.2 + idx * 0.28, repeat: Infinity, ease: "easeInOut", delay: idx * 0.16 }}
                        className="absolute block h-1.5 w-1.5 rounded-full bg-amber-400/45 dark:bg-cyan-300/35"
                        style={{ left: `${6 + idx * 7.5}%`, top: `${14 + (idx % 4) * 18}%` }}
                    />
                ))}
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.55 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700 shadow-sm backdrop-blur-sm dark:border-amber-700/40 dark:bg-white/6 dark:text-amber-300">
                        <FiLayers className="h-3.5 w-3.5" />
                        {t("publications.badge")}
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                        {t("publications.title")}
                    </h2>
                    <p className="mt-4 text-base text-slate-600 dark:text-slate-300 md:text-lg">
                        {t("publications.subtitle")}
                    </p>
                </motion.div>

                <div className="mx-auto mt-12 grid max-w-7xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {publicationItems.map((item, index) => (
                        <motion.article
                            key={item.key}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, delay: index * 0.06 }}
                            whileHover={{ y: -8 }}
                            className={`group relative flex flex-col overflow-hidden rounded-4xl border border-white/60 bg-linear-to-br p-4 shadow-[0_14px_34px_-18px_rgba(15,23,42,0.24)] transition duration-300 hover:shadow-[0_22px_48px_-20px_rgba(8,145,178,0.35)] dark:border-slate-700/80 ${item.accent}`}
                        >
                            <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-3 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
                                <img
                                    src={item.image}
                                    alt={t(`publications.cards.${item.key}.alt`)}
                                    loading="lazy"
                                    className="aspect-4/5 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-[1.05]"
                                />

                                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-t from-slate-950/0 via-slate-950/0 to-white/0 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-cyan-950/10 dark:to-amber-950/8" />
                            </div>

                            <div className="mt-4 flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                                        {t(`publications.cards.${item.key}.category`)}
                                    </p>
                                    <h3 className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
                                        {t(`publications.cards.${item.key}.title`)}
                                    </h3>
                                </div>

                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/70 text-amber-600 shadow-sm backdrop-blur-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-amber-300 dark:group-hover:text-cyan-300">
                                    <FiBookOpen className="h-4.5 w-4.5" />
                                </span>
                            </div>

                            <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {t(`publications.cards.${item.key}.desc`)}
                            </p>

                            <div className="mt-auto border-t border-amber-100/70 pt-4 dark:border-slate-700/50">
                                <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/80 bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 backdrop-blur-sm dark:border-cyan-700/40 dark:bg-slate-900/70 dark:text-cyan-300">
                                    <FiBookOpen className="h-3 w-3 shrink-0" />
                                    {t("publications.cta")}
                                </div>
                            </div>

                            <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-amber-300/0 via-white/0 to-cyan-300/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-amber-500/0 dark:via-cyan-500/0 dark:to-cyan-400/8" />
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Publications