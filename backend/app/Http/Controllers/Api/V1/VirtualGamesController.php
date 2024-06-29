<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Users;
use App\Models\Wallets;
use App\Services\Response;
use App\Models\Transactions;
use App\Models\BankAccounts;
use App\Models\Settings;
use Validator;

class VirtualGamesController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

public function wonGame(Request $request, $amount){
        $wallet = Wallets::Where('username', auth()->user()->username)->first();
        $update_wallet = Wallets::find($wallet->id);
        $update_wallet->main_wallet += $amount;
        $update_wallet->save();

        //insert transaction.
Transactions::create([
    'username' => auth()->user()->username,
    'type' => "Deposit",
    'status' => 1,
    'amount' => $amount,
    'description' => 'Won '.$amount,
        ]);

        return $this->res(1, 'Won '.$amount, 200);
    }

    public function lostGame(Request $request, $amount){
        $wallet = Wallets::Where('username', auth()->user()->username)->first();
        $update_wallet = Wallets::find($wallet->id);
        $update_wallet->main_wallet -= $amount;
        $update_wallet->save();

        //insert transaction.
Transactions::create([
    'username' => auth()->user()->username,
    'type' => "Withdraw",
    'status' => 1,
    'amount' => $amount,
    'description' => 'Lost '.$amount,
        ]);

        return $this->res(1, 'Won '.$amount, 200);
    }

}
