<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

//class Users extends Authenticatable implements JWTSubject
class BookingCodes extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'bookmaker',
        'date_posted',
        'code',
        'status',
        'odds',
    ];
/*
    protected $hidden = [
        'created_at',
        'updated_at',
    ]; */

}
