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


Route::get('/', 'ContactController@index')->name('home');

// Kontaktok
Route::get('/contact', 'ContactController@index')->name('contact');
Route::post('/contact/list/ajax', 'ContactController@listAjax')->name('contact.list.ajax');
Route::get('/contact/create', 'ContactController@create')->name('contact.create');
Route::post('/contact/store', 'ContactController@store')->name('contact.store');
Route::get('/contact/edit/{contact}', 'ContactController@edit')->name('contact.edit');
Route::post('/contact/update/{contact}', 'ContactController@update')->name('contact.update');
Route::post('/contact/destroy/{contact}', 'ContactController@destroy')->name('contact.destroy');

// Kategóriák
Route::get('/category', 'CategoryController@index')->name('category');
Route::post('/category/list/ajax', 'CategoryController@listAjax')->name('category.list.ajax');
Route::get('/category/create', 'CategoryController@create')->name('category.create');
Route::post('/category/store', 'CategoryController@store')->name('category.store');
Route::get('/category/edit/{category}', 'CategoryController@edit')->name('category.edit');
Route::post('/category/update/{category}', 'CategoryController@update')->name('category.update');
Route::post('/category/destroy/{category}', 'CategoryController@destroy')->name('category.destroy');
