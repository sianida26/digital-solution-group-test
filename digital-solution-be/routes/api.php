<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CarController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'cars'], function(){
    Route::get('/', [CarController::class, 'getAll']);
    Route::post('/create', [CarController::class, 'create']);
    Route::post('/update/{id}', [CarController::class, 'update']);
    Route::post('/delete/{id}', [CarController::class, 'delete']);
    Route::get('/detail/{id}', [CarController::class, 'detailById']);
});
