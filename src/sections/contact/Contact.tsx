import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import emailjs from "@emailjs/browser"
import {
    FiPhone,
    FiMail,
    FiClock,
    FiSend,
    FiCheck,
    FiAlertCircle,
    FiUser,
    FiMessageSquare,
    FiFileText,
} from "react-icons/fi"

const EMAILJS_SERVICE_ID = "service_dixit6m"
const EMAILJS_TEMPLATE_ID = "template_b7vpcgj"
const EMAILJS_PUBLIC_KEY = "Gqsm66Odq0PKd7iL3"

type Status = "idle" | "loading" | "success" | "error"

const infoItems = [
    {
        key: "phone" as const,
        icon: FiPhone,
        href: "tel:+994707103343",
        accent: "from-indigo-500 to-violet-500",
        iconBg:
            "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300",
        border: "border-indigo-200/60 dark:border-indigo-700/40",
        glow: "group-hover:shadow-indigo-200/60 dark:group-hover:shadow-indigo-900/50",
    },
    {
        key: "email" as const,
        icon: FiMail,
        href: "mailto:info@masterschool.az",
        accent: "from-teal-500 to-cyan-500",
        iconBg:
            "bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300",
        border: "border-teal-200/60 dark:border-teal-700/40",
        glow: "group-hover:shadow-teal-200/60 dark:group-hover:shadow-teal-900/50",
    },
    {
        key: "hours" as const,
        icon: FiClock,
        href: null,
        accent: "from-amber-500 to-orange-500",
        iconBg:
            "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300",
        border: "border-amber-200/60 dark:border-amber-700/40",
        glow: "group-hover:shadow-amber-200/60 dark:group-hover:shadow-amber-900/50",
    },
]

