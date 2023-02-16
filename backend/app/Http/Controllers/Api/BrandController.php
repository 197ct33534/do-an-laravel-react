<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandController;
use App\Http\Requests\UpdateBrandController;
use App\Http\Resources\BrandCollection;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    /**
     * lấy tất cả các brand
     *
     * @return response
     */
    public function getAllBrand()
    {
        if (Brand::all()->count() === 0) {
            return response()->json([
                'success'   => false,
                'data' => false,
                'message'   => Lang::get('messages.no_data'),
            ]);
        }
        $brandList = Brand::all();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy dữ liệu']),
            'data' =>  BrandResource::collection($brandList),
        ]);
    }

    /**
     * tạo 1 brand mới
     * @param StoreBrandController  $request
     * @return response
     */
    public function postBrand(StoreBrandController $request)
    {
        $brand = new Brand();
        $brand->name = $request->input('brand_name');
        $imageName = "";
        $brand_image = $request->brand_image;

        if ($brand_image) {
            $imageName = time() . '.' . $brand_image->getClientOriginalExtension();
            $destination_path = 'public/images/brands';
            $request->file('brand_image')->storeAs($destination_path, $imageName);
        }
        $brand->image = $imageName;
        $brand->save();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Thêm thương hiệu']),
            'data' => $brand
        ], 201);
    }

    /**
     * cập nhật 1 brand mới
     * @param UpdateBrandController  $request
     * @return response
     */
    public function postEditBrand(UpdateBrandController $request)
    {
        $id = $request->input('id');
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Cập nhật thương hiệu']),
            ], 404);
        }

        $brand->name = $request->input('brand_name');
        $brand_image = $request->brand_image;

        if ($brand_image) {
            if (Storage::exists('public/images/brands/' . $brand->image)) {
                Storage::delete('public/images/brands/' . $brand->image);
            }
            $destination_path = 'public/images/brands';
            $imageName = time() . '.' . $brand_image->getClientOriginalExtension();
            $request->file('brand_image')->storeAs($destination_path, $imageName);

            $brand->image = $imageName;
        } else if ($request->input('removeImage')) {
            Storage::delete('public/images/products/' . $brand->image);
            $brand->image = '';
        }
        $brand->save();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Cập nhật thương hiệu']),
            'data' =>  $brand
        ]);
    }

    /**
     * xóa 1 brand
     * @param Request  $request
     * @return response
     */
    public function deleteBrand(Request $request)
    {
        $brand = Brand::find($request->id);

        if (Brand::find($request->id)->product) {
            return response()->json([
                'success'   => false,
                'message'   => 'Thương hiệu đã được sử dụng bạn không thề xóa',
            ]);
        }
        $brand = Brand::find($request->id);
        // thiếu phần kiểm tra brand có được gán vào cho product hay chưa
        if ($brand) {
            if (Storage::exists('public/images/brands/' . $brand->image)) {
                Storage::delete('public/images/brands/' . $brand->image);
            }
            $brand->delete();
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Xóa thương hiệu']),
            ]);
        }
        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => 'Xóa thương hiệu']),
        ]);
    }

    /**
     * lọc brand theo tên
     *
     * @return response
     */
    public function getFilterBrand(Request $request)
    {
        $where = [];
        if ($request->input('brand_name')) {
            $where[] = ['name', 'like', '%' . $request->input('brand_name') . '%'];
        }

        $query = Brand::where($where);
        $perpage = 10;
        if ($request->get('perPage')) {
            $arr  = ['10', '15', '20'];
            if (in_array($request->get('perPage'), $arr)) {
                $perpage = $request->get('perPage');
            }
        }
        $BrandList = $query->orderBy('created_at', 'desc')->paginate($perpage);
        if ($BrandList->count() > 0) {
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Tìm kiếm']),
                'data' => new BrandCollection($BrandList)
            ]);
        }

        if (Brand::all()->count() === 0) {
            return response()->json([
                'success'   => false,
                'data' => false,
                'message'   => Lang::get('messages.no_data'),
            ]);
        }
        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => 'Tìm kiếm']),
        ]);
    }
}
