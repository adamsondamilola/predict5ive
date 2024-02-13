<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Users;
use App\Models\Games;
use App\Models\Wallets;
use App\Models\Announcements;
use App\Models\BookingCodes;
use App\Models\Messages;
use App\Services\Response;
use App\Models\CloudMessagingUsers;
use App\Http\Controllers\Api\V1\TelegramBotMessengerController;
use Validator;

class AdminController extends Controller
{

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['listAnnouncements', 'listBookingCodes', 'announcementGroups']]);
    }

    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }
    
    public function TelegramBotMessenger($chat_id, $msge)
    {

        $send = new TelegramBotMessengerController;
        $send->sendTelegramMessage($chat_id, $msge);

    }
    
        public function getGamesByTime(Request $request, $time){
        $today_date = date('Y-m-d');
        $yesterday_date = date('Y-m-d', time() - 60*60*24);
        $tomorrow_date = date('Y-m-d', time() + 60*60*24);

        if($time == "today"){
            $Games = Games::Where('status', 1)->Where('game_date', $today_date);
            
            $games = $Games->orderBy('game_date', 'desc')->get();
            if($games->count() < 1) return $this->res(0, "Our experts are still working on new games. We will notify you!", 401);
            else return $this->res(1, $games, 200);
        }
        else if($time == "tomorrow"){
            $Games = Games::Where('status', 1)->Where('game_date', $tomorrow_date); 
            
            $games = $Games->orderBy('game_date', 'desc')->get();
            if(empty($Games) || $Games->count() < 1) {
                return $this->res(0, "Our experts are still working on new games. We will notify you!", 401);
            }
            else {
                return $this->res(1, $games, 200);
            }
        }
        else if($time == "yesterday"){
            $games = Games::Where('status', 1)->Where('game_date', $yesterday_date)->orderBy('game_date', 'desc')->get();

            if(empty($games)) return $this->res(0, "Our experts are still working on new games. We will notify you!", 401);
            return $this->res(1, $games, 200);
        }
        else{
            return $this->res(0, "Invalid command!", 401);
        }

    }
    

/////////////////// Announcement /////////////////////

//list announcements
public function announcementGroups(Request $request){
    
    /*
    $allDevices = CloudMessagingUsers::Where('status', 1)->Orderby('id', 'desc')->take(300)->distinct()->get(['device_id']);

        if($allDevices != null){
        $ids = "";
foreach ($allDevices as $div){
$ids .= $div->device_id. "," ; 
}
$ids = substr($ids, 0, -1);
$ids = trim($ids);
$ids = implode(", ", array($ids));
$arr = explode('","', trim($ids, '"'));
$ids_array = preg_split("/[,]/",$ids);
return $ids_array;
}
*/

/*
    if (auth()->user()->account_type != 'Admin') {
        return $this->res(0, 'Unauthorized!', 401);
    }*/

    $ann = CloudMessagingUsers::orderBy('id', 'desc')->take(200)->distinct()->get('batch_number');

  if($ann){

    return $this->res(1, $ann, 200);

  }
  else{
    return $this->res(0, 'Record not found', 401);
  }

  }

//list announcements
public function listAnnouncements(Request $request){
    
    /*
    $allDevices = CloudMessagingUsers::Where('status', 1)->Orderby('id', 'desc')->take(300)->distinct()->get(['device_id']);

        if($allDevices != null){
        $ids = "";
foreach ($allDevices as $div){
$ids .= $div->device_id. "," ; 
}
$ids = substr($ids, 0, -1);
$ids = trim($ids);
$ids = implode(", ", array($ids));
$arr = explode('","', trim($ids, '"'));
$ids_array = preg_split("/[,]/",$ids);
return $ids_array;
}
*/


    if (auth()->user()->account_type != 'Admin') {
        return $this->res(0, 'Unauthorized!', 401);
    }

    $ann = Announcements::orderBy('id', 'desc')->take(20)->get();

  if($ann){

    return $this->res(1, $ann, 200);

  }
  else{
    return $this->res(0, 'Record not found', 401);
  }

  }

