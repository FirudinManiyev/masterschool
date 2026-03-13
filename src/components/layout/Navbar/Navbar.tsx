import { useState, useContext } from "react"
import { useTranslation } from "react-i18next"
import { FiMoon, FiSun, FiChevronDown, FiMenu, FiX } from "react-icons/fi"
import { ThemeContext } from "../../../context/theme/ThemeContext"

const Navbar = () => {

    const { t, i18n } = useTranslation()
    const themeContext = useContext(ThemeContext)

    const [menuOpen, setMenuOpen] = useState(false)
    const [langOpen, setLangOpen] = useState(false)

    if (!themeContext) return null

    const { toggleTheme, theme } = themeContext

    const changeLang = (lng: string) => {
        i18n.changeLanguage(lng)
        setLangOpen(false)
    }

    return (

        <header className="fixed top-0 w-full z-50 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">

            <div className="container-custom flex items-center justify-between h-16">

                {/* LEFT LOGO */}

                <div className="flex items-center gap-3">

                    <div className="w-9 h-9 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                        M
                    </div>

                    <span className="text-lg font-semibold">
                        <span className="text-slate-800 dark:text-white">Master</span>
                        <span className="text-blue-600">School</span>
                    </span>

                </div>


                {/* DESKTOP MENU */}

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

                    <a href="#home" className="nav-link">{t("navbar.home")}</a>

                    <a href="#about" className="nav-link">{t("navbar.about")}</a>

                    <a href="#services" className="nav-link">{t("navbar.services")}</a>

                    <a href="#team" className="nav-link">{t("navbar.team")}</a>

                    <a href="#faq" className="nav-link">{t("navbar.faq")}</a>

                </nav>


                {/* RIGHT SIDE */}

                <div className="flex items-center gap-4">

                    {/* CONTACT BUTTON */}

                    <a
                        href="#contact"
                        className="hidden md:inline-block bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                    >

                        {t("navbar.contact")}

                    </a>

                    {/* DIVIDER */}

                    <div className="hidden md:block w-px h-6 bg-slate-300 dark:bg-slate-700"></div>


                    {/* LANGUAGE */}

                    <div className="relative">

                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            className="flex items-center gap-1 text-sm font-medium hover:text-blue-600"
                        >

                            {i18n.language.toUpperCase()}
                            <FiChevronDown size={16} />

                        </button>

                        {langOpen && (

                            <div className="absolute right-0 mt-2 bg-white dark:bg-slate-800 border rounded-md shadow-md">

                                <button
                                    onClick={() => changeLang("az")}
                                    className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 w-full text-left"
                                >

                                    AZ

                                </button>

                                <button
                                    onClick={() => changeLang("en")}
                                    className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 w-full text-left"
                                >

                                    EN

                                </button>

                                <button
                                    onClick={() => changeLang("ru")}
                                    className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 w-full text-left"
                                >

                                    RU

                                </button>

                            </div>

                        )}

                    </div>


                    {/* THEME */}

                    <button
                        onClick={toggleTheme}
                        className="text-xl hover:text-blue-600 transition"
                    >

                        {theme === "dark" ? <FiSun /> : <FiMoon />}

                    </button>


                    {/* MOBILE MENU BUTTON */}

                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >

                        {menuOpen ? <FiX /> : <FiMenu />}

                    </button>

                </div>

            </div>


            {/* MOBILE MENU */}

            {menuOpen && (

                <div className="md:hidden bg-white dark:bg-slate-900 border-t">

                    <div className="flex flex-col items-center gap-6 py-6 text-sm font-medium">

                        <a href="#home">{t("navbar.home")}</a>
                        <a href="#about">{t("navbar.about")}</a>
                        <a href="#services">{t("navbar.services")}</a>
                        <a href="#team">{t("navbar.team")}</a>
                        <a href="#faq">{t("navbar.faq")}</a>

                        <a
                            href="#contact"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                        >

                            {t("navbar.contact")}

                        </a>

                    </div>

                </div>

            )}

        </header>

    )
}

export default Navbar