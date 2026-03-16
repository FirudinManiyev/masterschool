import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiYoutube } from "react-icons/fi"

const Footer = () => {
    const { t } = useTranslation()
    const year = new Date().getFullYear()

    const quickLinks = [
        { key: "home", href: "#home" },
        { key: "about", href: "#about" },
        { key: "services", href: "#services" },
        { key: "team", href: "#team" },
        { key: "branches", href: "#branches" },
        { key: "contact", href: "#contact" },
    ]

    return (
        <footer
            id="footer"
            className="relative overflow-hidden border-t border-slate-200/70 bg-linear-to-br from-slate-100 via-white to-indigo-50 dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900"
        >
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{ x: [0, 26, 0], y: [0, -14, 0], scale: [1, 1.06, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-indigo-300/35 blur-3xl dark:bg-indigo-800/25"
                />
                <motion.div
                    animate={{ x: [0, -22, 0], y: [0, 16, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-900/20"
                />
                <motion.div
                    animate={{ x: [0, 20, 0], y: [0, 14, 0] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-900/20"
                />

                {[...Array(14)].map((_, idx) => (
                    <motion.span
                        key={`footer-particle-${idx}`}
                        animate={{ y: [0, -16, 0], opacity: [0.2, 0.7, 0.2] }}
                        transition={{ duration: 4.2 + idx * 0.28, repeat: Infinity, ease: "easeInOut", delay: idx * 0.14 }}
                        className="absolute block h-1.5 w-1.5 rounded-full bg-indigo-400/45 dark:bg-indigo-300/35"
                        style={{ left: `${6 + idx * 6.3}%`, top: `${12 + (idx % 4) * 18}%` }}
                    />
                ))}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(99,102,241,0.18),transparent_28%),radial-gradient(circle_at_88%_84%,rgba(6,182,212,0.16),transparent_32%)] dark:bg-[radial-gradient(circle_at_10%_18%,rgba(79,70,229,0.22),transparent_28%),radial-gradient(circle_at_88%_84%,rgba(14,116,144,0.2),transparent_32%)]" />
                <div className="absolute inset-0 bg-white/55 dark:bg-slate-950/58" />
            </div>

            <div className="container-custom relative z-10 py-16 md:py-18">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55 }}
                    className="grid gap-10 md:grid-cols-2 xl:grid-cols-3"
                >
                    <div>
                        <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                            MasterSchool
                        </h3>
                        <p className="mt-3 max-w-xs text-sm leading-7 text-slate-600 dark:text-slate-300">
                            {t("footer.description")}
                        </p>
                        <div className="mt-5 flex items-center gap-2">
                            <a
                                href="https://www.instagram.com/masterschool.az/"
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:border-pink-300 hover:text-pink-600 hover:shadow-[0_14px_28px_-14px_rgba(236,72,153,0.8)] dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-300 dark:hover:border-pink-500/60 dark:hover:text-pink-300 dark:hover:shadow-[0_14px_28px_-14px_rgba(190,24,93,0.9)]"
                                aria-label="Instagram"
                            >
                                <FiInstagram className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-120 group-hover:rotate-6" />
                            </a>
                            <a
                                href="https://www.facebook.com/MasterSchool.az/"
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:border-blue-300 hover:text-blue-600 hover:shadow-[0_14px_28px_-14px_rgba(59,130,246,0.8)] dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-300 dark:hover:border-blue-500/60 dark:hover:text-blue-300 dark:hover:shadow-[0_14px_28px_-14px_rgba(37,99,235,0.9)]"
                                aria-label="Facebook"
                            >
                                <FiFacebook className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-120 group-hover:rotate-6" />
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UCyp6IRNGWmB6ncX6nsLOZtw"
                                target="_blank"
                                rel="noreferrer"
                                className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 hover:border-rose-300 hover:text-rose-600 hover:shadow-[0_14px_28px_-14px_rgba(244,63,94,0.8)] dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-300 dark:hover:border-rose-500/60 dark:hover:text-rose-300 dark:hover:shadow-[0_14px_28px_-14px_rgba(225,29,72,0.9)]"
                                aria-label="YouTube"
                            >
                                <FiYoutube className="h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-120 group-hover:rotate-6" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-700 dark:text-slate-200">
                            {t("footer.quickLinks")}
                        </h4>
                        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:max-w-sm">
                            {quickLinks.map((link) => (
                                <li key={link.key}>
                                    <a
                                        href={link.href}
                                        className="group inline-flex items-center text-sm font-medium text-slate-600 transition-all duration-250 hover:translate-x-1 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
                                    >
                                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-indigo-400/70 transition-transform duration-250 group-hover:scale-140 group-hover:bg-indigo-500" />
                                        {t(`footer.links.${link.key}`)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-700 dark:text-slate-200">
                            {t("footer.contactTitle")}
                        </h4>
                        <div className="mt-4 space-y-3">
                            <a
                                href="tel:+994707103343"
                                className="group flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-[0_14px_28px_-18px_rgba(99,102,241,0.75)] dark:border-slate-700 dark:bg-slate-900/75 dark:hover:border-indigo-500/60 dark:hover:shadow-[0_14px_28px_-18px_rgba(79,70,229,0.8)]"
                            >
                                <FiPhone className="mt-0.5 h-4 w-4 text-indigo-500 transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-6 dark:text-indigo-300" />
                                <span className="text-sm text-slate-700 dark:text-slate-200">+994 70 710 33 43</span>
                            </a>
                            <a
                                href="mailto:info@masterschool.az"
                                className="group flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_14px_28px_-18px_rgba(6,182,212,0.75)] dark:border-slate-700 dark:bg-slate-900/75 dark:hover:border-cyan-500/60 dark:hover:shadow-[0_14px_28px_-18px_rgba(8,145,178,0.8)]"
                            >
                                <FiMail className="mt-0.5 h-4 w-4 text-cyan-500 transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-6 dark:text-cyan-300" />
                                <span className="text-sm text-slate-700 dark:text-slate-200">info@masterschool.az</span>
                            </a>
                            <div className="group flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_14px_28px_-18px_rgba(139,92,246,0.75)] dark:border-slate-700 dark:bg-slate-900/75 dark:hover:border-violet-500/60 dark:hover:shadow-[0_14px_28px_-18px_rgba(109,40,217,0.8)]">
                                <FiMapPin className="mt-0.5 h-4 w-4 text-violet-500 dark:text-violet-300" />
                                <span className="text-sm text-slate-700 dark:text-slate-200">{t("footer.address")}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-10 border-t border-slate-200/80 pt-6 text-center dark:border-slate-800">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {t("footer.copyright", { year })}
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
