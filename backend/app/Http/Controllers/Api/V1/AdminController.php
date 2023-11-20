<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Users;
use App\Models\Wallets;
use App\Models\Announcements;
use App\Models\Messages;
use App\Services\Response;
use App\Models\CloudMessagingUsers;
use Validator;

class AdminController extends Controller
{

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['listAnnouncements']]);
    }

    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }

/////////////////// Announcement /////////////////////

//list announcements
public function listAnnouncements(Request $request){
    if (auth()->user()->account_type != 'Admin') {
        return $this->res(0, 'Unauthorized!', 401);
    }

    $ann = Announcements::orderBy('id', 'desc')->take(20)->get();

  if($ann){

    return $this->res(1, $ann, 200);

  }
  else{
    return $this->res(0, 'Record not found', 200);
  }

  }

public function addAnnouncement(Request $request){
  $validator = Validator::make($request->all(), [
      'subject' => 'required|string|max:200',
      'message' => 'required|string|max:1000'
    ]);

    if (auth()->user()->account_type != 'Admin') {
        return $this->res(0, 'Unauthorized!', 401);
    }

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
//insert announcement.
$add = Announcements::create([
    'username' => auth()->user()->username,
    'subject' => $request->subject,
    'message' => $request->message
        ]);

   if($add){
       
       
       //add push notification to announcement
               $allDevices = CloudMessagingUsers::Where('status', 1)->get();

        if($allDevices != null){
             foreach ($allDevices as $value) {
                //run push notification api
                $data = [
    'notification' => array(
    'title' => $request->subject,
    'body' => $request->message,
    'image' => 'https://predict5ive-api.cpromoter.com/purple_ball.png'),
    "registration_ids" => [$value->device_id]
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

                }
        return $this->res(1, 'Notification sent', 200);
        }
        
    return $this->res(1, 'Announcement Added!', 200);
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

////////////////// Announcements /////////////////////


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

        $allDevices = CloudMessagingUsers::Where('status', 1)->get();

        if($allDevices != null){
             foreach ($allDevices as $value) {
                //run push notification api
                $data = [
    'notification' => array(
    'title' => $request->title,
    'body' => $request->body,
    'image' => 'https://predict5ive-api.cpromoter.com/purple_ball.png'),
    "registration_ids" => [$value->device_id]
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

                }
        return $this->res(1, 'Notification sent', 200);
        }

        return $this->res(0, 'Notification not sent', 422);
    }
//////// send push notification end ///////


}
