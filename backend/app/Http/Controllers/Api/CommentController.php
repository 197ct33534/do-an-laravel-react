<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommentRequest;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Helpers\Bayes\CommentBayes;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\BaseResource;
use App\Models\Orders;
use Illuminate\Support\Facades\Lang;

class CommentController extends Controller
{
    public function postComment(CommentRequest $request)
    {
        $user = Auth::user();
        $order_id = '';

        if (!$request->input('order_id')) {
            $orders = Orders::with('orderItem')->where([['user_id', $user->id], ['status', 3]])->get();
            foreach ($orders as $order) {
                foreach ($order->orderItem as $item) {
                    if ($item->product_id == $request->input('product_id')) {
                        if (!Rating::where([['user_id', $user->id], ['order_id', $item->order_id], ['prod_id', $request->input('product_id')]])->first()) {
                            $order_id = $item->order_id;
                            break;
                        }
                    }
                }
                if ($order_id) {
                    break;
                }
            }
        } else {
            $order_id = $request->input('order_id');
            if (Rating::where([['user_id', $user->id], ['order_id', $order_id], ['prod_id', $request->input('product_id')]])->first()) {
                $order_id = '';
            }
        }
        if (!$order_id) {
            return response()->json([
                'success'   => false,
                'message'   => 'Đánh giá thất bại',
            ]);
        }
        $bayes = new CommentBayes();
        $content = $request->input('content_review');
        $result_bayes = $bayes->posteriorProbability($content);

        $bayes = new CommentBayes();

        $rating = new Rating();
        $rating->user_id = $user->id;
        $rating->order_id = $order_id;
        $rating->prod_id = $request->input('product_id');
        $rating->stars_rated = $request->input('star');
        $rating->content_review = $content;
        $rating->is_clothing = $result_bayes['ket-luan-quan-ao-code'];
        $rating->setinment = $result_bayes['ket-luan-code'];
        $rating->is_show = 1;
        $rating->save();
        return response()->json([
            'success'   => true,
            'message'   => 'Đánh giá thành công',
        ]);
    }

    public function getProductComment($id)
    {
        $comments = Rating::with('user')->where([['prod_id', $id], ['is_show', 1]])->orderBy('created_at', 'desc')->paginate(5);
        if ($comments->count() > 0) {
            return response()->json([
                'success'   => true,
                'message'   => 'Lấy đánh giá của sản phẩm ' . $id . 'thành công',
                'data'      => new BaseResource($comments)
            ]);
        }
        return response()->json([
            'success'   => false,
            'message'   => 'Sản phẩm chưa có đánh giá nào',

        ]);
    }

    public function getAllComment(Request $request)
    {
        $where = [['user_id', '!=', 0]];
        if ($request->input('star')) {
            $where[] = ['stars_rated', $request->input('star')];
        }

        if ($request->input('setinment') || $request->input('setinment') === '0') {
            $where[] = ['stars_rated', $request->input('setinment') ?? 0];
        }

        if ($request->input('is_clothing') || $request->input('is_clothing') === '0') {
            $where[] = ['is_clothing', $request->is_clothing ?? 0];
        }

        if ($request->input('product_name')) {
            $where[] = ['content_review', 'like', '%' . $request->input('content_review') . '%'];
        }

        if ($request->input('is_show') || $request->input('is_show') === '0') {
            $where[] = ['is_show',  $request->input('is_show') ?? 0];
        }

        $perpage = 1;
        if ($request->get('perPage')) {
            $arr  = ['10', '15', '20', '8', '1'];
            if (in_array($request->get('perPage'), $arr)) {
                $perpage = $request->get('perPage');
            }
        }

        $comments = Rating::with(['user', 'product'])->where($where)->orderBy('created_at', 'desc')->paginate($perpage);

        if ($comments->count() > 0) {
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Tìm kiếm']),
                'data' => new BaseResource($comments)
            ]);
        }


        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => 'Tìm kiếm']),
        ]);
    }

    public function putComment(UpdateCommentRequest $request)
    {
        $comment = Rating::find($request->input('id'));
        $comment->setinment = $request->input('setinment');
        $comment->is_clothing = $request->input('is_clothing');
        $comment->is_show = $request->input('is_show');
        $comment->save();

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật bình luận thành công',
        ]);
    }
}
