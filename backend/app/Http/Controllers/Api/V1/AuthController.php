<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Users;
use App\Models\Wallets;
use App\Models\Referrals;
use App\Models\Settings;
use App\Models\PasswordResets;
use App\Services\Response;
use Validator;
use App\Http\Controllers\Api\V1\MailerController;

class AuthController extends Controller
{

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'registerByRefer', 'passwordReset', 'confirmPasswordReset', 'loggedUser']]);
    }

    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }
    
    public function sendMail($subject, $to, $from, $msg)
    {

        $mailer = new MailerController;
        $mailer->sendMail($subject, $to, $from, $msg);

    }

    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return $this->res(0, "Invalid email address or password", 422);
        }
        if (! $token = auth()->attempt($validator->validated())) {
            return $this->res(0, 'Email or password is wrong', 401);
        }
        return $this->res(1, $this->createNewToken($token), 200);

    }

    public function updatePassword(Request $request){
    	$validator = Validator::make($request->all(), [
            'oldPassword' => 'required|string|min:6',
            'newPassword' => 'required|string|min:6',
            'confirmPassword' => 'required|string|min:6',
        ]);
        if(Auth::check()){
    $username=auth()->user()->username;
    if ($validator->fails()) {
        return $this->res(0, "One ore more invalid input", 422);
    }
    else if($request->newPassword != $request->confirmPassword) {
        return $this->res(0, 'Password do not match', 401);
    }
else{
    $_user = Users::Where('username', $username)->first();
if(Hash::check($request->oldPassword, $_user->password)){
    $userId = $_user->id;
    $user = Users::find($userId);
    $user->password = bcrypt($request->newPassword);
    $user->save();
    return $this->res(1, 'Password updated', 200);
}
else{

    return $this->res(0, 'You entered a wrong password.', 401);

}
}
            }
else{
        return $this->res(0, 'Unauthorized!', 401);

}

    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            //'username' => 'required|string|between:2,25',
            'first_name' => 'required|string|between:2,50',
            'last_name' => 'required|string|between:2,50',
            //'country' => 'nullable|string',
//            'package' => 'required|string|between:2,50',
            //'phone' => 'required|string|between:7,15',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',

        ]);

        $ifEmailExists = Users::Where('email', $request->email)
        ->count();

        $ifUsernameExists = Users::Where('username', $request->username)
        ->count();

        if($ifEmailExists > 0){
            return response()->json(['status' => 0, 'message' => 'Email address already in Use'], 401);
        }
        else if ($request->first_name == null) {
            return response()->json(['status' => 0, 'message' => 'Enter first name'], 401);
        }
        else if ($request->last_name == null) {
            return response()->json(['status' => 0, 'message' => 'Enter last name'], 401);
        }
        /*else if ($request->country == "") {
            return response()->json(['status' => 0, 'message' => 'Country not selected'], 401);
        }*/
        /*
        else if($ifUsernameExists > 0){
            return response()->json(['status' => 0, 'message' => 'Username already in Use'], 401);
        }
        
        else if (strpbrk($request->username, ' ') !== false) {
            return response()->json(['status' => 0, 'message' => 'Username should not have white space'], 401);
        }
        else if($request->phone[0] == 0){
            return response()->json(['status' => 0, 'message' => 'Phone number can not start with zero (0).'], 401);
        }
        else if(!is_numeric($request->phone)){
            return response()->json(['status' => 0, 'message' => 'Phone number must be in digits.'], 401);
        }
        else if(strlen($request->phone) < 7){
            return response()->json(['status' => 0, 'message' => 'Phone number too short.'], 401);
        } */
        else if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)){
            return response()->json(['status' => 0, 'message' => 'Email address not accepted.'], 401);
        }
        else if(strlen($request->password) < 6){
            return response()->json(['status' => 0, 'message' => 'Password should be at least 6 characters long.'], 401);
        }
        else if($request->password != $request->password_confirmation){
            return response()->json(['status' => 0, 'message' => 'Passwords do not match.'], 401);
        }

        else if($validator->fails()){
            return $this->res(0, 'Registration failed, please try again.', 401);
        }
        $user = Users::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
                ));
                $wallet = Wallets::create([
                    'username' => $request->email
                        ]);

                return $this->res(1, 'Account created!', 200);
    }

    public function registerByRefer(Request $request, $referer) {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|between:2,25',
            'first_name' => 'required|string|between:2,50',
            'last_name' => 'required|string|between:2,50',
            'country' => 'required|string|between:2,50',
            'package' => 'required|string|between:2,50',
            'phone' => 'required|string|between:7,15',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
        $search_ref = Users::Where('username', $referer)->first()->username;
        $ifEmailExists = Users::Where('email', $request->email)
        ->count();

        $ifUsernameExists = Users::Where('username', $request->username)
        ->count();

        if($ifEmailExists > 0){
            return response()->json(['status' => 0, 'message' => 'Email address already in Use'], 401);
        }
        else if($ifUsernameExists > 0){
            return response()->json(['status' => 0, 'message' => 'Username already in Use'], 401);
        }
        else if ($request->country == null) {
            return response()->json(['status' => 0, 'message' => 'Country not selected'], 401);
        }
        else if (strpbrk($request->username, ' ') !== false) {
            return response()->json(['status' => 0, 'message' => 'Username should not have white space'], 401);
        }
        else if($request->phone[0] == 0){
            return response()->json(['status' => 0, 'message' => 'Phone number can not start with zero (0).'], 401);
        }
        else if(!is_numeric($request->phone)){
            return response()->json(['status' => 0, 'message' => 'Phone number must be in digits.'], 401);
        }
        else if(strlen($request->phone) < 7){
            return response()->json(['status' => 0, 'message' => 'Phone number too short.'], 401);
        }
        else if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)){
            return response()->json(['status' => 0, 'message' => 'Email address not accepted.'], 401);
        }
        else if(strlen($request->password) < 6){
            return response()->json(['status' => 0, 'message' => 'Password should be at least 6 characters long.'], 401);
        }
        else if($request->password != $request->password_confirmation){
            return response()->json(['status' => 0, 'message' => 'Passwords do not match.'], 401);
        }

        else if($validator->fails()){
            return $this->res(0, 'Registration failed, please try again.', 401);
        }
        else if($search_ref == null){
          return $this->res(0, 'Invalid referer.', 401);
        }
        $user = Users::create(array_merge(
                    $validator->validated(),
                    ['password' => bcrypt($request->password)]
                ));
                $wallet = Wallets::create([
                    'username' => $request->username
                        ]);
                        $refer = Referrals::create([
                            'username' => $request->username,
                            'referer' => $referer,
                            'package' => $request->package
                                ]);

                return $this->res(1, 'Account created!', 200);
    }


