import { useContext } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ThemeContext } from "../../context/theme/ThemeContext"
import darkHeroLogo from "../../assets/masterschool_logo.png"
import lightHeroLogo from "../../assets/masterschool_logo2.png"

const Hero = () => {

    const { t } = useTranslation()
    const themeContext = useContext(ThemeContext)

    const heroLogo = themeContext?.theme === "dark" ? darkHeroLogo : lightHeroLogo

    return (
        <section
            id="home"
            className="relative overflow-hidden bg-linear-to-br from-blue-200 via-white to-cyan-100 pb-14 pt-28 dark:from-black dark:via-slate-950 dark:to-slate-900 md:pb-20 md:pt-32"
        >
            <div className="pointer-events-none absolute inset-0 z-0">
                <motion.div
                    animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-14 -left-16 h-64 w-64 rounded-full bg-blue-400/45 blur-3xl dark:bg-blue-700/20"
                />
                <motion.div
                    animate={{ x: [0, -24, 0], y: [0, 16, 0] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 right-0 h-72 w-72 rounded-full bg-cyan-300/45 blur-3xl dark:bg-sky-700/15"
                />
                <motion.div
                    animate={{ x: [0, 18, 0], y: [0, 10, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl dark:bg-slate-700/20"
                />
                <motion.div
                    animate={{ x: [0, -14, 0], y: [0, 14, 0] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 right-1/4 h-44 w-44 rounded-full bg-sky-200/40 blur-3xl dark:bg-blue-900/25"
                />
                {[...Array(12)].map((_, idx) => (
                    <motion.span
                        key={`hero-particle-${idx}`}
                        animate={{ y: [0, -16, 0], opacity: [0.25, 0.7, 0.25] }}
                        transition={{ duration: 4.5 + idx * 0.35, repeat: Infinity, ease: "easeInOut", delay: idx * 0.15 }}
                        className="absolute block h-1.5 w-1.5 rounded-full bg-blue-400/45 dark:bg-cyan-400/30"
                        style={{ left: `${6 + idx * 7}%`, top: `${14 + (idx % 4) * 18}%` }}
                    />
                ))}
                <div className="absolute inset-0 bg-white/45 dark:bg-slate-950/45" />
            </div>
            <div className="container-custom grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 max-w-2xl"
                >
                    <span className="mb-5 inline-block rounded-full border border-blue-300 bg-blue-100 px-4 py-1 text-xs font-semibold tracking-wide text-blue-900 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
                        {t("hero.badge")}
                    </span>
                    <h1 className="text-3xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-4xl md:text-5xl">
                        {t("hero.title1")} <br />
                        <span className="bg-linear-to-r from-blue-700 to-sky-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">
                            {t("hero.title2")}
                        </span>
                    </h1>
                    <p className="mt-5 max-w-xl text-base text-slate-800 dark:text-slate-300 md:text-lg">
                        {t("hero.description")}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {[
                            t("hero.chipLanguages"),
                            t("hero.chipPractice"),
                            t("hero.chipCareer")
                        ].map((chip, index) => (
                            <motion.span
                                key={chip}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: 0.15 + index * 0.1 }}
                                whileHover={{ y: -2 }}
                                className="rounded-full border border-blue-300/70 bg-white/85 px-3 py-1 text-xs font-semibold text-blue-800 dark:border-blue-500/30 dark:bg-slate-900/80 dark:text-blue-300"
                            >
                                {chip}
                            </motion.span>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-blue-700 via-blue-600 to-sky-600 px-6 py-3 font-semibold text-white shadow-[0_12px_28px_-14px_rgba(37,99,235,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-800 hover:to-cyan-600 hover:shadow-[0_20px_35px_-15px_rgba(37,99,235,1)]"
                        >
                            {t("hero.apply")}
                        </a>
                        <a
                            href="#about"
                            className="inline-flex items-center justify-center rounded-xl border border-blue-400/70 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-blue-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                        >
                            {t("hero.more")}
                        </a>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 flex justify-center lg:justify-end"
                >
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full max-w-md rounded-3xl border border-blue-300/70 bg-white/95 p-6 shadow-[0_24px_56px_-24px_rgba(30,64,175,0.65)] backdrop-blur-sm transition duration-300 hover:shadow-[0_26px_62px_-18px_rgba(30,64,175,0.75)] dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-[0_20px_45px_-25px_rgba(2,6,23,1)]"
                    >
                        <img
                            src={heroLogo}
                            alt={t("hero.imageAlt")}
                            className="mx-auto w-full max-w-xs object-contain transition duration-300 hover:scale-105 md:max-w-sm"
                        />
                        <div className="mt-5 rounded-xl border border-blue-300/80 bg-blue-100 px-4 py-3 text-center text-sm font-semibold text-blue-900 dark:border-blue-500/35 dark:bg-blue-600/10 dark:text-blue-200">
                            {t("hero.slogan")}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero