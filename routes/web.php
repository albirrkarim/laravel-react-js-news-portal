<?php

use Illuminate\Support\Facades\Route;

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


Route::get('clear', 'HomeController@clear');
Route::get('cache', 'HomeController@cache');

Route::middleware(["optimize"])->group( function () {
  Route::get('/', 'HomeController@welcome')->name('wellcome');
  Route::get('404', 'HomeController@welcome');
  Route::get('news/{any?}/{id?}', 'HomeController@welcome');
  Route::get('dashboard/{any?}/{id?}', 'HomeController@welcome');
});

Auth::routes([
  'register' => true, // Registration Routes...
  'reset' => false, // Password Reset Routes...
  'verify' => false, // Email Verification Routes...
]);

Route::middleware(["auth"])->group( function () {
    Route::get('/app/{any?}',   'HomeController@index')->name('home');
    Route::resource('user',     'UserController');
    Route::get('logout',     'UserController@logout');

    Route::prefix('data')->group( function () {
      
      Route::resource('settings',     'SettingsController');
      Route::post("settings/{id}",    'SettingsController@update');

      Route::resource('contents',     'ContentsController');
      Route::post("contents/{contents_id}",    'ContentsController@update');
      Route::get("search/contents/{text}",    'ContentsController@search');

      Route::resource('news',          'NewsController');
      Route::get("createnews",          'NewsController@create');
      Route::get("editnews/{news_id}", 'NewsController@edit');
      Route::post("news/{news_id}",    'NewsController@update');
      Route::post('ckupload',          'NewsController@ckupload');
      Route::get("search/news/{text}",    'NewsController@search');

      Route::resource('categories',     'CategoriesController');
      Route::post("categories/{category_id}",    'CategoriesController@update');
    });
});