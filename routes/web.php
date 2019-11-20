<?php

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
    return view('welcome');
})->name('home');
Route::get('/err',function (){
    return response('Erro não autorizado',401)
                ->header('Content-Type','text/json');
})->name("err");
Route::get('{path}', function () {
    return view('welcome');
})->where('path','([A-z\d-]+)?');

