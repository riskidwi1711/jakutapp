<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calon extends Model
{
    use HasFactory;
    protected $fillable = ['nama_calon', 'no_urut', 'tempat_tinggal', 'jk', 'id_partai', 'tipe'];
}
