<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Users;
use App\Models\Wallets;
use App\Models\Referrals;
use App\Services\Response;
use App\Models\Coupons;
use App\Models\Packages;
use Validator;

class VendorsController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getVendorsByCountry']]);
    }

    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }

    public function getVendorsByCountry(Request $request, $country){
        $vendors = Users::Where('status', 1)->Where('account_type', 'Vendor')
        ->Where('country', $country)->orderBy('id', 'desc')->take(200)->get();
if(count($vendors) === 0) return $this->res(0, "No vendor found for ".$country, 401);
  else  return $this->res(1, $vendors, 200);
    }

    public function getCouponsByVendor(Request $request){
        $coupons = Coupons::Where('username', auth()->user()->username)->orderBy('id', 'desc')->take(200)->get();
if(count($coupons) === 0) return $this->res(0, "No coupon ", 401);
  else  return $this->res(1, $coupons, 200);
    }

    public function getUsedCouponsByVendor(Request $request){
        $coupons = Coupons::Where('username', auth()->user()->username)->Where('status', 1)->orderBy('id', 'desc')->take(200)->get();
if(count($coupons) === 0) return $this->res(0, "No coupon ", 401);
  else  return $this->res(1, $coupons, 200);
    }

    public function getUnusedCouponsByVendor(Request $request){
        $coupons = Coupons::Where('username', auth()->user()->username)->Where('status', 0)->orderBy('id', 'desc')->take(200)->get();
if(count($coupons) === 0) return $this->res(0, "No coupon ", 401);
  else  return $this->res(1, $coupons, 200);
    }

    public function generateCoupon(Request $request){
        $validator = Validator::make($request->all(), [
            'number' => 'required|numeric',
            'package' => 'required|string'
             ]);

             $package = Packages::Where('package', $request->package)->first();

        if ($validator->fails()) {
            return $this->res(0, "Invalid input", 422);
        } else if($request->number > 10){
            return $this->res(0, "You can generate 10 maximum", 401);
} else if($request->number < 1){
    return $this->res(0, "You can generate 1 minimum", 401);
}else if(auth()->user()->coupons < $request->number){
    return $this->res(0, "Insufficient coupon code", 401);
}else if(auth()->user()->account_type != "Vendor" && auth()->user()->account_type != "Admin"){
    return $this->res(0, "Unauthorized!", 401);
}
else{

$x = 1;
    while($x <= $request->number)
{
    $rand1 = rand(11111,99999);
    $rand2 = rand(11111,99999);
    $coupon = $rand1."".$rand2;

    Coupons::create([
        'username' => auth()->user()->username,
        'coupon' => $coupon,
        'package' => $request->package,
        'amount' => $package->amount,
        'user' => "",
            ]);

//update vendor coupon count.
$usr = Users::find(auth()->user()->id);
$usr->coupons = $usr->coupons - 1;
$usr->save();

    $x++;
}

//$coupons = Coupons::Where('username', auth()->user()->username)->orderBy('id', 'desc')->take(200)->get();
return $this->res(1, "Successfully generated!", 200);

}

return $this->res(0, "Coupon not generated!", 401);
    }

}
