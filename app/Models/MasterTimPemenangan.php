<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterTimPemenangan extends Model
{
    use HasFactory;
    protected $fillable = ['nama', 'telegram_id','nik', 'no_handphone', 'alamat', 'kecamatan', 'kelurahan', 'rt/rw', 'no_tps', 'no_handphone', 'photo', 'tim', 'jabatan', 'telegram_photo','rt','rw','referensi', 'kecamatan_id', 'kelurahan_id'];
}
