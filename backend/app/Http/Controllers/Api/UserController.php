<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Lang;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    /**
     * kiểm tra đăng nhập từ người dùng
     * @param LoginRequest $request
     * @return mixed
     */
    public function postLogin(LoginRequest $request)
    {
        $pass = $request->input('pass');
        $email = $request->input('email');
        $remember = $request->input('remember');
        $checkLogin = Auth::attempt(['email' => $email, 'password' => $pass], $remember);

        if ($checkLogin) {
            $user = Auth::user();
            if ($user->is_active == 1 &&  $user->is_delete == 0) {
                $tokenResult =   $request->user()->createToken('auth_token');

                if ($remember) {
                    $tokenResult->accessToken->expired_at = Carbon::now()->addDay(30)->toDateTimeString();
                } else {
                    $tokenResult->accessToken->expired_at = Carbon::now()->addDay(1)->toDateTimeString();
                }
                $token = PersonalAccessToken::findToken($tokenResult->plainTextToken);
                $token->expires_at = $tokenResult->accessToken->expired_at;
                $token->save();
                return response()->json([
                    'success'   => true,
                    'message'   => Lang::get('messages.action_successful', ['action' => 'Đăng nhập']),
                    'data'      => new UserResource($user),
                    'token' => $tokenResult->plainTextToken,
                    'expires' => $tokenResult->accessToken->expired_at,
                ]);
            } else {
                return response()->json([
                    'success'   => false,
                    'message'   => Lang::get('messages.lock_or_active'),
                    'data'      => [
                        'error' => Lang::get('messages.lock_or_active'),
                    ]
                ]);
            }
        }
        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.login_failed'),
            'data'      => [
                'error' => Lang::get('messages.login_failed'),
            ]
        ]);
    }

    /**
     * đằng xuất tài khoản
     *  @return response
     */
    public function getLogout(Request $request)
    {

        // \auth()->user()->tokens()->delete();

        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Đăng xuất']),
        ]);
    }

    /**
     *  lấy danh sách người dù từ database
     * @return response
     */
    public function getAllUser(Request $request)
    {
        $perpage = 10;
        if ($request->get('perPage')) {
            $arr  = ['10', '15', '20'];
            if (in_array($request->get('perPage'), $arr)) {
                $perpage = $request->get('perPage');
            }
        }
        $userList = User::where('is_delete', '0')->orderBy('created_at', 'desc')->paginate($perpage);
        return  response()->json(new UserCollection($userList), 200);
    }

    /**
     * tạo tài khoản cho người dùng
     * @param StoreUserRequest $request
     *  @return mixed
     */
    public function postCreateUser(StoreUserRequest $request)
    {
        $pass = Hash::make($request->input('password'));
        $data = $request->only(['name', 'email', 'group_role', 'is_active']);
        $data['password'] = $pass;
        $user = User::create($data);
        DB::insert('insert into model_has_roles (role_id, model_type, model_id) values (?, ?, ?)', [$request->group_role, 'App\Models\User', $user->id]);
        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Tạo tài khoản']),
            'data' => $user
        ], 201);
    }

    /**
     *  cập nhật tài khoản cho người dùng
     *  @param UpdateUserRequest $request
     *  @return mixed
     */
    public function putUpdateUser(UpdateUserRequest $request)
    {

        if (!empty($request->id)) {
            $id = Auth::user()->id;

            if ($id == $request->id) {
                return response()->json([
                    'success'   => false,
                    'message'   => 'Không thể chỉnh sửa tài khoản đang Login',
                ], 403);
            }
            $user = User::find($request->id);
            if ($user) {
                $user->name = $request->name;
                $user->email = $request->email;
                $user->group_role = $request->group_role;
                $user->is_active = $request->is_active;
                if ($request->password) {
                    $user->password = Hash::make($request->password);
                }
                $user->update();
                DB::update('update model_has_roles set role_id = ? where model_id = ?', [$request->group_role, $user->id]);
                return response()->json([
                    'success'   => true,
                    'message'   => Lang::get('messages.action_successful', ['action' => 'Cập nhật tài khoản']),
                    'data' => $user
                ], 200);
            }
        }
        return   response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => 'Cập nhật tài khoản']),
        ], 404);
    }

    /**
     * xóa  tài khoản cho người dùng
     * @param Request $request
     * @return mixed
     */
    public function deleteUser(Request $request)
    {
        $user = User::find($request->input('id'));
        if ($user) {
            $id = Auth::user()->id;
            if ($id == $request->id) {
                return response()->json([
                    'success'   => false,
                    'message'   => 'Không thể xóa tài khoản đang Login',
                ], 403);
            }
            $user->is_delete = 1;
            $user->update();
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Xóa tài khoản']),
                'data' => $user,
            ], 200);
        }
        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => 'Xóa tài khoản']),

        ], 404);
    }

    /**
     * thay đổi trạng thái khóa/ tạm khóa của  tài khoản  người dùng
     * @param Request $request
     * @return mixed
     */
    public function putUpdateActive(Request $request)
    {
        $user = User::find($request->input('id'));
        $text = $user->is_active == 1 ? 'khóa' : 'mở khóa';
        if ($user) {
            $id = Auth::user()->id;
            if ($id == $request->id) {
                return response()->json([
                    'success'   => false,
                    'message'   => 'Không thể chỉnh sửa tài khoản đang Login',
                ], 403);
            }
            if ($user->is_active) {
                $user->is_active = 0;
            } else {
                $user->is_active = 1;
            }
            $user->update();
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => "$text  tài khoản"]),
                'data' => $user,
            ]);
        }
        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => "$text  tài khoản"]),
        ], 404);
    }

    /**
     * Lọc dữ liệu thích hợp từ database
     * @param Request $request
     * @return mixed
     */
    public function getFilterUser(Request $request)
    {
        $where = [];
        if ($request->input('name')) {
            $where[] = ['name', 'like', '%' . $request->input('name') . '%'];
        }
        if ($request->input('email')) {
            $where[] = ['email', 'like', '%' . $request->input('email') . '%'];
        }
        if ($request->input('group_role')) {
            $where[] = ['group_role',  $request->input('group_role')];
        }
        if ($request->input('is_active') == '0' || $request->input('is_active') == '1') {

            $where[] = ['is_active',  $request->input('is_active')];
        }

        $where[] = ['is_delete', '<>', '1'];
        $perpage = 10;
        if ($request->get('perPage')) {
            $arr  = ['10', '15', '20'];
            if (in_array($request->get('perPage'), $arr)) {
                $perpage = $request->get('perPage');
            }
        }

        $userList = User::where($where)->orderBy('created_at', 'desc')->paginate($perpage);
        if ($userList->count() > 0) {
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Tìm kiếm']),
                'data' => new UserCollection($userList)
            ]);
        }
        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => 'Tìm kiếm']),
        ]);
    }
}
