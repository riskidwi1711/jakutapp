<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class Verify extends Controller
{
    public function confirm($confirmation_code)
    {
        if (!$confirmation_code) {
            return "link tidak terdaftar";
        }

        $user = User::where('confirmation_code', $confirmation_code)->first();

        if (!$user) {
            return "link tidak terdaftar";
        }

        $user->confirmed = 1;
        $user->confirmation_code = null;
        $user->save();

        session()->flash('message', 'Akun anda telah berhasil di verifikasi, silahkan login!');

        return Redirect::to('login');
    }
}
