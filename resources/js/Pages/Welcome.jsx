import { useForm, router } from '@inertiajs/react';
import TaskItem from '@/Components/TaskItem';
import StatsPanel from '@/Components/StatsPanel';

export default function Welcome({ tasks }) {
    // useForm para manejar el input de nueva tarea
    const { data, setData, post, processing, reset } = useForm({
        title: '',
    });

    // Calculos para las estadisticas
    const total = tasks.length;
    const completadas = tasks.filter(t => t.is_completed).length;
    const progreso = total === 0 ? 0 : Math.round((completadas / total) * 100);

    // Crear tarea nueva
    const crearTarea = (e) => {
        e.preventDefault();
        if (data.title.trim().length === 0) return;

        post('/tasks', {
            preserveScroll: true,
            onSuccess: () => reset('title'),
        });
    };

    // Toggle completada/no completada
    const toggleTarea = (id, estadoActual) => {
        router.put(`/tasks/${id}`, {
            is_completed: !estadoActual,
        }, {
            preserveScroll: true,
        });
    };

    // Editar titulo de una tarea
    const editarTarea = (id, nuevoTitulo) => {
        router.put(`/tasks/${id}`, {
            title: nuevoTitulo,
        }, {
            preserveScroll: true,
        });
    };

    // Eliminar una tarea
    const eliminarTarea = (id) => {
        router.delete(`/tasks/${id}`, {
            preserveScroll: true,
        });
    };

    // Limpiar tareas completadas
    const limpiarCompletadas = () => {
        router.delete('/tasks-completed', {
            preserveScroll: true,
        });
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

                {/* Formulario para añadir tarea */}
                <form onSubmit={crearTarea} className="flex gap-2 mt-6 mb-6">
                    <input
                        type="text"
                        placeholder="Añadir nueva tarea"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm disabled:opacity-50"
                    >
                        Añadir
                    </button>
                </form>

                {/* Lista de tareas */}
                <ul className="space-y-2 mb-6">
                    {tasks.map(tarea => (
                        <TaskItem
                            key={tarea.id}
                            tarea={tarea}
                            onToggle={() => toggleTarea(tarea.id, tarea.is_completed)}
                            onEdit={(nuevoTitulo) => editarTarea(tarea.id, nuevoTitulo)}
                            onDelete={() => eliminarTarea(tarea.id)}
                        />
                    ))}
                </ul>

                {/* Boton limpiar completadas */}
                {completadas > 0 && (
                    <button
                        onClick={limpiarCompletadas}
                        className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow-sm"
                    >
                        Limpiar completadas
                    </button>
                )}
            </div>
        </div>
    );
}
