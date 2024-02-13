<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referrals extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'referer'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
