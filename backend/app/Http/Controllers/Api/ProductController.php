<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductCollection;
use App\Helpers\Functions;
use App\Http\Resources\ProductResource;
use App\Models\AttributeProductValue;
use App\Models\AttributeValue;
use App\Models\Product;
use App\Models\ProductAttribute;
use App\Models\ProductImage;
use App\Models\ProductItem;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{

    /**
     * thêm sản phẩm vào bảng mst_product
     * @param StoreProductRequest $request
     * @return mixed
     */
    public function postProduct(StoreProductRequest $request)
    {
        $id_attribute_set =  1;

        $func = new Functions();


        $firstCharacter = $func->convert_name($request->product_name)[0];

        if (!preg_match("/[a-zA-Z]/", $firstCharacter)) {
            return response()->json([
                'success' => false,
                'error' => [
                    'product_name' => ['Tên bắt đầu bằng kí tự Alphabet']
                ]
            ]);
        }
        $id = $firstCharacter . '000000001';
        $productOld = Product::where('product_id', 'like', '%' . $firstCharacter . '%')->latest('created_at')->first();

        if ($productOld) {
            $lenID =  Str::substr($productOld->product_id, 1) + 1;

            $maxLen = 10 - strlen($lenID) - 1;
            $id =  $firstCharacter;
            for ($i = 0; $i < $maxLen; $i++) {
                $id .= '0';
            }
            $id .= $lenID;
        }

        $product = new Product();
        $imageName = "";
        if ($request->file('product_image')) {
            $imageName = rand(0, 99999) . time() . '.' . $request->file('product_image')->getClientOriginalExtension();
            $destination_path = 'public/images/products';

            $request->file('product_image')->storeAs($destination_path, $imageName);
        }
        $product->product_id = $id;
        $product->product_name = $request->product_name;
        $product->description = $request->description;
        $product->product_image = $imageName;
        $product->product_price = $request->product_price;
        $product->gender = $request->gender;
        $product->active = $request->active;
        $product->brand_id = $request->brand_id;
        $product->category_id = $request->category_id;
        $product->save();

        $attributes = $request->input('attributes');

        foreach ($attributes as $key => $val) {

            $product_item = new ProductItem();
            $product_item->product_id = $id;
            $product_item->attribute_set_id = $request->attribute_set_id;
            $product_item->sku = $val['sku'];
            $product_item->qty = $val['qty'];
            $product_item->flag_primary = 1;
            $product_item->save();
            // dd(!Arr::exists($val, 'image'));
            if (!Arr::exists($val, 'image')) {

                $imageName = "";
                if ($request->file('attributes')[$key]) {
                    $imageName = rand(0, 99999) . time() . '.' . $request->file('attributes')[$key]['image']->getClientOriginalExtension();
                    $destination_path = 'public/images/products';

                    $request->file('attributes')[$key]['image']->storeAs($destination_path, $imageName);
                }
                $product_image = new ProductImage();
                $product_image->product_item_id = $product_item->id;
                $product_image->name = $imageName;
                $product_image->save();
            }

            $filtered = array_values(Arr::except($val, ['sku', 'qty', 'image']));
            foreach ($filtered as $k => $v) {
                $attributeProduct = new AttributeProductValue();
                $attributeProduct->product_item_id = $product_item->id;
                $attributeValue = AttributeValue::find($v);
                $attributeProduct->attribute_id  = $attributeValue->attribute_id;
                $attributeProduct->value  = $attributeValue->value;
                $attributeProduct->save();
            }
        }


        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Thêm sản phẩm']),
            'data' => ($product)
        ], 201);
    }

    /**
     * lấy danh sách các sản phẩm
     *
     * @return response
     */
    public function getAllProduct()
    {
        $productList = Product::orderBy('created_at', 'desc')->paginate(20);

        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy danh sách sản phẩm']),
            'data' =>     new ProductCollection($productList)
        ]);
    }

    /**
     * cập nhật  sản phẩm vào bảng mst_product
     * @param StoreProductRequest $request
     * @return mixed
     */
    public function postEditProduct(Request $request)
    {
        // dd($request);
        $id = $request->id;
        $product = Product::find($request->id);
        $destination_path = 'public/images/products';
        if (!$product) {
            return response()->json([
                'success'   => false,
                'message'   => Lang::get('messages.action_failed', ['action' => 'Cập nhật sản phẩm']),

            ], 404);
        }
        // nếu tải ảnh lên thì xóa hình cũ update hình mới
        if ($request->file('product_image')) {
            if (Storage::exists('public/images/products/' . $product->product_image)) {
                Storage::delete('public/images/products/' . $product->product_image);
                $imageName = time() . '.' . $request->product_image->getClientOriginalExtension();
                $request->file('product_image')->storeAs($destination_path, $imageName);
                $product->product_image = $imageName;
            }
        }
        // nếu không tải ảnh lên thì có 2 trường hợp
        // 1. là tấm hình đó bị xóa
        // 2   là giữ nguyên tấm hình đó
        else if ($request->changeImage) {
            // Storage::delete('public/images/products/' . $product->product_image);
            // $product->product_image = '';
        }

        $product->product_name = $request->product_name;

        if ($request->description !== $product->description && $request->description) {
            $product->description = $request->description;
        } elseif ($request->has('description')) {
            $product->description = '';
        }

        $product->product_price = $request->product_price;
        // $product->is_sales = $request->is_sales;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->gender = $request->gender;
        $product->active = $request->active;
        $product->save();
        $attributes = $request->input('attributes');
        // xóa các dòng có product_id = $id, mà product_item_id đó không được gửi lên
        $listId =  ProductItem::select('id')->where('product_id', $id)->get()->toArray();

        // dd(array_column($listId, 'id'));
        $listProductItemId = array_diff(array_column($listId, 'id'), array_column($attributes, 'product_item_id'));
        ProductItem::where('product_id', $id)->whereIn('id', $listProductItemId)->delete();
        AttributeProductValue::whereIn('product_item_id', $listProductItemId)->delete();
        $listNameProductImage = ProductImage::select('name')->whereIn('product_item_id',  $listProductItemId)->get();

        foreach ($listNameProductImage as $key => $value) {
            if (Storage::exists('public/images/products/' . $value)) {
                Storage::delete('public/images/products/' . $value);
            }
        }
        ProductImage::whereIn('product_item_id', $listProductItemId)->delete();
        foreach ($attributes as $key => $val) {
            $product_item = '';
            $imageName = "";
            $product_item_id = $val['product_item_id'];


            if ($product_item_id > 0) {
                // cập nhật
                $product_item = ProductItem::find($product_item_id);

                $product_item->attribute_set_id = request()->attribute_set_id;
                $product_item->sku = $val['sku'];
                $product_item->qty = $val['qty'];
                $product_item->flag_primary = 1;
                $product_item->save();
                $productImage = ProductImage::where('product_item_id', $product_item_id)->first();
                // kiểm tra hình ảnh gửi lên trong attribute là chuỗi hay không
                if (Arr::exists($val, 'image')) {
                    // tồn tại thì có 2 trường hợp, giữ nguyên hoặc xóa
                    if (!$val['image']) {
                        // trường hợp là xóa tấm hình
                        // nếu tấm hình đó đã tồn tại trong csdl rồi
                        if ($productImage) {
                            if (Storage::exists('public/images/products/' . $productImage->name)) {
                                Storage::delete('public/images/products/' . $productImage->name);
                            }
                            $productImage->delete();
                        }
                    } else {
                        // giữ nguyên tấm hình
                    }
                } else {
                    // cập nhật mới tấm hình đó


                    // lưu tấm hình mới
                    $imageName = rand(0, 99999) . time() . '.' . request()->file('attributes')[$key]['image']->getClientOriginalExtension();
                    $destination_path = 'public/images/products';

                    $request->file('attributes')[$key]['image']->storeAs($destination_path, $imageName);

                    // lúc tạo có hình rồi thì xóa tấm hình đó
                    if ($productImage) {
                        if (Storage::exists('public/images/products/' . $productImage->name)) {
                            Storage::delete('public/images/products/' . $productImage->name);
                        }
                    } else {
                        $productImage = new ProductImage();
                    }
                    $productImage->product_item_id = $product_item_id;
                    $productImage->name = $imageName;
                    $productImage->save();
                }
                $filtered = array_values(Arr::except($val, ['sku', 'qty', 'product_item_id', 'image']));
                AttributeProductValue::where('product_item_id', $product_item_id)->delete();

                foreach ($filtered as $k => $v) {
                    $attributeProduct =  new AttributeProductValue();
                    $attributeProduct->product_item_id = $product_item_id;
                    $attributeValue = AttributeValue::find($v);
                    $attributeProduct->attribute_id  = $attributeValue->attribute_id;
                    $attributeProduct->value  = $attributeValue->value;
                    $attributeProduct->save();
                }
            } else {
                // thêm mới
                $product_item = new ProductItem();
                $product_item->attribute_set_id = request()->attribute_set_id;
                $product_item->product_id = $id;
                $product_item->sku = $val['sku'];
                $product_item->qty = $val['qty'];
                $product_item->flag_primary = 1;
                $product_item->save();

                if (!Arr::exists($val, 'image')) {

                    $imageName = "";
                    if ($request->file('attributes')[$key]) {
                        $imageName = rand(0, 99999) . time() . '.' . $request->file('attributes')[$key]['image']->getClientOriginalExtension();
                        $destination_path = 'public/images/products';

                        $request->file('attributes')[$key]['image']->storeAs($destination_path, $imageName);
                    }
                    $product_image = new ProductImage();
                    $product_image->product_item_id = $product_item->id;
                    $product_image->name = $imageName;
                    $product_image->save();
                }

                $filtered = array_values(Arr::except($val, ['sku', 'qty', 'product_item_id', 'image']));
                foreach ($filtered as $k => $v) {
                    $attributeProduct = new AttributeProductValue();
                    $attributeProduct->product_item_id = $product_item->id;
                    $attributeValue = AttributeValue::find($v);
                    $attributeProduct->attribute_id  = $attributeValue->attribute_id;
                    $attributeProduct->value  = $attributeValue->value;
                    $attributeProduct->save();
                }
            }
        }

        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Cập nhật sản phẩm']),
            'data' => $product
        ]);
    }

    /**
     * xóa sản phẩm
     * @param Request $request
     * @return response
     */
    public function deleteProduct(Request $request)
    {
        $produdct_id = $request->id;
        $product = Product::find($produdct_id);
        if ($product) {
            if (Storage::exists('public/images/products/' . $product->product_image)) {
                Storage::delete('public/images/products/' . $product->product_image);
            }

            $productItem = ProductItem::where('product_id', $produdct_id)->get();

            foreach ($productItem as $key => $item) {
                $image = ProductImage::where('product_item_id', $item->id)->first();
                if (Storage::exists('public/images/products/' . $image->name)) {
                    Storage::delete('public/images/products/' . $image->name);
                }
                ProductItem::where('id', $item->id)->delete();
                $image->delete();
                AttributeProductValue::where('product_item_id', $item->id)->delete();
                // $item->attributeValue->delete();
            }
            $product->delete();
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Xóa sản phẩm']),
            ]);
        }
        return response()->json([
            'success'   => false,
            'message'   => Lang::get('messages.action_failed', ['action' => 'Xóa sản phẩm']),
        ]);
    }

    /**
     * Lọc dữ liệu thích hợp từ bẳng sản phẩm
     * @param Request $request
     * @return mixed
     */
    public function getFilterProduct(Request $request)
    {
        $where = [];
        if ($request->input('product_name')) {
            $where[] = ['product_name', 'like', '%' . $request->input('product_name') . '%'];
        }


        $query = Product::where($where);

        if (is_numeric($request->input('min_price')) && is_numeric($request->input('max_price'))) {
            $query->whereBetween('product_price', [$request->input('min_price'), $request->input('max_price')]);
        } else if (is_numeric($request->input('min_price'))) {
            $query->where('product_price', '>=', $request->input('min_price'));
        } else if (is_numeric($request->input('max_price'))) {
            $query->where('product_price', '<=', $request->input('max_price'));
        }

        $perpage = 10;
        if ($request->get('perPage')) {
            $arr  = ['10', '15', '20', '8'];
            if (in_array($request->get('perPage'), $arr)) {
                $perpage = $request->get('perPage');
            }
        }
        $productList = $query->orderBy('created_at', 'desc')->paginate($perpage);
        if ($productList->count() > 0) {
            return response()->json([
                'success'   => true,
                'message'   => Lang::get('messages.action_successful', ['action' => 'Tìm kiếm']),
                'data' => new ProductCollection($productList)
            ]);
        }

        if (Product::all()->count() === 0) {
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

    /**
     * Lấy hình ảnh từ desc lưu vào database
     * @param Request $request
     * @return response
     */
    public function postUploads(Request $request)
    {
        if ($request->hasFile('upload')) {
            $originName =   $request->file('upload')->getClientOriginalName();
            $fileName = pathinfo($originName, PATHINFO_FILENAME);
            $extension = $request->file('upload')->getClientOriginalExtension();
            $fileName = $fileName . '_' . time() . '.' . $extension;

            $request->file('upload')->move(public_path('media'), $fileName);
            $url = asset('media/' . $fileName);
            return response()->json(['fileName' => $fileName, 'uploaded' => 1, 'url' => $url]);
        }
    }



    public function getDetailProduct($id)
    {
        $pro = Product::where('product_id', $id)->with(['productItems', 'comments'])->get();

        return response()->json([
            'success'   => true,
            'message'   => Lang::get('messages.action_successful', ['action' => 'Lấy chi tiết sản phẩm']),
            'data' =>  ProductResource::collection($pro),

        ]);
    }
}
