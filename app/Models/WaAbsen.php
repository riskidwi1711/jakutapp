<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WaAbsen extends Model
{
    use HasFactory;
    protected $fillable = ['nama', 'no_handphone', 'alamat', 'kode_acara'];
}
