<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataAcara extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'kode_acara','lokasi','date','start_time','end_time'];

}