const Contact = () => {
    const { t } = useTranslation()
    const formRef = useRef<HTMLFormElement | null>(null)
    const [status, setStatus] = useState<Status>("idle")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formRef.current) return
        setStatus("loading")
        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            )
            setStatus("success")
            formRef.current.reset()
            setTimeout(() => setStatus("idle"), 6000)
        } catch {
            setStatus("error")
            setTimeout(() => setStatus("idle"), 6000)
        }
    }

    const infoValues: Record<string, string> = {
        phone: "+994 70 710 33 43",
        email: "info@masterschool.az",
        hours: t("contact.hoursValue"),
    }

    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-950 md:py-32"
        >
            {/* ── Animated background ─────────────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0 z-0">
                {/* Blobs */}
                <motion.div
                    animate={{ x: [0, 34, 0], y: [0, -24, 0], scale: [1, 1.08, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-24 -left-24 h-88 w-88 rounded-full bg-indigo-400/35 blur-3xl dark:bg-indigo-700/24"
                />
                <motion.div
                    animate={{ x: [0, -28, 0], y: [0, 20, 0], scale: [1, 1.06, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -right-24 top-8 h-100 w-100 rounded-full bg-violet-300/28 blur-3xl dark:bg-violet-800/18"
                />
                <motion.div
                    animate={{ x: [0, 22, 0], y: [0, -16, 0], scale: [1, 1.07, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-8 left-1/4 h-80 w-80 rounded-full bg-teal-300/34 blur-3xl dark:bg-teal-800/24"
                />
                <motion.div
                    animate={{ x: [0, -20, 0], y: [0, 14, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-18 right-1/3 h-60 w-60 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-900/24"
                />
                <motion.div
                    animate={{ rotate: [0, 10, 0], x: [0, 18, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-24 left-1/3 h-72 w-72 rounded-full border border-indigo-300/25 bg-linear-to-br from-indigo-200/20 via-transparent to-cyan-200/20 blur-2xl dark:border-indigo-700/30 dark:from-indigo-700/20 dark:to-cyan-700/15"
                />
                <motion.div
                    animate={{ rotate: [0, -12, 0], y: [0, -14, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full border border-violet-300/20 bg-linear-to-br from-violet-200/25 via-transparent to-teal-200/20 blur-2xl dark:border-violet-700/25 dark:from-violet-700/18 dark:to-teal-700/15"
                />
                <motion.div
                    animate={{ x: [0, 24, 0], opacity: [0.2, 0.45, 0.2] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 h-44 w-full bg-linear-to-r from-cyan-300/35 via-transparent to-transparent blur-2xl dark:from-cyan-700/25"
                />
                <motion.div
                    animate={{ x: [0, -26, 0], opacity: [0.15, 0.4, 0.15] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-0 right-0 h-48 w-full bg-linear-to-l from-violet-300/30 via-transparent to-transparent blur-2xl dark:from-violet-700/24"
                />
                {/* Particles */}
                {[...Array(22)].map((_, i) => (
                    <motion.span
                        key={`cp-${i}`}
                        animate={{ y: [0, -20, 0], x: [0, (i % 2 === 0 ? 6 : -6), 0], opacity: [0.18, 0.72, 0.18] }}
                        transition={{
                            duration: 3.8 + i * 0.26,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.12,
                        }}
                        className="absolute block rounded-full bg-indigo-400/55 dark:bg-indigo-300/30"
                        style={{
                            left: `${4 + i * 4.3}%`,
                            top: `${10 + (i % 6) * 14}%`,
                            width: `${(i % 3) + 4}px`,
                            height: `${(i % 3) + 4}px`,
                        }}
                    />
                ))}
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.045] dark:opacity-[0.08]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-indigo-500) 1px, transparent 0)`,
                        backgroundSize: "30px 30px",
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.2),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(45,212,191,0.2),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.16),transparent_36%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.24),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(13,148,136,0.22),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(109,40,217,0.18),transparent_36%)]" />
                <div className="absolute inset-0 bg-white/42 dark:bg-slate-950/48" />
            </div>

            {/* ── Content ──────────────────────────────────────────────────── */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Badge + heading */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mb-14 text-center"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:border-indigo-700/50 dark:bg-indigo-950/60 dark:text-indigo-300">
                        <FiMail className="h-3.5 w-3.5" />
                        {t("contact.badge")}
                    </span>
                    <h2 className="mb-3 bg-linear-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-teal-300 sm:text-5xl">
                        {t("contact.title")}
                    </h2>
                    <p className="mx-auto max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                        {t("contact.subtitle")}
                    </p>
                </motion.div>

                {/* Two-column layout */}
                <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">

                    {/* ── Left: Info cards ─────────────────────────────── */}
                    <div className="flex flex-col justify-center gap-5 lg:col-span-2">
                        {infoItems.map((item, i) => {
                            const Icon = item.icon
                            const value = infoValues[item.key]
                            const label = t(`contact.info${item.key.charAt(0).toUpperCase() + item.key.slice(1)}`)

                            const inner = (
                                <motion.div
                                    key={item.key}
                                    initial={{ opacity: 0, x: -32 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.55, delay: i * 0.12 }}
                                    className={`group relative flex items-start gap-5 overflow-hidden rounded-2xl border bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900/70 dark:shadow-slate-950/40 ${item.border} ${item.glow}`}
                                >
                                    {/* Accent bar */}
                                    <div
                                        className={`h-full w-1 absolute left-0 top-0 rounded-l-2xl bg-linear-to-b ${item.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                                    />
                                    {/* Icon */}
                                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    {/* Text */}
                                    <div>
                                        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                            {label}
                                        </p>
                                        <p className="text-base font-semibold leading-snug text-slate-800 dark:text-slate-100">
                                            {value}
                                        </p>
                                    </div>
                                </motion.div>
                            )

                            return item.href ? (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl"
                                >
                                    {inner}
                                </a>
                            ) : (
                                <div key={item.key}>{inner}</div>
                            )
                        })}
                    </div>

                    {/* ── Right: Form ───────────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: 32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-3"
                    >
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/80 dark:shadow-slate-950/60 sm:p-10">
                            {/* Top accent bar */}
                            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 via-violet-500 to-teal-500" />

                            <form ref={formRef} onSubmit={handleSubmit} noValidate>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    {/* Name */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            <FiUser className="h-3.5 w-3.5" />
                                            {t("contact.form.name")}
                                        </label>
                                        <input
                                            type="text"
                                            name="user_name"
                                            required
                                            placeholder={t("contact.form.namePlaceholder")}
                                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none ring-0 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-500"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            <FiMail className="h-3.5 w-3.5" />
                                            {t("contact.form.email")}
                                        </label>
                                        <input
                                            type="email"
                                            name="user_email"
                                            required
                                            placeholder={t("contact.form.emailPlaceholder")}
                                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none ring-0 transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-teal-500"
                                        />
                                    </div>

                                    {/* Subject – full width */}
                                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                                        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            <FiFileText className="h-3.5 w-3.5" />
                                            {t("contact.form.subject")}
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            required
                                            placeholder={t("contact.form.subjectPlaceholder")}
                                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none ring-0 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-indigo-500"
                                        />
                                    </div>

                                    {/* Message – full width */}
                                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                                        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                            <FiMessageSquare className="h-3.5 w-3.5" />
                                            {t("contact.form.message")}
                                        </label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={5}
                                            placeholder={t("contact.form.messagePlaceholder")}
                                            className="resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none ring-0 transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-violet-500"
                                        />
                                    </div>
                                </div>

                                {/* Feedback */}
                                <AnimatePresence mode="wait">
                                    {status === "success" && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-950/40 dark:text-emerald-300"
                                        >
                                            <FiCheck className="h-4 w-4 shrink-0" />
                                            {t("contact.form.success")}
                                        </motion.div>
                                    )}
                                    {status === "error" && (
                                        <motion.div
                                            key="error"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-5 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-700/50 dark:bg-rose-950/40 dark:text-rose-300"
                                        >
                                            <FiAlertCircle className="h-4 w-4 shrink-0" />
                                            {t("contact.form.error")}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit button */}
                                <motion.button
                                    type="submit"
                                    disabled={status === "loading"}
                                    whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                                    whileTap={{ scale: status === "loading" ? 1 : 0.97 }}
                                    className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-indigo-900/40"
                                >
                                    {status === "loading" ? (
                                        <>
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                                            />
                                            {t("contact.form.sending")}
                                        </>
                                    ) : (
                                        <>
                                            <FiSend className="h-4 w-4" />
                                            {t("contact.form.send")}
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
