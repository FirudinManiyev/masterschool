import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 text-center dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

            {/* floating gradient shapes */}
            <div className="absolute -top-32 -left-32 h-96 w-96 animate-pulse rounded-full bg-blue-400/30 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-indigo-400/30 blur-3xl"></div>

            <div className="relative z-10 max-w-lg">

                <h1 className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-8xl font-extrabold text-transparent">
                    404
                </h1>

                <h2 className="mt-4 text-3xl font-semibold text-slate-800 dark:text-white">
                    Page not found
                </h2>

                <p className="mt-3 text-slate-500 dark:text-slate-400">
                    The page you are looking for might have been removed, renamed,
                    or is temporarily unavailable.
                </p>

                <Link
                    to="/"
                    className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                    Back to Home
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </Link>

            </div>
        </div>
    );
}