import { useState } from 'react';

export default function TaskItem({ tarea, onToggle, onEdit, onDelete }) {
    const [editando, setEditando] = useState(false);
    const [textoTemp, setTextoTemp] = useState(tarea.title);

    const guardarEdicion = () => {
        if (textoTemp.trim() === '') {
            setTextoTemp(tarea.title);
        } else if (textoTemp.trim() !== tarea.title) {
            onEdit(textoTemp.trim());
        }
        setEditando(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            guardarEdicion();
        }
        if (e.key === 'Escape') {
            setTextoTemp(tarea.title);
            setEditando(false);
        }
    };

    return (
        <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            {/* Checkbox para completar */}
            <input
                type="checkbox"
                checked={tarea.is_completed}
                onChange={onToggle}
                className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
            />

            {/* Titulo editable */}
            {editando ? (
                <input
                    type="text"
                    value={textoTemp}
                    onChange={(e) => setTextoTemp(e.target.value)}
                    onBlur={guardarEdicion}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="flex-1 px-2 py-1 border border-indigo-300 rounded-md text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            ) : (
                <span
                    onClick={() => {
                        setTextoTemp(tarea.title);
                        setEditando(true);
                    }}
                    className={`flex-1 cursor-pointer select-none ${tarea.is_completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-700'
                        }`}
                >
                    {tarea.title}
                </span>
            )}

            {/* Boton eliminar */}
            <button
                onClick={onDelete}
                className="text-red-400 hover:text-red-600 transition p-1"
                title="Eliminar tarea"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </li>
    );
}