public function addAnnouncement(Request $request){
  $validator = Validator::make($request->all(), [
      'subject' => 'required|string|max:200',
      'message' => 'required|string|max:1000',
      'batch_number' => 'required|numeric|max:1000',
    ]);
    
    
          

    if (auth()->user()->account_type != 'Admin') {
        return $this->res(0, 'Unauthorized!', 401);
    }

    


//insert announcement.
else if($request->batch_number == 0){
    
    $ann = Announcements::Where('status', 1)
    ->Where('message', $request->message)
    ->Where('status', 1);

     if($validator->fails()){
      //return $validator->errors();
      return $this->res(0, 'An error occured, please try again. Make sure all fields are correctly filled.', 401);
            }
            else if($ann->first()){
                return $this->res(0, 'Announcement already exists!', 401);
          }
    
    //disable other active announcement
    $ann = Announcements::Where('status', 1)->first();
if($ann != null){
    $update = DB::update('update announcements set
    status = ?
    where status = ?',[0, 1]);
}

  $add = Announcements::create([
    'username' => auth()->user()->username,
    'subject' => $request->subject,
    'message' => $request->message
        ]); 
        
        //send message to telegram
        $this->TelegramBotMessenger('predict_5ive', $request->message);
        
        return $this->res(1, 'Announcement Posted!', 200);
}


       
       //add push notification to announcement
             //  $allDevices = CloudMessagingUsers::Where('status', 1)->get();
//$allDevices = CloudMessagingUsers::Where('status', 1)->distinct()->get(['device_id']);
$allDevices = CloudMessagingUsers::Where('platform', 'firebase')->Where('status', 1)->Where('batch_number', $request->batch_number)->get(['device_id']);

        if($allDevices != null){
            
/*
            foreach ($allDevices as $div){
//$ids .= $div->device_id. "," ; 
$ids_array = preg_split("/[,]/",$div->device_id);
 $data = [
    'notification' => array(
    'title' => $request->subject,
    'body' => $request->message,
    //'image' => 'https://predict5ive-api.cpromoter.com/purple_ball.png'
    ),
    "registration_ids" => $ids_array
];

$url = "https://fcm.googleapis.com/fcm/send";
        // Initializes a new cURL session
        $curl = curl_init($url);
        // Set the CURLOPT_RETURNTRANSFER option to true
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        // Set the CURLOPT_POST option to true for POST request
        curl_setopt($curl, CURLOPT_POST, true);
        // Set the request data as JSON using json_encode function
        curl_setopt($curl, CURLOPT_POSTFIELDS,  json_encode($data));
        // Set custom headers for RapidAPI Auth and Content-Type header
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer AAAAfffSqag:APA91bF4P_jG3pNGu9Qc4nd1iq2G_eERpfgKRLwHis5v0fVeoWuXnjYw0glpqQKGFxP6SfnBZOiDQ6DUy_P3px6kzhF30feuTyPTrCBP8p-E-XLpA_f1nfrN7mtqrGcN6UOUenRl42sG'
          ]);
        // Execute cURL request with all previous settings
        $response = curl_exec($curl);
        $json_obj   = json_decode($response);
        curl_close($curl);


    if($json_obj->success != 1){
        //deactivated device that did not received notification
        $update = CloudMessagingUsers::find($div->id);
        if($update != null){
            $update->status = 0;
            $update->save();
        }
        //return $this->res(1, 'Notification sent to '.$value->device_id, 200);
    } 
} */
            
            
            
        $ids = "";
foreach ($allDevices as $div){
$ids .= $div->device_id. "," ; 
}
$ids = substr($ids, 0, -1);
$ids = trim($ids);
$ids = implode(", ", array($ids));
$arr = explode('","', trim($ids, '"'));
$ids_array = preg_split("/[,]/",$ids);

      
                $data = [
    'notification' => array(
    'title' => $request->subject,
    'body' => $request->message,
    //'image' => 'https://predict5ive-api.cpromoter.com/purple_ball.png'
    ),
    "registration_ids" => $ids_array
];

$url = "https://fcm.googleapis.com/fcm/send";
        // Initializes a new cURL session
        $curl = curl_init($url);
        // Set the CURLOPT_RETURNTRANSFER option to true
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        // Set the CURLOPT_POST option to true for POST request
        curl_setopt($curl, CURLOPT_POST, true);
        // Set the request data as JSON using json_encode function
        curl_setopt($curl, CURLOPT_POSTFIELDS,  json_encode($data));
        // Set custom headers for RapidAPI Auth and Content-Type header
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer AAAAfffSqag:APA91bF4P_jG3pNGu9Qc4nd1iq2G_eERpfgKRLwHis5v0fVeoWuXnjYw0glpqQKGFxP6SfnBZOiDQ6DUy_P3px6kzhF30feuTyPTrCBP8p-E-XLpA_f1nfrN7mtqrGcN6UOUenRl42sG'
          ]);
        // Execute cURL request with all previous settings
        $response = curl_exec($curl);
        $json_obj   = json_decode($response);
        curl_close($curl);
        

/*
    if($json_obj->success != 1){
        //deactivated device that did not received notification
        $update = CloudMessagingUsers::find($value->id);
            $update->status = 0;
            $update->save();
        //return $this->res(1, 'Notification sent to '.$value->device_id, 200);
    } */

              //  }
        return $this->res(1, 'Notification sent', 200);
        }
        
    
    else
    {
        return $this->res(0, 'Operation Failed!', 401);
    }
}

//delete question
public function deleteAnnouncement(Request $request, $id){

    if (auth()->user()->account_type != 'Admin') {
        return $this->res(0, 'Unauthorized!', 401);
    }

    $ann = Announcements::find($id);
    $ann->delete();

     if($ann){
        return $this->res(1, 'Announcement Deleted', 200);
      }

      else
      {
        return $this->res(0, 'Operation Failed!', 401);
      }

  }

