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

class WalletController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }

    public function getWallet(Request $request){
        $wallet = Wallets::Where('username', auth()->user()->username)->first();
        return $this->res(1, $wallet, 200);
    }

    public function getTransactions(Request $request){
        $trans = Transactions::Where('username', auth()->user()->username)->orderBy('id', 'desc')->take(200)->get();
if(count($trans) === 0) return $this->res(0, "No Transaction", 401);
  else  return $this->res(1, $trans, 200);
    }

    public function withdraw(Request $request, $walletType){
        $settings = Settings::find(1);
        $wallet = Wallets::Where('username', auth()->user()->username)->first();
        $bank = BankAccounts::Where('username', auth()->user()->username)->first();
        $transacations = Transactions::Where('username', auth()->user()->username)->Where('status', 0)->count();
if($transacations > 0){
    return $this->res(0, "You have a pending withdrawal", 401);
}
elseif($bank == null){
    return $this->res(0, "Kindly update your payment options first.", 401);
}
        else if($walletType == "main"){
    if($wallet->main_wallet >= $settings->minimum_withdrawal){
        $amount = $wallet->main_wallet;
        $withdrawn = $wallet->withdrawn + $amount;
        $update_wallet = Wallets::find($wallet->id);
        $update_wallet->main_wallet = 0;
        $update_wallet->withdrawn = $withdrawn;
        $update_wallet->save();

//insert transaction.
Transactions::create([
    'username' => auth()->user()->username,
    'type' => "Withdraw",
    'status' => 0,
    'amount' => $amount,
    'description' => $walletType,
        ]);
        return $this->res(1, "You have successfully withdrawn ".$amount. " USD. You will get payment after approval.", 200);
}
else{
    return $this->res(0, "Minimum withdrawal is ".$settings->minimum_withdrawal. " USD", 401);
}
}

else if($walletType == "referral"){
    if($wallet->referral_commission >= $settings->minimum_withdrawal){
        $amount = $wallet->referral_commission;
        $withdrawn = $wallet->withdrawn + $amount;
        $update_wallet = Wallets::find($wallet->id);
        $update_wallet->referral_commission = 0;
        $update_wallet->withdrawn = $withdrawn;
        $update_wallet->save();

//insert transaction.
Transactions::create([
    'username' => auth()->user()->username,
    'type' => "Withdraw",
    'status' => 0,
    'amount' => $amount,
    'description' => $walletType,
        ]);
        return $this->res(1, "You have successfully withdrawn ".$amount. " USD. You will get payment after approval.", 200);
}else{
    return $this->res(0, "Minimum withdrawal is ".$settings->minimum_withdrawal. " USD", 401);
}
}

else if($walletType == "vendor"){
    if($wallet->vendor_commission >= $settings->minimum_withdrawal){
        $amount = $wallet->vendor_commission;
        $withdrawn = $wallet->withdrawn + $amount;
        $update_wallet = Wallets::find($wallet->id);
        $update_wallet->vendor_commission = 0;
        $update_wallet->withdrawn = $withdrawn;
        $update_wallet->save();

//insert transaction.
Transactions::create([
    'username' => auth()->user()->username,
    'type' => "Withdraw",
    'status' => 0,
    'amount' => $amount,
    'description' => $walletType,
        ]);

        return $this->res(1, "You have successfully withdrawn ".$amount. " USD. You will get payment after approval.", 200);
}else{
    return $this->res(0, "Minimum withdrawal is ".$settings->minimum_withdrawal. " USD", 401);
}
}

        return $this->res(0, "Withdrawal failed!", 401);
    }

    public function getPaymentOptions(Request $request){
        if(Auth::check()){
            $username = auth()->user()->username;
            $bank = BankAccounts::Where('username', $username)->first();
if($bank == null) return $this->res(0, 'Payment options not found.', 401);
            return $this->res(1, $bank, 200);
    }
        else{
            return $this->res(0, 'Unauthorized!', 401);
    }

    }

    public function updatePaymentOptions(Request $request){
    	$validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3',
            'bank' => 'required|string|min:2',
            'number' => 'required|string|min:6',
        ]);
        if(Auth::check()){
    $username=auth()->user()->username;
    if ($validator->fails()) {
        return $this->res(0, "One ore more invalid input", 422);
    }
    else if($request->bitcoin != "" && strlen($request->bitcoin) < 10) {
        return $this->res(0, 'Bitcoin wallet is not valid', 401);
    }
else{
    $bank = BankAccounts::Where('username', $username)->first();
if($bank == null){
if($request->bitcoin == null){
    $request->bitcoin = "N/A";
}
    BankAccounts::create([
        'username' => auth()->user()->username,
        'bank' => $request->bank,
        'name' => $request->name,
        'number' => $request->number,
        'bitcoin' => $request->bitcoin,
            ]);

    return $this->res(1, 'Payment options updated', 200);
}
else{
    return $this->res(0, 'Sorry, you can not edit your payment options more than once for security reasons.', 401);
}
}
            }
else{
        return $this->res(0, 'Unauthorized!', 401);

}

    }


}
