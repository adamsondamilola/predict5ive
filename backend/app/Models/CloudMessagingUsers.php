<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CloudMessagingUsers extends Model
{
    use HasFactory;
    protected $fillable = [
        'platform',
        'email',
        'device_id',
        'status'
    ];
}
