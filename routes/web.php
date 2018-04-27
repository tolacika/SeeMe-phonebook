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
Route::get('/contact', 'ContactController@index')->name('contact');
Route::get('/contact/create', 'ContactController@create')->name('contact.create');
Route::post('contact/list/ajax', 'ContactController@listAjax')->name('contact.list.ajax');
