import { useState } from 'react';

export default function TaskItem({ tarea, onToggle, onEdit }) {
    const [editando, setEditando] = useState(false);
    const [textoTemp, setTextoTemp] = useState(tarea.titulo);

    const guardarEdicion = () => {
        if (textoTemp.trim() === '') {
            setTextoTemp(tarea.titulo);
        } else {
            onEdit(tarea.id, textoTemp.trim());
        }
        setEditando(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            guardarEdicion();
        }
    };

    return (
        <li className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => onToggle(tarea.id)}
                className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
            />

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
                        setTextoTemp(tarea.titulo);
                        setEditando(true);
                    }}
                    className={`flex-1 cursor-pointer select-none ${tarea.completada
                            ? 'line-through text-slate-400'
                            : 'text-slate-700'
                        }`}
                >
                    {tarea.titulo}
                </span>
            )}
        </li>
    );
}
