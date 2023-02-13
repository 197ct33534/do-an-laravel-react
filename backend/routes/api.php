<?php

use App\Http\Controllers\Api\AttributeSetController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\GroupAttributeController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\AttributeController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/login', [UserController::class, 'postLogin']);
Route::post('/refresh-token', [UserController::class, 'refreshToken']);
Route::get('/logout', [UserController::class, 'getLogout'])->middleware('auth:sanctum');
Route::prefix('user')->middleware(['auth:sanctum', 'checkTokenExpered', 'checkPermission', 'role:Super-Admin'])->group(function () {
    Route::get('', [UserController::class, 'getAllUser']);
    Route::post('', [UserController::class, 'postCreateUser']);
    Route::put('', [UserController::class, 'putUpdateUser']);
    Route::delete('', [UserController::class, 'deleteUser']);
    Route::put('isActive', [UserController::class, 'putUpdateActive']);
    Route::get('filter', [UserController::class, 'getFilterUser']);
});
// , 'role:Super-Admin|editor|reviewer'
Route::prefix('products')->middleware(['auth:sanctum', 'checkTokenExpered'])->group(function () {
    Route::get('', [ProductController::class, 'getAllProduct']);

    Route::post('', [ProductController::class, 'postProduct']);
    Route::delete('', [ProductController::class, 'deleteProduct']);
    Route::post('edit', [ProductController::class, 'postEditProduct']);
    Route::get('filter', [ProductController::class, 'getFilterProduct']);
    Route::get('{id}', [ProductController::class, 'getDetailProduct']);
});
Route::post('uploads', [ProductController::class, 'postUploads']);

Route::get('roles', [RoleController::class, 'getAllRole']);
Route::prefix('roles')->middleware(['auth:sanctum', 'checkTokenExpered', 'checkPermission', 'role:Super-Admin'])->group(function () {
    Route::get('filter', [RoleController::class, 'getFilterRole']);
    Route::post('', [RoleController::class, 'postRole']);
    Route::delete('', [RoleController::class, 'deleteRole']);
    Route::post('edit', [RoleController::class, 'postEditRole']);
});

Route::prefix('permission')->middleware(['auth:sanctum', 'checkTokenExpered', 'checkPermission', 'role:Super-Admin'])->group(function () {
    Route::get('', [PermissionController::class, 'getAllPermission']);
    Route::post('', [PermissionController::class, 'postPermission']);
    Route::delete('', [PermissionController::class, 'deletePermission']);
    Route::put('', [PermissionController::class, 'putPermission']);
});

Route::prefix('brands')->group(function () {
    Route::post('', [BrandController::class, 'postBrand']);
    Route::get('', [BrandController::class, 'getAllBrand']);
    Route::post('edit', [BrandController::class, 'postEditBrand']);
    Route::delete('', [BrandController::class, 'deleteBrand']);
    Route::get('/filter', [BrandController::class, 'getFilterBrand']);
});

Route::prefix('categories')->group(function () {
    Route::post('', [CategoryController::class, 'postCategory']);
    Route::get('', [CategoryController::class, 'getAllCategory']);
    Route::get('/all', [CategoryController::class, 'getCategory']);
    Route::get('/allHaveParent', [CategoryController::class, 'getCategoryHaveParent']);
    Route::put('', [CategoryController::class, 'putCategory']);
    Route::delete('', [CategoryController::class, 'deleteCategory']);
});

Route::prefix('AttributeValue')->group(function () {
    Route::get('', [GroupAttributeController::class, 'getAttributeValue']);
    Route::post('', [GroupAttributeController::class, 'postAttributeValue']);
    Route::put('', [GroupAttributeController::class, 'putAttributeValue']);
    Route::delete('', [GroupAttributeController::class, 'deleteAttributeValue']);
});


Route::prefix('attributeSet')->group(function () {
    Route::get('', [AttributeSetController::class, 'index']);
    Route::post('', [AttributeSetController::class, 'postAttributeSet']);
    Route::put('', [AttributeSetController::class, 'putAttributeSet']);
    Route::delete('', [AttributeSetController::class, 'deleteAttributeSet']);
});

Route::prefix('attribute')->group(function () {

    Route::get('', [AttributeController::class, 'index']);
    Route::post('', [AttributeController::class, 'postAttribute']);
    Route::put('', [AttributeController::class, 'putAttribute']);
    Route::delete('', [AttributeController::class, 'deleteAttribute']);
});
