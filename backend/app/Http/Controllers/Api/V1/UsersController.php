<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Users;
use App\Models\Wallets;
use App\Models\Referrals;
use App\Models\Coupons;
use App\Models\Packages;
use App\Models\CloudMessagingUsers;
use App\Models\Transactions;
use App\Models\Announcements;
use App\Services\Response;
use Validator;

class UsersController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['announcement', 'createPushNotification']]);
    }

    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }

    public function getReferrals(Request $request){
        $refs = Referrals::Where('referer', auth()->user()->username)->orderBy('id', 'desc')->take(200)->get();
        $ref_count = Referrals::Where('referer', auth()->user()->username)->count();
        return $this->res(1, $refs, 200);
    }

    public function wallet(Request $request){
        $wallet = Wallets::Where('username', auth()->user()->username)->first();
        return $this->res(1, $wallet, 200);
    }

        public function activatePackage(Request $request){
        $validator = Validator::make($request->all(), [
            'coupon' => 'required|string|max:10'
             ]);

        $get_coupon = Coupons::Where('coupon', $request->coupon)->Where('package', auth()->user()->package)->first();
        if ($validator->fails()) {
            return $this->res(0, "Invalid input", 422);
        }
        else if(!empty($get_coupon) && $get_coupon->status == 0){
        //update coupon
        $update_coupon = Coupons::find($get_coupon->id);
        $update_coupon->status = 1;
        $update_coupon->user = auth()->user()->username;
        $update_coupon->save();
        //update user profile
        $update_profile = Users::find(auth()->user()->id);
        $update_profile->package_status = 1;
        $update_profile->save();

        $package = Packages::Where('package', auth()->user()->package)->first();

        //update vendor_commission.
        $commission = $package->amount * 0.15;
        $wallet = Wallets::Where('username', $update_coupon->username)->first();
        $referral_commission = $wallet->referral_commission + $commission;
        $update_wallet = Wallets::find($wallet->id);
        $update_wallet->referral_commission = $referral_commission;
        $update_wallet->save();

//insert transaction.
Transactions::create([
    'username' => $update_coupon->username,
    'type' => "Vendor Commission",
    'status' => 1,
    'amount' => $commission,
    'description' => "Vendor Commission",
        ]);

        //update referral.
        $commission = $package->amount * 0.20;
        $refs = Referrals::Where('username', auth()->user()->username)->Where('bonus', 0)->first();
        if($refs && $refs != null){
        //update referral bonus.
        $update_ref = Referrals::find($refs->id);
        $update_ref->bonus = $commission;
        //update referral wallet.
        $wallet = Wallets::Where('username', $refs->referer)->first();
        $referral_commission = $wallet->referral_commission + $commission;
        $update_wallet = Wallets::find($wallet->id);
        $update_wallet->referral_commission = $referral_commission;
        $update_wallet->save();

//insert transaction.
Transactions::create([
    'username' => $refs->referer,
    'type' => "Referral Commission",
    'status' => 1,
    'amount' => $commission,
    'description' => "Referral Commission",
        ]);

}
        return $this->res(1, "Package successfully activated.", 200);
        }
        else if(!empty($get_coupon) && $get_coupon->status == 1){
            return $this->res(0, "Coupon code already in use by ".$get_coupon->username, 401);
        }
        else
        {
            return $this->res(0, "Invalid coupon code.", 401);
        }

        return $this->res(0, "Something went wrong. Please, try again.", 401);
    }

    public function announcement(Request $request){

        $ann = Announcements::Where('status', 1)->orderBy('id', 'desc')->first();

      if($ann){

        return $this->res(1, $ann, 200);

      }
      else{
        return $this->res(0, 'Record not found', 200);
      }

      }
      
      public function createPushNotification(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'string|nullable',
            'platform' => 'required|string|between:2,50',
            'device_id' => 'required|string|between:2,500',
                    ]);

         if($validator->fails()){
            //return response()->json($validator->errors()->toJson(), 400);
            return $this->res(0, 'Failed to create device id. Please try again', 400);
        }
        else if(CloudMessagingUsers::Where('email', $request->email)->count() > 0 && !empty($request->email)){
            return $this->res(0, 'User Device already created', 400);
        }

        else if(CloudMessagingUsers::Where('device_id', $request->device_id)->count() > 0){
            return $this->res(0, 'Device already created', 400);
        }
        /*
        else if(CloudMessagingUsers::Where('device_id', $request->device_id)->count() > 0){
            return $this->res(0, 'Device already created', 400);
        }*/

        $user = CloudMessagingUsers::create([
            'email' => $request->email,
            'platform' => $request->platform,
            'device_id' => $request->device_id,
        ]);

        return $this->res(1, 'Device registration id created', 200);
    }

}
