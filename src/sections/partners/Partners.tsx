import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

import bduImage from "../../assets/bdu.webp"
import unecImage from "../../assets/unec.webp"

const Partners = () => {
    const { t } = useTranslation()

    const partners = [
        {
            key: "bdu",
            image: bduImage,
            bg: "from-sky-100/80 via-white to-blue-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-sky-950/45"
        },
        {
            key: "unec",
            image: unecImage,
            bg: "from-emerald-100/70 via-white to-cyan-100/70 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/40"
        }
    ]

    return (
        <section
            id="partners"
            className="relative overflow-hidden bg-linear-to-br from-cyan-50 via-white to-sky-50 py-18 dark:from-slate-950 dark:via-slate-900 dark:to-black md:py-24"
        >
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, -14, 0] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-16 left-8 h-56 w-56 rounded-full bg-cyan-300/40 blur-3xl dark:bg-cyan-700/25"
                />
                <motion.div
                    animate={{ x: [0, -24, 0], y: [0, 16, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-300/35 blur-3xl dark:bg-blue-800/20"
                />
                <motion.div
                    animate={{ x: [0, 22, 0], y: [0, 12, 0] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/3 h-60 w-60 rounded-full bg-emerald-200/35 blur-3xl dark:bg-emerald-800/15"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_24%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_84%_82%,rgba(59,130,246,0.14),transparent_32%)] dark:bg-[radial-gradient(circle_at_15%_24%,rgba(14,116,144,0.24),transparent_30%),radial-gradient(circle_at_84%_82%,rgba(30,64,175,0.2),transparent_32%)]" />

                {[...Array(10)].map((_, idx) => (
                    <motion.span
                        key={`partners-particle-${idx}`}
                        animate={{ y: [0, -18, 0], opacity: [0.25, 0.75, 0.25] }}
                        transition={{ duration: 4 + idx * 0.35, repeat: Infinity, ease: "easeInOut", delay: idx * 0.22 }}
                        className="absolute block h-1.5 w-1.5 rounded-full bg-cyan-400/40 dark:bg-cyan-300/35"
                        style={{ left: `${8 + idx * 9}%`, top: `${16 + (idx % 4) * 16}%` }}
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
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{t("partners.title")}</h2>
                    <p className="mt-4 text-base text-slate-600 dark:text-slate-300 md:text-lg">{t("partners.subtitle")}</p>
                </motion.div>

                <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2 xl:max-w-4xl">
                    {partners.map((partner, index) => (
                        <motion.article
                            key={partner.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.45, delay: index * 0.08 }}
                            whileHover={{ y: -8 }}
                            className={`group relative mx-auto w-full max-w-xl overflow-hidden rounded-4xl border border-cyan-100/80 bg-linear-to-br p-5 shadow-[0_12px_36px_-20px_rgba(14,116,144,0.45)] transition duration-300 hover:shadow-[0_20px_42px_-18px_rgba(14,116,144,0.6)] dark:border-slate-700 sm:p-6 ${partner.bg}`}
                        >
                            <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-4 dark:border-slate-700 dark:bg-slate-900/70 sm:p-5">
                                <img
                                    src={partner.image}
                                    alt={t(`partners.cards.${partner.key}.alt`)}
                                    loading="lazy"
                                    className="h-28 w-full object-contain transition duration-500 group-hover:scale-[1.06] sm:h-32"
                                />
                            </div>

                            <div className="mt-4">
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white sm:text-2xl">
                                    {t(`partners.cards.${partner.key}.name`)}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-7">
                                    {t(`partners.cards.${partner.key}.desc`)}
                                </p>
                            </div>

                            <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-cyan-400/0 via-cyan-300/0 to-sky-300/0 opacity-0 transition-opacity duration-400 group-hover:opacity-100 dark:from-cyan-500/0 dark:via-cyan-400/5 dark:to-blue-500/8" />
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Partners
