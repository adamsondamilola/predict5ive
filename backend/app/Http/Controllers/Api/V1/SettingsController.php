<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Packages;
use App\Models\Settings;
use App\Models\FAQS;
use App\Models\CurrencyRates;
use App\Services\Response;
use Validator;

class SettingsController extends Controller
{

    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }

    public function appVersionControl(Request $request){
        return response()->json(['status' => 1, 'androidVersion' => '1.1.0', 'iosVersion' => '1.1.0', 'android_link' => 'https://play.google.com/store/apps/details?id=com.cpromoter.predict5ive', 'ios_link' => 'https://'], 200);
    }

    public function Packages(Request $request)
    {
        $packages = Packages::Where('status', 1)->orderBy('id', 'asc')->get();
        return $this->res(1, $packages, 200);
    }

    public function CurrencyRates(Request $request, $country)
    {
        $crates = CurrencyRates::Where('status', 1)->Where('country', $country)->orderBy('id', 'desc')->first();
        return $this->res(1, $crates, 200);
    }

    public function WebsiteSettings(Request $request)
    {
        $settings = Settings::find(1);
        return $this->res(1, $settings, 200);
    }

    public function Faqs(Request $request)
    {
        $faqs = FAQS::Where('status', 1)->orderBy('id', 'asc')->get();
        return $this->res(1, $faqs, 200);
    }


    public function GetCountry(Request $request)
    {
$ip_address=$_SERVER['REMOTE_ADDR'];
if(isset($ip_address)) {
    $details = file_get_contents('http://www.geoplugin.net/json.gp?ip=' . $ip_address);
    $json = json_decode($details);
    if($json->geoplugin_status == '200')
    return $this->res(1, $json->geoplugin_countryName, 200);
    //return $json->geoplugin_countryName;
    else
    $details = file_get_contents('http://www.geoplugin.net/json.gp?ip=IP_ADDRESS');
    $json = json_decode($details);
    if($json->geoplugin_status == '200')
    return $this->res(1, $json->geoplugin_countryName, 200);
    else
    return $this->res(0, 'Error getting country name.', 401);
} else {
    return $this->res(0, 'IP is empty.', 401);
}
    }

}
