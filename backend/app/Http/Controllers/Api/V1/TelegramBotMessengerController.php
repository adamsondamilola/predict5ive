<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Settings;
use App\Services\Response;
use Illuminate\Support\Facades\Mail;

class TelegramBotMessengerController extends Controller
{
    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }

    
        public function sendTelegramMessage($chat_id, $msge)

    {
        try {

        $url = "https://api.telegram.org/bot".env('TELEGRAM_BOT_TOKEN')."/sendMessage?chat_id=@".$chat_id."&text=".urlencode($msge);
        // Initializes a new cURL session
        $curl = curl_init($url);
        // Set the CURLOPT_RETURNTRANSFER option to true
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        // Execute cURL request with all previous settings
        $response = curl_exec($curl);
        $json_obj   = json_decode($response);
        curl_close($curl);
        
        if($json_obj && $json_obj != null){
            if($json_obj->ok == true){
                
            }
            else {
                
            }
        }
        

        } catch(Exception $e) {
 //  return $e->getMessage();
}
    }

}
