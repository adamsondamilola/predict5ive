<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dailys extends Model
{
    use HasFactory;
    protected $fillable = [
        'username',
        'package',
        'amount',
        'date_earned'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
