<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Orders;
use Illuminate\Http\Request;
use PDF;

class DownloadsController extends Controller
{
    public function getDownloadOrder($id)
    {
        //PDF file is stored under project/public/download/info.pdf
        // $file = public_path() . "/pdf/pdf_file.pdf";
        // $file = storage_path('pdf\pdf_file.pdf');
        // dd(asset('storage/pdf/pdf_file.pdf'));
        $headers = array(
            'Content-Type: application/pdf',
        );
        $orders = Orders::with(['orderItem', 'orderItem.productItem', 'orderItem.productItem.productItemImage', 'orderItem.productItem.attributeValue', 'orderItem.productItem.getProduct'])->where('id', $id)->first();
        $data = [
            'title' => date('m-d-Y') . '-' . $orders->name,
            'date' => date('m/d/Y'),
            'orders' =>  $orders
        ];

        $pdf = PDF::loadView('templaceOrder', $data);

        // $myFile = public_path("dummy_pdf.pdf");
        // $headers = ['Content-Type: application/pdf'];
        // $newName = 'itsolutionstuff-pdf-file-' . time() . '.pdf';

        // return response()->download(public_path('storage/pdf/pdf_file.pdf'), $newName, $headers, 'inline');

        return $pdf->download($id . '-' . $data['title'] . '.pdf');
        // return response()->download($pdf, $data['title'] . '.pdf', $headers);
    }
}
