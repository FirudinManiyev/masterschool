import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import heroImage from "../../assets/masterschool_logo.png"

const Hero = () => {

    const { t } = useTranslation()

    return (

        <section
            id="home"
            className="pt-28 pb-20 bg-white dark:bg-slate-950"
        >

            <div className="container-custom grid md:grid-cols-2 gap-12 items-center">


                {/* LEFT CONTENT */}

                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >

                    {/* BADGE */}

                    <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-1 rounded-full mb-6">

                        {t("hero.badge")}

                    </span>


                    {/* TITLE */}

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white">

                        {t("hero.title1")} <br />

                        <span className="text-blue-600">

                            {t("hero.title2")}

                        </span>

                    </h1>


                    {/* DESCRIPTION */}

                    <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-xl">

                        {t("hero.description")}

                    </p>


                    {/* BUTTONS */}

                    <div className="mt-8 flex flex-wrap gap-4">

                        <a
                            href="#contact"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 hover:shadow-lg transition"
                        >

                            {t("hero.apply")}

                        </a>

                        <a
                            href="#about"
                            className="border border-slate-300 dark:border-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >

                            {t("hero.more")}

                        </a>

                    </div>

                </motion.div>



                {/* RIGHT IMAGE */}

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    className="flex justify-center"
                >

                    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">

                        <img
                            src={heroImage}
                            alt="hero"
                            className="max-w-xs md:max-w-sm hover:scale-105 transition duration-300"
                        />

                    </div>

                </motion.div>

            </div>

        </section>

    )
}

export default Hero