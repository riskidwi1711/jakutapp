<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partai extends Model
{
    use HasFactory;
    protected $fillable = ['warna', 'nama_partai', 'nama_lengkap', 'no_urut'];
}
