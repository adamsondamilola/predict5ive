<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallets extends Model
{
    use HasFactory;
    protected $fillable = [
        'username',
        'main_wallet',
        'vendor_commission',
        'referral_commission',
        'withdrawn',
        'status'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
