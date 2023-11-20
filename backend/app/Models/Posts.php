<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'post_title',
        'post_image',
        'post_content',
        'post_date',
        'status',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
