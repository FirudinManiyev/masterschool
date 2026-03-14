import { useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import { AnimatePresence, motion } from "framer-motion"
import { FiMoon, FiSun, FiChevronDown, FiMenu, FiX } from "react-icons/fi"
import { ThemeContext } from "../../../context/theme/ThemeContext"
import logoImage from "../../../assets/masterschool_logo.png"

const Navbar = () => {

    const { t, i18n } = useTranslation()
    const themeContext = useContext(ThemeContext)

    const [menuOpen, setMenuOpen] = useState(false)
    const [langOpen, setLangOpen] = useState(false)

    if (!themeContext) return null

    const { toggleTheme, theme } = themeContext

    const languages = ["az", "en", "ru"]

    const changeLang = (lng: string) => {
        i18n.changeLanguage(lng)
        setLangOpen(false)
        setMenuOpen(false)
    }

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
            <div className="container-custom flex h-20 items-center justify-between">
                <a href="#home" className="flex items-center gap-3" aria-label="MasterSchool home">
                    <img
                        src={logoImage}
                        alt="MasterSchool Logo"
                        className="h-14 w-auto object-contain md:h-16"
                    />
                    <span className="hidden text-xl font-extrabold leading-none tracking-tight md:block">
                        <span className="text-slate-900 dark:text-white">Master</span>
                        <span className="text-blue-600">School</span>
                    </span>
                </a>

                <nav className="hidden items-center gap-9 text-base font-semibold text-slate-700 dark:text-slate-200 lg:flex">
                    <a href="#home" className="nav-link">{t("navbar.home")}</a>
                    <a href="#about" className="nav-link">{t("navbar.about")}</a>
                    <a href="#services" className="nav-link">{t("navbar.services")}</a>
                    <a href="#team" className="nav-link">{t("navbar.team")}</a>
                    <a href="#faq" className="nav-link">{t("navbar.faq")}</a>
                </nav>

                <div className="flex items-center gap-2 md:gap-3">
                    <a
                        href="#contact"
                        className="group hidden overflow-hidden rounded-xl bg-linear-to-r from-blue-600 via-blue-500 to-sky-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_12px_28px_-12px_rgba(37,99,235,0.95)] transition-all duration-300 hover:-translate-y-1 hover:from-blue-700 hover:via-blue-600 hover:to-sky-600 hover:shadow-[0_20px_35px_-12px_rgba(37,99,235,1)] active:translate-y-0 md:inline-flex"
                    >
                        <span className="transition-transform duration-300 group-hover:scale-105 group-hover:tracking-wide">{t("navbar.contact")}</span>
                    </a>

                    <div className="relative">
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="group flex items-center gap-1 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:bg-slate-800"
                            aria-label="Change language"
                        >
                            {i18n.language.toUpperCase()}
                            <FiChevronDown size={16} className={`transition-transform duration-300 ${langOpen ? "rotate-180" : "group-hover:translate-y-0.5"}`} />
                        </button>
                        {langOpen && (
                            <div className="absolute right-0 mt-2 w-28 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                                {languages.map((lng) => (
                                    <button
                                        key={lng}
                                        onClick={() => changeLang(lng)}
                                        className="block w-full px-3 py-2 text-left text-sm font-medium uppercase text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
                                    >
                                        {lng}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="group rounded-xl border border-slate-200 bg-white/80 p-2.5 text-lg text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:bg-slate-800"
                        aria-label="Toggle color theme"
                    >
                        <span className="block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                            {theme === "dark" ? <FiSun /> : <FiMoon />}
                        </span>
                    </button>

                    <button
                        className="text-2xl text-slate-700 dark:text-slate-200 lg:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <motion.span
                            initial={false}
                            animate={{ rotate: menuOpen ? 90 : 0, scale: menuOpen ? 1.06 : 1 }}
                            transition={{ duration: 0.2 }}
                            className="block"
                        >
                            {menuOpen ? <FiX /> : <FiMenu />}
                        </motion.span>
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className="overflow-hidden border-t border-slate-200 bg-white px-5 dark:border-slate-800 dark:bg-slate-950 lg:hidden"
                    >
                        <div className="container-custom flex flex-col gap-4 py-5 text-sm font-medium text-slate-700 dark:text-slate-200">
                            <a href="#home" onClick={() => setMenuOpen(false)}>{t("navbar.home")}</a>
                            <a href="#about" onClick={() => setMenuOpen(false)}>{t("navbar.about")}</a>
                            <a href="#services" onClick={() => setMenuOpen(false)}>{t("navbar.services")}</a>
                            <a href="#team" onClick={() => setMenuOpen(false)}>{t("navbar.team")}</a>
                            <a href="#faq" onClick={() => setMenuOpen(false)}>{t("navbar.faq")}</a>
                            <a
                                href="#contact"
                                className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white"
                                onClick={() => setMenuOpen(false)}
                            >
                                {t("navbar.contact")}
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Navbar