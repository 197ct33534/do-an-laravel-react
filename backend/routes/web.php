<?php

use App\Http\Controllers\RatingController;
use Illuminate\Support\Facades\Artisan;
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

Route::get('/', function () {
    return view('welcome');
});
Route::get('/apriori', [RatingController::class, 'test']);
Route::get('/fakeOrder', [RatingController::class, 'fakeOrder']);
Route::get('/comment', [RatingController::class, 'index']);
Route::get('/test-comment', [RatingController::class, 'testComment']);
Route::post('/post-comment', [RatingController::class, 'postComment'])->name('postComment');

Route::get('/importCsv', [RatingController::class, 'importCsv']);
