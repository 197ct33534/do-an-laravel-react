<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\RoleResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * lọc các role có trong table
     * @param Request $request
     * @return response
     */
    public function getFilterRole(Request $request)
    {
        if (Role::all()->count() === 0) {
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
        $roleList = Role::where($where)->orderBy('created_at', 'desc')->with('permissions')->paginate($perpage);
        return response()->json([
            'success'   => true,
            'data' => new RoleCollection($roleList),
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy dữ liệu']),
        ]);
    }
    /**
     * lấy tất cả các role có trong table
     *
     * @return response
     */
    public function getAllRole()
    {
        if (Role::all()->count() === 0) {
            return response()->json([
                'success'   => false,
                'data' => false,
                'message'   => Lang::get('messages.no_data'),
            ]);
        }

        $roleList = Role::with('permissions')->get();
        return response()->json([
            'success'   => true,
            'data' => ($roleList),
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy dữ liệu']),
        ]);
    }
    /**
     * tạo 1 role mới
     * @param StoreRoleRequest $request
     * @return response
     */
    public function postRole(StoreRoleRequest $request)
    {
        $name = $request->input('name');
        $title = $request->input('title');
        $permissions = $request->input('permissions');

        $role = Role::create(['name' => $name, 'title' => $title, 'guard_name' => 'web']);
        $role->givePermissionTo($permissions);

        if ($role) {
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Tạo nhóm ']),
                'data' => $role
            ], 201);
        }
        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => 'Tạo nhóm ']),
        ], 500);
    }

    /**
     * xóa 1 role  đi
     * @param Request $request
     * @return response
     */
    public function deleteRole(Request $request)
    {

        $id = $request->input('id');
        if (!$id) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Xóa nhóm']),
            ], 404);
        }
        $user = User::where('group_role', $id)->count();
        if ($user > 0) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.exists_user'),
            ]);
        }
        Role::destroy($id);
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Xóa nhóm']),
        ]);
    }

    /**
     * cập nhật 1 role mới
     * @param StoreRoleRequest $request
     * @return response
     */
    public function postEditRole(StoreRoleRequest $request)
    {
        $permissions = $request->input('permissions');
        $title = $request->input('title');

        $id = $request->input('id');
        $role = Role::find($id);
        if (!$role) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Cập nhật nhóm ']),
            ], 404);
        }
        $role->title = $title;
        $role->syncPermissions($permissions);
        $role->save();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Cập nhật nhóm ']),
            'data' => $role
        ]);
    }
}
