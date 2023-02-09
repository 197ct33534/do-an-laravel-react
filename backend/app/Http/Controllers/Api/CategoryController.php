<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class CategoryController extends Controller
{
    /**
     * tạo 1 cate mới
     * @param StoreCategoryRequest  $request
     * @return response
     */
    public function postCategory(StoreCategoryRequest $request)
    {

        $cate = new Categories();
        $cate->name = $request->category_name;
        if ($request->parent_id) {
            $cate->parent_id = $request->parent_id;
        }
        $cate->save();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Thêm danh mục']),
            'data' =>  $cate
        ], 201);
    }

    /**
     * lấy ra tất cả danh mục có trong db ở dạng chilren
     *
     * @return response
     */
    public function getAllCategory()
    {

        if (Categories::all()->count() === 0) {
            return response()->json([
                'success'   => false,
                'data' => false,
                'message'   => Lang::get('messages.no_data'),
            ]);
        }
        $cateList = Categories::whereNull('parent_id')->with(['children'])->get();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy dữ liệu']),
            'data' => $cateList,
        ]);
    }

    /**
     * lấy ra tất cả danh mục có trong db
     *
     * @return response
     */
    public function getCategory()
    {
        if (Categories::all()->count() === 0) {
            return response()->json([
                'success'   => false,
                'data' => false,
                'message'   => Lang::get('messages.no_data'),
            ]);
        }
        $cateList = Categories::whereNotNull('parent_id')->get();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy dữ liệu']),
            'data' => $cateList,
        ]);
    }

    /**
     * cập nhật lại tên catelory
     * @param UpdateCategoryRequest  $request
     * @return response
     */
    public function putCategory(UpdateCategoryRequest  $request)
    {
        $id = $request->input('id');
        $cate = Categories::find($id);

        if (!$cate) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Cập nhật danh mục']),
            ], 404);
        }
        $cate->name = $request->category_name;
        if ($request->parent_id) {
            if ($request->parent_id == $cate->id) {
                return response()->json([
                    'success'   => false,
                    'message'   => 'giá trị chọn không hợp lệ',
                    'error' => ['id' => ['giá trị chọn không hợp lệ']]
                ]);
            }
            $cate->parent_id = $request->parent_id;
        } else {
            $cate->parent_id = null;
        }
        $cate->save();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Cập nhật danh mục']),
            'data' =>  $cate
        ]);
    }

    /**
     * xóa 1 catelory
     * @param Request  $request
     * @return response
     */
    public function deleteCategory(Request  $request)
    {
        $id = $request->input('id');

        if (Categories::find($id)->product) {
            return response()->json([
                'success'   => false,
                'message'   => 'Danh mục đã được sử dụng bạn không thề xóa',
            ]);
        }

        $cate = Categories::find($id);
        if ($cate) {
            $cate->delete();
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Xóa danh mục']),
            ]);
        }
        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => 'Xóa danh mục']),
        ]);
    }

    public function getCategoryHaveParent()
    {
        if (Categories::all()->count() === 0) {
            return response()->json([
                'success'   => false,
                'data' => false,
                'message'   => Lang::get('messages.no_data'),
            ]);
        }
        $cateList = Categories::all();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy dữ liệu']),
            'data' => $cateList,
        ]);
    }
}
