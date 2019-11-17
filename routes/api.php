<?php

use Illuminate\Http\Request;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'middleware' => 'api',
],function($r){
    Route::get('teste',function(){
        echo "teste";
    });
});




Route::group([

    'middleware' => 'api',
    
], function ($router) {

 
    

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

    /*Bug controller*/
    Route::get('bug',"BugController@index");
    Route::get('bug/{id}','BugController@bug');
    Route::post('bug',"BugController@store");
    Route::delete('bug/{id}','BugController@delete');
    

    /*Project controller, in project user must have a role of admin not created yet */
    Route::get('project',"ProjectController@index");
    Route::get('project/{id}','ProjectController@project');
    Route::post('project',"ProjectController@store");
    Route::delete('project/{id}','ProjectController@delete');


});