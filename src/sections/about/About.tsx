import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import aboutImage from "../../assets/haqqimizda.webp"

const About = () => {
    const { t } = useTranslation()

    return (
        <section
            id="about"
            className="relative overflow-hidden bg-linear-to-tr from-slate-100 via-cyan-50 to-white py-16 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950/40 md:py-24"
        >
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{ x: [0, 20, 0], y: [0, -14, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-10 top-10 h-52 w-52 rounded-full bg-blue-200/35 blur-3xl dark:bg-blue-700/15"
                />
                <motion.div
                    animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-200/35 blur-3xl dark:bg-cyan-800/10"
                />
                <motion.div
                    animate={{ x: [0, 14, 0], y: [0, -8, 0] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 right-1/4 h-44 w-44 rounded-full bg-indigo-200/35 blur-3xl dark:bg-indigo-900/15"
                />
                {[...Array(8)].map((_, idx) => (
                    <motion.span
                        key={`about-particle-${idx}`}
                        animate={{ y: [0, -14, 0], opacity: [0.25, 0.6, 0.25] }}
                        transition={{ duration: 4 + idx * 0.4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                        className="absolute block h-1.5 w-1.5 rounded-full bg-cyan-400/40 dark:bg-blue-400/30"
                        style={{ left: `${14 + idx * 10}%`, top: `${20 + (idx % 3) * 20}%` }}
                    />
                ))}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.1),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.1),transparent_30%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(8,145,178,0.1),transparent_30%)]" />
            </div>

            <div className="container-custom relative z-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ y: -4 }}
                    animate={{ y: [0, -4, 0] }}
                    style={{ willChange: "transform" }}
                    className="group relative overflow-hidden rounded-2xl border border-blue-200/50 bg-white shadow-[0_20px_50px_-20px_rgba(14,116,144,0.45)] dark:border-slate-700 dark:bg-slate-900"
                >
                    <div className="relative min-h-75 sm:min-h-85">
                        <img
                            src={aboutImage}
                            alt={t("about.imageAlt")}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 rounded-lg bg-white/85 px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur dark:bg-slate-900/70 dark:text-slate-100">
                            {t("about.cardCaption")}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.65, delay: 0.1 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl">
                        {t("about.title")}
                    </h2>

                    <p className="max-w-xl text-base leading-8 text-slate-700 dark:text-slate-300">
                        {t("about.description")}
                    </p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="h-1 w-28 origin-left rounded-full bg-linear-to-r from-blue-500 via-cyan-500 to-blue-300"
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <motion.div
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ duration: 0.25 }}
                            className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition dark:border-slate-700 dark:bg-slate-900"
                        >
                            <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{t("about.statResultValue")}</p>
                            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-300">{t("about.statResultLabel")}</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ duration: 0.25 }}
                            className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition dark:border-slate-700 dark:bg-slate-900"
                        >
                            <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{t("about.statTeacherValue")}</p>
                            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-300">{t("about.statTeacherLabel")}</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default About