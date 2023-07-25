<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('Login');
})->name('login')->middleware('guest');

Route::get('/Admin', function () {
    return view('admin.panel');
})->middleware(['auth', 'admin']);

Route::get('/Admin/Empleados', function () {
    return view('admin.empleados');
})->middleware(['auth', 'admin']);

Route::get('/Cajero', function () {
    return view('cajero.plantilla');
})->middleware(['auth', 'cajero']);

Route::get('/Camarero', function () {
    return view('camarero.plantilla');
})->middleware(['auth', 'camarero']);

Route::get('/Cocinero', function () {
    return view('cocinero.plantilla');
})->middleware(['auth', 'cocinero']);

Route::post('/iniciosesion', 'App\Http\Controllers\LoginController@store')->name('iniciosesion.store');
Route::get('/logout', 'App\Http\Controllers\LoginController@logout')->name('logout');