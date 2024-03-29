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
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\DashBoardController;
use App\Http\Controllers\Api\DownloadsController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\RatingController;

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
Route::post('/resigter', [UserController::class, 'postResigter']);
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
Route::get('products/filter', [ProductController::class, 'getFilterProduct']);
Route::get('products/recommend/{id}', [ProductController::class, 'getProductRecommend']);
Route::get('products/sameCate/{cate_id}', [ProductController::class, 'getProductSameCategory']);
Route::get('products/topSearch', [ProductController::class, 'getProductTopSearch']);
Route::get('products/inputSearch', [ProductController::class, 'getInputSearchProduct']);
Route::get('products_cate/filter', [ProductController::class, 'getProductCategory']);
Route::get('products/{id}', [ProductController::class, 'getDetailProduct']);
Route::prefix('products')->middleware(['auth:sanctum', 'checkTokenExpered'])->group(function () {
    Route::get('', [ProductController::class, 'getAllProduct']);

    Route::post('', [ProductController::class, 'postProduct']);
    Route::delete('', [ProductController::class, 'deleteProduct']);
    Route::post('edit', [ProductController::class, 'postEditProduct']);
});

Route::post('uploads', [ProductController::class, 'postUploads']);
Route::get('printOrder/{id}', [DownloadsController::class, 'getDownloadOrder']);
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

Route::prefix('carts')->middleware('auth:sanctum')->group(function () {
    Route::post('', [CartController::class, 'addCart']);
    Route::put('', [CartController::class, 'updateCart']);
    Route::get('/count', [CartController::class, 'getCartCount']);
    Route::delete('', [CartController::class, 'deleteCart']);
});
Route::prefix('orders')->middleware('auth:sanctum')->group(function () {
    Route::post('', [OrderController::class, 'postOrder']);
    Route::get('', [OrderController::class, 'getOrder']);
    Route::put('', [OrderController::class, 'updateOrder']);
    Route::get('status', [OrderController::class, 'getStatusOrder']);
});
Route::get('comments/{id}', [CommentController::class, 'getProductComment']);
Route::prefix('comments')->middleware('auth:sanctum')->group(function () {
    Route::post('', [CommentController::class, 'postComment']);
    Route::put('', [CommentController::class, 'putComment']);
    Route::get('', [CommentController::class, 'getAllComment']);
});

Route::prefix('dashboard')->middleware('auth:sanctum')->group(function () {

    Route::get('budget', [DashBoardController::class, 'index']);
    Route::get('monthlyRevenue', [DashBoardController::class, 'getMonthlyRevenue']);
    Route::get('quantitySoldOfProduct', [DashBoardController::class, 'getQuantitySoldOfProduct']);
    Route::get('getNumberOfCommentTypes', [DashBoardController::class, 'getNumberOfCommentTypes']);
});
Route::post('test-comment', [RatingController::class, 'testComment']);
