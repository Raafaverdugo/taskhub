export default function StatsPanel({ total, completadas, progreso }) {
    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Total</p>
                <p className="text-3xl font-bold text-indigo-600 mt-1">{total}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Completadas</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">{completadas}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Progreso</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">{progreso}%</p>
            </div>
        </div>
    );
}
