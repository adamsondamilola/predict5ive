<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

//class Users extends Authenticatable implements JWTSubject
class Games extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'country',
        'country_code',
        'league',
        'home_team',
        'home_logo',
        'away_team',
        'away_logo',
        'prediction',
        'game_type',
        'game_time',
        'game_date',
        'date_posted',
        'status',
        'win_or_lose',
        'is_premium',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

}
