<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ruta principal - muestra las tareas
Route::get('/', [TaskController::class , 'index']);

// Rutas para el CRUD de tareas
Route::post('/tasks', [TaskController::class , 'store']);
Route::put('/tasks/{id}', [TaskController::class , 'update']);
Route::delete('/tasks/{id}', [TaskController::class , 'destroy']);
Route::delete('/tasks-completed', [TaskController::class , 'destroyCompleted']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class , 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class , 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class , 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
