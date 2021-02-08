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
Route::get('news',           'NewsController@index');
Route::get('newsall',        'NewsController@all');
Route::get('news/{url}',     'NewsController@show');

Route::get('contents/category/{category_id}','ContentsController@show');
Route::get('contents/detail/{contents_id}',  'ContentsController@info');

Route::get('search/{text}',     'HomeController@search');

Route::get('categories',     'CategoriesController@all');

Route::get('getsetting/{key}',  'SettingsController@getSetting');

Route::get('settings',  'SettingsController@all');