public function logout() {
        auth()->logout();
        return $this->res(1, 'Successfully signed out', 200);
    }

    public function passwordReset(Request $request)
    {

        $validator = Validator::make($request->all(), [
           'email' => 'required|string',
                    ]);

                    $ifEmailOrUsernameExists =
                    Users::Where('email', $request->email)
                    //->orWhere('username', $request->email)
                    ->count();

                    if($ifEmailOrUsernameExists > 0){
                        $code = Str::random(8);
                        $user = Users::where('email', $request->email)
                        ->orWhere('username', $request->email)
                        ->first();
                        //$user_agent = $_SERVER['HTTP_USER_AGENT'];
                        //$ip_address = $_SERVER['REMOTE_ADDR'];

                        $save = PasswordResets::create([
            'username' => $user->email,
            'code' => $code,
            'status' => 1,
                ]);

                        $web_settings = Settings::find(1)->first();

                        $message = "Hi ".$user->first_name."<br>Kindy use the code below for reset<br>Code: <b>".$code."</b><br><br>Regards!";
                       $send_mail = $this->sendMail($web_settings->title." Password Reset", $user->email, env('MAIL_FROM_ADDRESS'), $message);
                       return $this->res(1, 'We sent you an OTP via mail', 200);
                       //return $this->res(1, 'Test code: '.$code, 200);
                    }

                    if($validator->fails())
                    {
                        return $this->res(0, 'An error occured, please try again', 401);
                    }
                    else if($ifEmailOrUsernameExists == 0){
                        return $this->res(0, 'Account not found!', 401);
                    }
                    else
                    {
                        return $this->res(1, 'We sent a code to your mail.', 200);
                    }

    }

    public function confirmPasswordReset(Request $request){

        $validator = Validator::make($request->all(), [
            'password' => 'required|string',
            'password2' => 'required|string',
            'code' => 'required|string|max:10'
                     ]);

                     if(strlen($request->password) < 6)
                     {
                        return response()->json(['status' => 0, 'message' => 'Password should be at least 6 characters long.'], 401);
                    }
                    else if($request->password != $request->password2)
                    {
                        return response()->json(['status' => 0, 'message' => 'Passwords do not match.'], 401);
                    }
                    else if($validator->fails())
                    {
                        return response()->json(['status' => 0, 'message' => 'An error occured, please try again. Make sure all fields are correctly filled.' ], 401);
                    }
                    else
                    {
                        $ifCodeExists = PasswordResets::Where('status', 1)
                        ->Where('code', $request->code)
                        ->count();

                        if($ifCodeExists > 0)
                        {
                            $userDetails = PasswordResets::Where('status', 1)
                            ->Where('code', $request->code)
                            ->first();

                            $web_settings = Settings::find(1)->first();

                            DB::update('update password_resets set status = ? where username = ?',[0, $userDetails->username]);
                            DB::update('update users set password = ? where email = ?',[Hash::make($request->password), $userDetails->username]);
                            //$message = "Hi, <br>Your ".$web_settings->title." account password have been successfully reset. Contact us if you did not initiated the password reset<br><br>Regards!";
                            //$send_mail = $this->sendMail($web_settings->title." Password Reset", $userDetails->email, env('MAIL_FROM_ADDRESS'), $message);
                            return response()->json(['status' => 1, 'message' => 'Password reset successful.' ], 200);
                        }
                        else
                        {
                            return response()->json(['status' => 0, 'message' => 'Code is not valid' ], 401);
                        }

                    }
    }

    public function loggedUser()
    {
        if(Auth::check()) {
            $user = Users::find(auth()->user()->id);
            return $this->res(1, "Logged in", 200);
        }
        else return $this->res(0, 'Not logged in', 401);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return $this->res(1, auth()->user(), 200);
    }

    public function getUsername() {
        return auth()->user()->username;
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 1200,
            'user' => auth()->user()
        ]);
    }
}
