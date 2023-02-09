<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePermissionRequest;
use App\Http\Resources\PermissionCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Lang;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * lấy tất cả các Permission có trong table
     * @param Request $request
     * @return response
     */
    public function getAllPermission(Request $request)
    {
        if (Permission::all()->count() === 0) {
            return response()->json([
                'success'   => false,
                'data' => false,
                'message'   => Lang::get('messages.no_data'),
            ]);
        }
        $where = [];
        if ($request->input('title')) {
            $where[] = ['title', 'like', '%' . $request->input('title') . '%'];
        }
        if ($request->input('name')) {
            $where[] = ['name', 'like', '%' . $request->input('name') . '%'];
        }
        $perpage = 10;
        if ($request->get('perPage')) {
            $arr  = ['10', '15', '20'];
            if (in_array($request->get('perPage'), $arr)) {
                $perpage = $request->get('perPage');
            }
        }
        $permissList = Permission::where($where)->orderBy('created_at', 'desc')->paginate($perpage);
        return response()->json([
            'success'   => true,
            'data' => new PermissionCollection($permissList),
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy dữ liệu']),
        ]);
    }

    /**
     * tạo 1 permisstion mới
     * @param StorePermissionRequest $request
     * @return response
     */
    public function postPermission(StorePermissionRequest $request)
    {
        $name = $request->input('name');
        $title = $request->input('title');
        $permiss = Permission::create(['name' => $name, 'title' => $title, 'guard_name' => 'web']);
        if ($permiss) {
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Tạo quyền ']),
                'data' => $permiss
            ], 201);
        }

        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => 'Tạo quyền ']),
        ], 500);
    }

    /**
     * xóa 1 permisstion  đi
     * @param Request $request
     * @return response
     */
    public function deletePermission(Request $request)
    {
        $id = $request->input('id');
        if (!$id) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Xóa quyền']),

            ], 404);
        }
        $check = DB::table('role_has_permissions')->where('permission_id', $id)->count();

        if ($check > 0) {
            return response()->json([
                'success'   => false,
                'message'   => 'Lỗi: quyền đã được sử dụng không thể xóa!',
            ]);
        }
        Permission::destroy($id);
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Xóa quyền']),
        ]);
    }

    /**
     * cập nhật 1 permisstion mới
     * @param StorePermissionRequest $request
     * @return response
     */
    public function putPermission(StorePermissionRequest $request)
    {

        $title = $request->input('title');
        $id = $request->input('id');
        $role = Permission::find($id);
        if (!$role) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Cập nhật quyền ']),
            ], 404);
        }
        $role->title = $title;
        $role->save();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Cập nhật quyền ']),
            'data' => $role
        ]);
    }
}
