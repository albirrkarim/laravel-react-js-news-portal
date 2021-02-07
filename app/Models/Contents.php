<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contents extends Model
{
    use HasFactory;


    protected $fillable = [
        'name',
        'text',
        'file',
        'category_id',
    ];
}
