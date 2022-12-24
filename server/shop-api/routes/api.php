<?php

use App\Http\Controllers\Auth\AdminSecurityController;
use App\Http\Controllers\Auth\CustomerSecurityController;
use App\Http\Controllers\Products\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('/health', function (Request $request) {
    return response()->json(['status' => 'ok'], 200);
});

Route::group(['prefix' => 'products'], function ($router) {
    Route::get('/', [ProductController::class, 'getPaginationProducts']);
    Route::post('/', [ProductController::class, 'createProduct']);
    Route::post('/{id}', [ProductController::class, 'updateProduct']);
    Route::delete('/{id}', [ProductController::class, 'removeProduct']);
});

// register auth
Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('/login', [CustomerSecurityController::class, 'login']);
    Route::post('/register', [CustomerSecurityController::class, 'register']);
    Route::post('/logout', [CustomerSecurityController::class, 'logout'])->middleware('jwt.auth');
    Route::post('/refresh', [CustomerSecurityController::class, 'refresh']);
    Route::get('/me', [CustomerSecurityController::class, 'me'])->middleware('jwt.auth');
});


Route::namespace('Admin')->group(function () {
    Route::post('admin/login', [AdminSecurityController::class, 'login'])->middleware('guest');
    Route::get('admin/me', [AdminSecurityController::class, 'me'])->middleware(['jwt.verify', 'auth:employee']);
    Route::post('admin/logout', [AdminSecurityController::class, 'logout'])->middleware(['jwt.verify', 'auth:employee']);
    Route::post('admin/refresh', [AdminSecurityController::class, 'refresh']);
});
