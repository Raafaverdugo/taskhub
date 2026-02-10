import { useState } from 'react';
import TaskItem from '@/Components/TaskItem';
import StatsPanel from '@/Components/StatsPanel';

export default function Welcome() {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState('');

    // Calculos para las estadisticas
    const total = tareas.length;
    const completadas = tareas.filter(t => t.completada).length;
    const progreso = total === 0 ? 0 : Math.round((completadas / total) * 100);

    // Añadir tarea
    const añadirTarea = () => {
        if (nuevaTarea.trim().length === 0) return;

        const nueva = {
            id: Date.now(),
            titulo: nuevaTarea.trim(),
            completada: false,
        };

        setTareas([...tareas, nueva]);
        setNuevaTarea('');
    };

    // Manejar Enter en el input
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            añadirTarea();
        }
    };

    // Marcar o desmarcar tarea
    const toggleTarea = (id) => {
        setTareas(tareas.map(t =>
            t.id === id ? { ...t, completada: !t.completada } : t
        ));
    };

    // Editar titulo de tarea
    const editarTarea = (id, nuevoTitulo) => {
        setTareas(tareas.map(t =>
            t.id === id ? { ...t, titulo: nuevoTitulo } : t
        ));
    };

    // Limpiar tareas completadas
    const limpiarCompletadas = () => {
        setTareas(tareas.filter(t => !t.completada));
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center py-12 px-4">
            <div className="w-full max-w-xl">

                {/* Titulo */}
                <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Lista de tareas pendientes
                </h1>

                {/* Estadisticas */}
                <StatsPanel total={total} completadas={completadas} progreso={progreso} />

                {/* Input y boton añadir */}
                <div className="flex gap-2 mt-6 mb-6">
                    <input
                        type="text"
                        placeholder="Añadir nueva tarea"
                        value={nuevaTarea}
                        onChange={(e) => setNuevaTarea(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    />
                    <button
                        onClick={añadirTarea}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm"
                    >
                        Añadir
                    </button>
                </div>

                {/* Lista de tareas */}
                <ul className="space-y-2 mb-6">
                    {tareas.map(tarea => (
                        <TaskItem
                            key={tarea.id}
                            tarea={tarea}
                            onToggle={toggleTarea}
                            onEdit={editarTarea}
                        />
                    ))}
                </ul>

                {/* Boton limpiar lista */}
                {tareas.length > 0 && (
                    <button
                        onClick={limpiarCompletadas}
                        className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow-sm"
                    >
                        Limpiar lista
                    </button>
                )}
            </div>
        </div>
    );
}
