<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MealPlanController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MealController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/meal-plans/create', [MealPlanController::class, 'createMealPlan']);

    Route::get('/meal-plans', [MealPlanController::class, 'index']);
    Route::get('/meal-plans/{id}', [MealPlanController::class, 'show']);
    Route::post('/meal-plans', [MealPlanController::class, 'store']);
    Route::put('/meal-plans/{id}', [MealPlanController::class, 'update']);
    Route::delete('/meal-plans/{id}', [MealPlanController::class, 'destroy']);

    Route::get('/meals', [MealController::class, 'index']);
    Route::get('/meals/{id}', [MealController::class, 'show']);
    Route::post('/meals', [MealController::class, 'store']);
    Route::put('/meals/{id}', [MealController::class, 'update']);
    Route::delete('/meals/{id}', [MealController::class, 'destroy']);
});
