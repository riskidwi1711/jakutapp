<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuaraPresiden extends Model
{
    use HasFactory;
    protected $table = 'suara_presidens';
    protected $fillable = ['id_tps', 'suara', 'user_created', 'id_calon'];
}
