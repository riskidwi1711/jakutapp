<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotifikasiController extends Controller
{
    public function index(){
        $data = [
            "page" => 'notifikasi',
            "whatsapp" => Notification::where('type', 'whatsapp')->get(),
            "telegram" => Notification::where('type', 'survey')->orWhere('type', 'input_tim')->get()
        ];
        return Inertia::render('Notification', $data);
    }

    public function delete($id){
        Notification::where('id', $id)->delete();
        return redirect()->back();
    }
}
