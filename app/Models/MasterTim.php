<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterTim extends Model
{
    use HasFactory;
    protected $fillable = ['nama_tim', 'properti'];
}
