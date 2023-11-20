<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Settings;
use App\Services\Response;
use Illuminate\Support\Facades\Mail;

class MailerController extends Controller
{
    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }

    public function sendMail($subject, $to, $from, $msge)

    {
        try {

        $web_settings = Settings::find(1)
        ->first();

        //$subs = Subscribers::Where('email', $to)->Where('status', 0)->first();
        //if($subs == null){
        $unsubscribe_url = env('UNSUBSCRIBE_URL').$to;
        $from = env('MAIL_FROM_ADDRESS');

        $data = array('messageTitle' => $subject, 'companyName' => $web_settings->title, 'companyAddress' => $web_settings->address, 'companyWebsite' => $web_settings->url, 'web_settings'=>$web_settings, 'to' => $to, 'from' => $from, 'subject' => $subject, 'unsubscribe_url' => $unsubscribe_url, 'messageBody' => $msge);

        $sendmsg = Mail::send(['html' => 'mail.mailer_template'], $data, function($message) use ($web_settings, $to, $from, $subject) {
          $message->to($to, $web_settings->title)
          ->subject($subject)
          ->from($from, $web_settings->title);
   });
   //}
} catch(Exception $e) {
 //  return $e->getMessage();
}
    }

}