////////////////// Announcements End /////////////////////

////////////////// Booking Codes /////////////////////

//list BookingCodes
public function listBookingCodes(Request $request){
    /*
    if (auth()->user()->account_type != 'Admin') {
        return $this->res(0, 'Unauthorized!', 401);
    }*/

    $ann = BookingCodes::orderBy('id', 'desc')->take(20)->get();

  if($ann){

    return $this->res(1, $ann, 200);

  }
  else{
    return $this->res(0, 'Record not found', 200);
  }

  }

public function addBookingCode(Request $request){
  $validator = Validator::make($request->all(), [
      'bookmaker' => 'required|string|max:200',
      'code' => 'required|string|max:1000'
    ]);
    
    
          

    if (auth()->user()->account_type != 'Admin') {
        return $this->res(0, 'Unauthorized!', 401);
    }

    $ann = BookingCodes::Where('status', 1)
    ->Where('code', $request->code)
    ->Where('status', 1);

     if($validator->fails()){
      //return $validator->errors();
      return $this->res(0, 'An error occured, please try again. Make sure all fields are correctly filled.', 401);
            }
            else if($ann->first()){
                return $this->res(0, 'Code already exists!', 401);
          }

//disable other active announcement
    $ann = BookingCodes::Where('status', 1)->first();
/*
if($ann != null){
    $update = DB::update('update booking_codes set
    status = ?
    where status = ?',[0, 1]);
}*/
//insert announcement.
$add = BookingCodes::create([
    'username' => auth()->user()->username,
    'bookmaker' => $request->bookmaker,
    'code' => $request->code 
        ]);

   if($add){
        
    return $this->res(1, 'Booking Code Added!', 200);
    }
    else
    {
        return $this->res(0, 'Operation Failed!', 401);
    }
}

//delete question
public function deleteBookingCode(Request $request, $id){

    if (auth()->user()->account_type != 'Admin') {
        return $this->res(0, 'Unauthorized!', 401);
    }

    $ann = BookingCodes::find($id);
    $ann->delete();

     if($ann){
        return $this->res(1, 'Booking Code Deleted', 200);
      }

      else
      {
        return $this->res(0, 'Operation Failed!', 401);
      }

  }
  
////////////////// Booking Codes Ends /////////////////////



////////////////// Push Notification /////////////////////

    public function pushNotification(Request $request)
    {
        
        if (auth()->user()->account_type != 'Admin') {
        return $this->res(0, 'Unauthorized!', 401);
    }
    
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'body' => 'required|string',
                    ]);

         if($validator->fails()){
            //return response()->json($validator->errors()->toJson(), 400);
            return $this->res(0, 'Failed to post notification. Please try again', 422);
        }

        //$allDevices = CloudMessagingUsers::Where('status', 1)->get();
        
$allDevices = CloudMessagingUsers::Where('status', 1)->distinct()->get(['device_id']);

        if($allDevices != null){
        $ids = "";
foreach ($allDevices as $div){
$ids .= $div->device_id. "," ; 
}
$ids = substr($ids, 0, -1);
$ids = trim($ids);
$ids = implode(", ", array($ids));
$arr = explode('","', trim($ids, '"'));
$ids_array = preg_split("/[,]/",$ids);

            // foreach ($allDevices as $value) {
                //run push notification api
                $data = [
    'notification' => array(
    'title' => $request->title,
    'body' => $request->body,
    //'image' => 'https://predict5ive-api.cpromoter.com/purple_ball.png'
    ),
    "registration_ids" => $ids_array
];

$url = "https://fcm.googleapis.com/fcm/send";
        // Initializes a new cURL session
        $curl = curl_init($url);
        // Set the CURLOPT_RETURNTRANSFER option to true
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        // Set the CURLOPT_POST option to true for POST request
        curl_setopt($curl, CURLOPT_POST, true);
        // Set the request data as JSON using json_encode function
        curl_setopt($curl, CURLOPT_POSTFIELDS,  json_encode($data));
        // Set custom headers for RapidAPI Auth and Content-Type header
        curl_setopt($curl, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer AAAAfffSqag:APA91bF4P_jG3pNGu9Qc4nd1iq2G_eERpfgKRLwHis5v0fVeoWuXnjYw0glpqQKGFxP6SfnBZOiDQ6DUy_P3px6kzhF30feuTyPTrCBP8p-E-XLpA_f1nfrN7mtqrGcN6UOUenRl42sG'
          ]);
        // Execute cURL request with all previous settings
        $response = curl_exec($curl);
        $json_obj   = json_decode($response);
        curl_close($curl);

   /* if($json_obj->success != 1){
        //deactivated device that did not received notification
        $update = CloudMessagingUsers::find($value->id);
            $update->status = 0;
            $update->save();
        //return $this->res(1, 'Notification sent to '.$value->device_id, 200);
    }*/

              //  }
        return $this->res(1, 'Notification sent', 200);
        }

        return $this->res(0, 'Notification not sent', 422);
    }
//////// send push notification end ///////


}
