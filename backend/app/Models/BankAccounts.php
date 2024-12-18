<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccounts extends Model
{
    use HasFactory;
    protected $fillable = [
        'username',
        'name',
        'bank',
        'number',
        'bitcoin',
    ];
}
