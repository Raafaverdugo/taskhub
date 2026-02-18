<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Mostrar todas las tareas en la vista principal
     */
    public function index()
    {
        $tasks = Task::orderBy('created_at', 'desc')->get();

        return Inertia::render('Welcome', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Crear una nueva tarea
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        Task::create([
            'title' => $request->title,
        ]);

        return redirect()->back();
    }

    /**
     * Actualizar una tarea (titulo o estado)
     */
    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return redirect()->back();
        }

        // Si se envia el campo is_completed, actualizamos solo eso
        if ($request->has('is_completed')) {
            $task->is_completed = $request->is_completed;
        }

        // Si se envia el campo title, actualizamos el titulo
        if ($request->has('title')) {
            $request->validate([
                'title' => 'required|string|max:255',
            ]);
            $task->title = $request->title;
        }

        $task->save();

        return redirect()->back();
    }

    /**
     * Eliminar una tarea
     */
    public function destroy($id)
    {
        $task = Task::find($id);

        if ($task) {
            $task->delete();
        }

        return redirect()->back();
    }

    /**
     * Eliminar todas las tareas completadas
     */
    public function destroyCompleted()
    {
        Task::where('is_completed', true)->delete();

        return redirect()->back();
    }
}
