<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostClicks extends Model
{
    use HasFactory;
    protected $fillable = [
        'username',
        'post_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
