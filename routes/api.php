<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserApiController;
use App\Http\Controllers\UserLoginController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\CommentsController;
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

Route::get("/user", [UserApiController::class, "users"]);

Route::post("/user", [UserApiController::class, "create"]);

Route::post("/login", [UserLoginController::class, "login"]);

Route::post("/post", [PostsController::class, "create"]);

Route::get("/post", [PostsController::class, "getPosts"]);

Route::post("/comment", [CommentsController::class, "create"]);

Route::get("/comment", [CommentsController::class, "getComments"]);

