<?php

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

Route::get('/empleados', 'App\Http\Controllers\EmpleadoController@index')->name('empleado.index');
Route::get('/empleados/show', 'App\Http\Controllers\EmpleadoController@show')->name('empleado.show');
Route::post('/empleados', 'App\Http\Controllers\EmpleadoController@store')->name('empleado.store');
Route::put('/empleados/{id}', 'App\Http\Controllers\EmpleadoController@update')->name('empleado.update');
Route::delete('/empleados/{id}', 'App\Http\Controllers\EmpleadoController@destroy')->name('empleado.delete');
