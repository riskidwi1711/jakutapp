<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalonPresiden extends Model
{
    use HasFactory;
    protected $fillable = ['no_urut', 'nama', 'warna'];
}
