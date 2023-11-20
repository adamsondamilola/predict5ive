<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users;
use App\Models\Wallets;
use App\Models\Packages;
use App\Models\Transactions;
use App\Services\Response;
use Validator;

class CronJobsController extends Controller
{

    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }

    public function daily_earning(Request $request){
        $amount = 0;
        $today_date = "";
        $today_date = date('Y-m-d') ;
        $users = Users::
        Where('last_date_earned', '!=', $today_date)
        ->orWhereNull('last_date_earned')
        ->Where('package_status', 1)
        ->orderBy('id', 'desc')->get();

        if($users != null){
        foreach ($users as $value) {

            //update wallet
            $amount = Packages::Where('package', $value->package)->first()->earn;
            $get_wallet = Wallets::Where('username', $value->username)->first();
            $amount = $amount + $get_wallet->main_wallet;
            $wallet = Wallets::find($get_wallet->id);
            $wallet->main_wallet = $amount;
            $wallet->save();
            //update last date earned of user.
            $user = Users::find($value->id);
            $user->last_date_earned = $today_date;
            $user->save();

            //Intert in transactions.
            Transactions::create([
                'username' => $value->username,
                'type' => "Daily Commission",
                'status' => 1,
                'amount' => $amount,
                'description' => "Daily Commission on package: ".$value->package
                    ]);

        }

}
            else{
                return $this->res(0, "Operation failed.", 401);
            }

        return $this->res(1, "You have voted!", 200);
    }

}
