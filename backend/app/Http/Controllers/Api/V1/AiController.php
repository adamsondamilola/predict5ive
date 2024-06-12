<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users;
use App\Models\Posts;
use App\Models\PostClicks;
use App\Models\Packages;
use App\Models\Wallets;
use App\Services\Response;
use Validator;

class AiController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['predictGameRequest']]);
    }

    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }

    public function predictGameRequest(Request $request){
    	$validator = Validator::make($request->all(), [
            'home' => 'required|string',
            'away' => 'required|string',
            'sport' => 'string|nullable'
        ]);
        $home = $request->home;
        $away = $request->away;
        $sport = $request->sport;
        if($home == '' || $home == null){
            return $this->res(0, 'Enter home team name', 401);
        }
        else if($away == '' || $away == null){
            return $this->res(0, 'Enter away team name', 401);
        }
        else if ($validator->fails()) {
            return $this->res(0, "Invalid input", 422);
        }
        else {
            $predict = "Predict the match between ".$home." and ".$away;
            if($sport != '' && $sport != null){
                $predict = "Predict the ".$sport." match between ".$home." and ".$away;
            }

            //Bard Gemini API
            try {

                $data = [
                    'contents' => [array(
                    'parts' => [array('text' => $predict)]
                    )]
                ];

                $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=".env('GOOGLE_BARD_TOKEN');
                // Initializes a new cURL session
                $curl = curl_init($url);
                // Set the CURLOPT_RETURNTRANSFER option to true
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                // Set the CURLOPT_POST option to true for POST request
                curl_setopt($curl, CURLOPT_POST, true);
                // Set the request data as JSON using json_encode function
                curl_setopt($curl, CURLOPT_POSTFIELDS,  json_encode($data));
                curl_setopt($curl, CURLOPT_HTTPHEADER, [
                    'Content-Type: application/json'
                  ]);
                // Execute cURL request with all previous settings
                $response = curl_exec($curl);
                $json_obj   = json_decode($response);
                curl_close($curl);

                if($json_obj){
                    $ifError = $json_obj->error ?? null;
                    if($ifError != null){
                        return $this->res(0, "An error occurred. Please try again", 400);
                    }
                    else {
                        //return $json_obj->candidates[0];
                        $result = $json_obj->candidates[0]->content->parts[0]->text ?? null;
                        if($result != null){
                            $result = str_replace(":**", " 🔵 ", $result);
                            $result = str_replace("**", " 🔵 ", $result);
                            $result = str_replace("*", " ▶ ", $result);
                            return $this->res(1, $result, 200);
                        }
                        return $this->res(0, "Something went wrong, please try again", 400);
                    }
                }


                } catch(Exception $e) {
         //  return $e->getMessage();
        }

        }
        /*$posts = Posts::create(array_merge(
            $validator->validated()
        ));*/
        return $this->res(1, "Sorry, we are unable to process your request right now", 200);
    }

}
