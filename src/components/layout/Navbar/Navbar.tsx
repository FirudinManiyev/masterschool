import { useContext, useState } from "react";
import { ThemeContext } from "../../../context/theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";

const Navbar = () => {

    const { t, i18n } = useTranslation();
    const themeContext = useContext(ThemeContext);
    const [menuOpen, setMenuOpen] = useState(false);

    if (!themeContext) return null;

    const { toggleTheme, theme } = themeContext;

    return (
        <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">

            <div className="container-custom flex items-center justify-between h-16">

                {/* Logo */}

                <h1 className="text-xl font-bold text-blue-600">
                    MasterSchool
                </h1>

                {/* Desktop menu */}

                <ul className="hidden md:flex items-center gap-8">

                    <li>{t("navbar.home")}</li>
                    <li>{t("navbar.about")}</li>
                    <li>{t("navbar.courses")}</li>
                    <li>{t("navbar.contact")}</li>

                </ul>

                {/* Right side */}

                <div className="flex items-center gap-4">

                    {/* Language */}

                    <select
                        onChange={(e) => i18n.changeLanguage(e.target.value)}
                        className="border rounded px-2 py-1 dark:bg-slate-800"
                    >
                        <option value="az">AZ</option>
                        <option value="en">EN</option>
                        <option value="ru">RU</option>
                    </select>

                    {/* Theme */}

                    <button onClick={toggleTheme}>

                        {theme === "dark" ? (
                            <FiSun size={20} />
                        ) : (
                            <FiMoon size={20} />
                        )}

                    </button>

                    {/* Mobile menu button */}

                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >

                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}

                    </button>

                </div>

            </div>

            {/* Mobile menu */}

            {menuOpen && (

                <div className="md:hidden bg-white dark:bg-slate-900 border-t">

                    <ul className="flex flex-col items-center py-6 gap-6">

                        <li>{t("navbar.home")}</li>
                        <li>{t("navbar.about")}</li>
                        <li>{t("navbar.courses")}</li>
                        <li>{t("navbar.contact")}</li>

                    </ul>

                </div>

            )}

        </nav>
    );
};

export default Navbar;