<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>{{ $title }}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <style>
        @font-face {
            font-family: 'DejaVu Sans', sans-serif;
            font-weight: 400;
            font-style: normal;
            font-variant: normal;
            src: {{ storage_path('fonts\DejaVuSans.ttf') }} format("truetype");
        }

        * {
            margin: 0;
            padding: 0;
        }

        * {
            font-family: 'DejaVu Sans', sans-serif !important;
        }

        div.text-capitalize {
            font-size: 14px;
        }

        #customers {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        #customers td,
        #customers th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        #customers tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        #customers tr:hover {
            background-color: #ddd;
        }

        #customers th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #2a2929;
            color: white;
        }
    </style>

</head>

<body>
    <div class="container pt-3">
        <div class="row">
            <h1 class=" text-bold text-capitalize">Nghĩa Store</h1>
            <small class=" text-capitalize">
                Địa chỉ: 51b đường 26, phường cát lái, thành phố Thủ đức, thành phố hồ chí minh
            </small>

            <div class=" text-capitalize"><small class="">Điện thoại: 0967847582<small></div>
            <div class="text-center text-capitalize " style="font-size: 22px;font-weight:bold">hóa đơn bán lẻ</div>
            <div class="text-capitalize">mã hóa đơn: {{ $orders->id }}
            </div>
            <div class="text-capitalize">Tên khách hàng: {{ $orders->name }}
            </div>
            <div class="text-capitalize">Số điện thoại: {{ $orders->phone }}
            </div>
            <div class="text-capitalize">Địa chỉ: {{ $orders->address ?? $orders->address2 }}
            </div>
        </div>

        <div class="pt-3">

            <table id="customers">
                <tr>
                    <th><small style="font-size: 12px;" class='text-capitalize'>stt</small></th>
                    <th><small style="font-size: 12px;" class='text-capitalize'>tên hàng</small></th>
                    <th><small style="font-size: 12px;" class='text-capitalize'>thuộc tính</small></th>
                    <th><small style="font-size: 12px;" class='text-capitalize'>số lượng</small></th>
                    <th><small style="font-size: 12px;" class='text-capitalize'>đơn giá</small></th>
                    <th><small style="font-size: 12px;" class='text-capitalize'>thành tiền</small></th>
                </tr>

                @if ($orders->orderItem->count() > 0)
                    @foreach ($orders->orderItem as $key => $order)
                        <tr>
                            <td width="5%"><small>{{ $key + 1 }}</small></td>
                            <td><small>{{ $order->productItem->getProduct->product_name }}</small></td>

                            @php
                                // $attribute = [];
                                $attribute = '';
                                foreach ($order->productItem->attributeValue->values() as $attr) {
                                    // $attribute[$attr->attributes->name] = $attr->attributeVal->value;
                                    $attribute .= $attr->attributes->name . ': ' . $attr->attributeVal->value . '<br/>';
                                }
                                
                            @endphp
                            <td><small>{!! $attribute !!}</small></td>
                            <td width='12%' class="text-center"><small>{{ $order->qty }}</small></td>
                            <td width='15%' class="text-end">
                                <small width="100%" class="text-end">{{ number_format($order->price, 0, '.', '.') }}
                                    đ</small>
                            </td>
                            <td width='15%' class="text-end">
                                <small width="100%"
                                    class="text-end">{{ number_format($order->price * $order->qty, 0, '.', '.') }}
                                    đ</small>
                            </td>

                        </tr>
                    @endforeach
                @endif
                @php
                    $total = $orders->total_price;
                @endphp
                <tr>
                    <td colspan="4">Phí ship</td>
                    <td colspan="2" class="text-end">
                        @php $ship = ($total == 0 ? 0 : $total < 500000) ? 30000 : 0; @endphp
                        {{ number_format($ship, 0, '.', '.') }} đ
                    </td>
                </tr>
                <tr>
                    <td colspan="4">Tổng đơn hàng</td>
                    <td colspan="2" class="text-end">{{ number_format($total + $ship, 0, '.', '.') }} đ
                    </td>
                </tr>
            </table>
        </div>


    </div>
</body>

</html>
