<?php

namespace App\Http\Controllers\Api\V1;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users;
use App\Models\Games;
use App\Models\GameVotes;
use App\Models\Packages;
use App\Models\Wallets;
use App\Models\Transactions;
use App\Models\BookingCodes;
use App\Services\Response;
use App\Http\Controllers\Api\V1\TelegramBotMessengerController;
use Validator;

// Get the currently authenticated user...
//$username = Auth::user(); //auth()->user()->username; //
// Get the currently authenticated user's ID...
//$id = Auth::id();

class GamesController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getGames', 'getGameById', 'oldGames', 'getGamesByTime', 'listBookingCodes']]);
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

    public function newGame(Request $request){
    	$validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'country' => 'required|string',
            'country_code' => 'required|string',
            'league' => 'required|string',
            'home_team' => 'required|string',
            'away_team' => 'required|string',
            'home_logo' => 'string|nullable',
            'away_logo' => 'string|nullable',
            'prediction' => 'required|string',
            'game_type' => 'required|string',
            'game_date' => 'required|string',
            'game_time' => 'required|string',
            'accuracy' => 'required|string',
            'odds' => 'required|string',
            'status' => 'required|integer',
            'win_or_lose' => 'required|integer',
            'is_premium' => 'required|integer',
        ]);

        if(Auth::check()){
        if($request->username != auth()->user()->username){
            return $this->res(0, 'Invalid User!', 401);
        }

        }
        else{
            return $this->res(0, 'Not logged in!', 401);
        }

        if ($validator->fails()) {
            return $this->res(0, "Invalid input", 422);
        }
        if (auth()->user()->account_type != 'Admin') {
            return $this->res(0, 'Unauthorized!', 401);
        }
        $games = Games::create(array_merge(
            $validator->validated()
        ));

        //if game is today, send it to telegram as well
        if($request->game_date == date('Y-m-d')){
            //send message to telegram
            $game = $request->home_team." VS ".$request->away_team."\n";
            $game .= "Tips: ".$request->prediction."\n";
            $game .= "Odds: ".$request->odds."\n";
            $game .= "Sport: ".$request->game_type."\n";
            $game .= "Country: ".$request->country."\n";
            $game .= "League: ".$request->league."\n";
            $game .= "Time: ".$request->game_time."(+1 GMT)\n";
        $this->TelegramBotMessenger('predict_5ive', $game);
        }

        return $this->res(1, "New game posted   ", 200);
    }

    public function updateGame(Request $request){
    	$validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'country' => 'required|string',
            'country_code' => 'required|string',
            'league' => 'required|string',
            'home_team' => 'required|string',
            'away_team' => 'required|string',
            'home_logo' => 'string|nullable',
            'away_logo' => 'string|nullable',
            'prediction' => 'required|string',
            'game_type' => 'required|string',
            'game_date' => 'required|string',
            'game_time' => 'required|string',
            'accuracy' => 'required|string',
            'odds' => 'required|string',
            'status' => 'required|integer',
            'win_or_lose' => 'required|integer',
            'is_premium' => 'required|integer',
        ]);
        if(!Auth::check()){
            return $this->res(0, 'Not logged in!', 401);
        }
        if ($validator->fails()) {
            return $this->res(0, "Invalid input", 422);
        }
        if (auth()->user()->account_type != 'Admin') {
            return $this->res(0, 'Unauthorized!', 401);
        }
        $games = Games::find($request->id);
        $games->country = $request->country;
        $games->country_code = $request->country_code;
        $games->league = $request->league;
        $games->home_team = $request->home_team;
        $games->away_team = $request->away_team;
        $games->home_logo = $request->home_logo;
        $games->away_logo = $request->away_logo;
        $games->result = $request->result;
        $games->prediction = $request->prediction;
        $games->game_date = $request->game_date;
        $games->game_time = $request->game_time;
        $games->game_type = $request->game_type;
        $games->accuracy = $request->accuracy;
        $games->odds = $request->odds;
        $games->status = $request->status;
        $games->win_or_lose = $request->win_or_lose;
        $games->is_premium = $request->is_premium;
        $games->save();

        //if game is update, send it to telegram as well
        if($games){
            //send message to telegram
            $game = "UPDATED!";
            $game .= $request->home_team." VS ".$request->away_team."\n";
            $game .= "Tips: ".$request->prediction."\n";
            $game .= "Odds: ".$request->odds."\n";
            $game .= "Sport: ".$request->game_type."\n";
            $game .= "Country: ".$request->country."\n";
            $game .= "League: ".$request->league."\n";
            $game .= "Time: ".$request->game_time."(+1 GMT)\n";
        $this->TelegramBotMessenger('predict_5ive', $game);
        }


        return $this->res(1, "Game updated", 200);
    }

    public function updateGameOutcome(Request $request){
    	$validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'result' => 'string|nullable',
            'win_or_lose' => 'required|integer',
        ]);
        if(!Auth::check()){
            return $this->res(0, 'Not logged in!', 401);
        }
        if ($validator->fails()) {
            return $this->res(0, "Invalid input", 422);
        }
        if (auth()->user()->account_type != 'Admin') {
            return $this->res(0, 'Unauthorized!', 401);
        }
        $games = Games::find($request->id);
        $games->result = $request->result;
        $games->win_or_lose = $request->win_or_lose;
        $games->save();
        return $this->res(1, "Game updated", 200);
    }

    public function deleteGameById(Request $request, $id){
        if (auth()->user()->account_type != 'Admin') {
            return $this->res(0, 'Unauthorized!', 401);
        }

        $games = Games::find($id);
        $games->delete();
        return $this->res(1, "Game deleted", 200);
    }

    public function getGameById(Request $request, $id){
        $games = Games::find($id);
        return $this->res(1, $games, 200);
    }

    public function getGames(Request $request){
        $today_date = "";
        $today_date = date('Y-m-d') ;
        //$yesterday_date = d ;

        $games = Games::Where('status', 1)->Where('is_premium', 0)->orderBy('game_date', 'desc')->take(20)->get();
        return $this->res(1, $games, 200);
    }

    public function pendingGames(Request $request){
        if (auth()->user()->account_type != 'Admin') {
            return $this->res(0, 'Unauthorized!', 401);
        }

        $games = Games::Where('status', 0)->orderBy('game_date', 'desc')->take(20)->get();
        return $this->res(1, $games, 200);
    }

    public function oldGames(Request $request){

        $games = Games::Where('status', 1)->Where('is_premium', 0)->Where('result', '!=', null)->orderBy('game_date', 'desc')->take(50)->get();
        return $this->res(1, $games, 200);
    }

    public function oldPremiumGames(Request $request){

        $games = Games::Where('status', 1)->Where('is_premium', 1)->Where('result', '!=', null)->orderBy('game_date', 'desc')->take(50)->get();
        return $this->res(1, $games, 200);
    }

    public function adminGetGames(Request $request){
        if (auth()->user()->account_type != 'Admin') {
            return $this->res(0, 'Unauthorized!', 401);
        }

        $games = Games::orderBy('game_date', 'desc')->take(50)->get();
        return $this->res(1, $games, 200);
    }

    public function adminApproveGame(Request $request, $id, $actionType){
        $amount = 0.2;
        if (auth()->user()->account_type != 'Admin') {
            return $this->res(0, 'Unauthorized!', 401);
        }

        $game = Games::Where('status', 0)->Where('id', $id)->first();

if($actionType == 1){
        $get_wallet = Wallets::Where('username', $game->username)->first();
        $amount = $amount + $get_wallet->main_wallet;
        $wallet = Wallets::find($get_wallet->id);
        $wallet->main_wallet = $amount;
        $wallet->save();

        //Intert in transactions.
        Transactions::create([
            'username' => $get_wallet->username,
            'type' => "Game Commission",
            'status' => 1,
            'amount' => $amount,
            'description' => "Game Forecast Commission on package."
                ]);

                return $this->res(1, "Game approved!", 200);
    }
elseif($actionType == 0){
    $game = Games::find($id);
    $game->status = 2;
    $game->save();
    //$game->delete();
    return $this->res(1, "Game rejected!.", 200);
}
else{
    return $this->res(0, "Something went wrong", 401);
}
    }

    public function getGamesByTime(Request $request, $time){
        $today_date = date('Y-m-d');
        $yesterday_date = date('Y-m-d', time() - 60*60*24);
        $tomorrow_date = date('Y-m-d', time() + 60*60*24);

        if($time == "today"){
            $Games = Games::Where('status', 1)->Where('is_premium', 0)->Where('game_date', $today_date);
            //$Games = Games::Where('status', 1)->Where('game_date', $today_date);

            $games = $Games->orderBy('game_date', 'desc')->get();
            if($games->count() < 1) return $this->res(0, "Our experts are still working on new games. We will notify you!", 401);
            else return $this->res(1, $games, 200);
        }
        else if($time == "tomorrow"){
            $Games = Games::Where('status', 1)->Where('is_premium', 0)->Where('game_date', $tomorrow_date);
            //$Games = Games::Where('status', 1)->Where('game_date', $tomorrow_date);

            $games = $Games->orderBy('game_date', 'desc')->get();
            if(empty($Games) || $Games->count() < 1) {
                return $this->res(0, "Our experts are still working on new games. We will notify you!", 401);
            }
            else {
                return $this->res(1, $games, 200);
            }
        }
        else if($time == "yesterday"){
            $games = Games::Where('status', 1)->Where('is_premium', 0)->Where('game_date', $yesterday_date)->orderBy('game_date', 'desc')->get();
            //$games = Games::Where('status', 1)->Where('game_date', $yesterday_date)->orderBy('game_date', 'desc')->get();

            if(empty($games)) return $this->res(0, "Our experts are still working on new games. We will notify you!", 401);
            return $this->res(1, $games, 200);
        }
        else{
            return $this->res(0, "Invalid command!", 401);
        }

    }

        public function getPremiumGamesByTime(Request $request, $time){
        $today_date = date('Y-m-d');
        $yesterday_date = date('Y-m-d', time() - 60*60*24);
        $tomorrow_date = date('Y-m-d', time() + 60*60*24);

        if($time == "today"){
            $Games = Games::Where('status', 1)->Where('is_premium', 1)->Where('game_date', $today_date);
            $games = $Games->orderBy('game_date', 'desc')->get();
            if($games->count() < 1) return $this->res(0, "Our experts are still working on new games. We will notify you!", 401);
            else return $this->res(1, $games, 200);
        }
        else if($time == "tomorrow"){
            $Games = Games::Where('status', 1)->Where('is_premium', 1)->Where('game_date', '>=', $tomorrow_date);
            $games = $Games->orderBy('game_date', 'asc')->take(50)->get();
            if(empty($Games) || $Games->count() < 1) {
                return $this->res(0, "Our experts are still working on new games. We will notify you!", 401);
            }
            else {
                return $this->res(1, $games, 200);
            }
        }
        else if($time == "yesterday"){
            $games = Games::Where('status', 1)->Where('is_premium', 1)->Where('game_date', $yesterday_date)->orderBy('game_date', 'desc')->get();
            if(empty($games)) return $this->res(0, "Our experts are still working on new games. We will notify you!", 401);
            return $this->res(1, $games, 200);
        }
        else{
            return $this->res(0, "Invalid command!", 401);
        }

    }

    public function voteById(Request $request, $id, $voteType){

        $games = Games::find($id);

        if(Auth::check()){

            //$username = auth()->user()->username;
            $username = auth()->user()->email;
            $package = auth()->user()->package;
            $package_status = auth()->user()->package_status;

//admin
            if(auth()->user()->account_type == "Admin"){

                $game_clicks =
                GameVotes::Where('username', $username)
                ->Where('game_id', $id)
                ->first();

             //   if($game_clicks == null){

                    if($voteType == "upvote"){
                    //update game
                    $clicks = 1 + $games->clicks;
                    $votes = 1 + $games->upvotes;
                    $games->clicks = $clicks;
                    $games->upvotes = $votes;
                    $games->save();

        }
        if($voteType == "downvote"){
                   //update game
                   $clicks = 1 + $games->clicks;
                   $votes = 1 + $games->downvotes;
                   $games->clicks = $clicks;
                   $games->downvotes = $votes;
                   $games->save();

                }

/*
                $amount = 0.01;

                //$amount = Packages::Where('package', $package)->first()->earn / 10;

                $get_wallet = Wallets::Where('username', $username)->first();

                $amount = $amount + $get_wallet->main_wallet;

                $wallet = Wallets::find($get_wallet->id);
                $wallet->main_wallet = $amount;
                $wallet->save();*/
               // }


                }

//users
           // else if($games->status == 1 && $package_status == 1){

            $game_clicks =
            GameVotes::Where('username', $username)
            ->Where('game_id', $id)
            ->first();

            $gam = Games::Where('id', $id)->Where('result', null)->first();

                if($gam == null){
                return $this->res(0, "Sorry, you cannot voted on this game. Vote today or tomorrow games.", 401);
                }

            if($game_clicks == null){


                if($voteType == "upvote"){
                     GameVotes::create([
                        'username' => $username,
                        'game_id' => $id,
                        'vote' => 1,
                            ]);

                //update game
                $clicks = 1 + $games->clicks;
                $votes = 1 + $games->upvotes;
                $games->clicks = $clicks;
                $games->upvotes = $votes;
                $games->save();

    }
                if($voteType == "downvote"){
                    GameVotes::create([
                       'username' => $username,
                       'game_id' => $id,
                       'vote' => 0,
                           ]);

               //update game
               $clicks = 1 + $games->clicks;
               $votes = 1 + $games->downvotes;
               $games->clicks = $clicks;
               $games->downvotes = $votes;
               $games->save();

            }

/*
            $amount = 0.01;

            //$amount = Packages::Where('package', $package)->first()->earn / 10;

            $get_wallet = Wallets::Where('username', $username)->first();

            $amount = $amount + $get_wallet->main_wallet;

            $wallet = Wallets::find($get_wallet->id);
            $wallet->main_wallet = $amount;
            $wallet->save(); */
            }else{
                return $this->res(0, "You already voted on this game.", 401);
            }

/*            }
            else{
                return $this->res(0, "Sorry, only subscribers can vote and earn.", 401);
            }*/

            }
else{
    return $this->res(0, "Not logged in", 401);
}
        return $this->res(1, "You have voted!", 200);
    }

    public function userGetGames(Request $request){
        $games = Games::Where('username', auth()->user()->username)->orderBy('game_date', 'desc')->take(50)->get();
        if($games){
            return $this->res(1, $games, 200);
        }
        else{
            return $this->res(0, 'Our experts are still working on new games. We will notify you!', 401);
        }
    }

    public function userNewGame(Request $request){

        $today_date = $today_date_time = "";
        $today_date = date('Y-m-d') ;
        $today_date_time = date('Y-m-d H:i:s') ;

    	$validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'country' => 'required|string',
            'league' => 'required|string',
            'home_team' => 'required|string',
            'away_team' => 'required|string',
            'prediction' => 'required|string',
            'game_date' => 'required|string',
            'game_time' => 'required|string',
        ]);

        if(Auth::check()){
        if($request->username != auth()->user()->username){
            return $this->res(0, 'Invalid User!', 401);
        }
else if(auth()->user()->package_status != 1){
    return $this->res(0, 'You are not active on any package', 401);

}
        }
        else{
            return $this->res(0, 'Not logged in!', 401);
        }

        if ($validator->fails()) {
            return $this->res(0, "Invalid input", 422);
        }
        /* if (auth()->user()->account_type != 'Admin') {
            return $this->res(0, 'Unauthorized!', 401);
        } */
        $game = Games::Where('username', auth()->user()->username)->orderBy('id', 'desc')->first();
if($game){
    $games = Games::Where('username', auth()->user()->username)->Where('date_posted', $today_date);
if($games->count() > 4){
    return $this->res(0, "Sorry, you can not post more than 5 games a day.", 422);
}
}
        $games = Games::create(array_merge(
            $validator->validated()
        ));
        return $this->res(1, "New game posted but we will review before approval.", 200);
    }


    //list BookingCodes for all
public function listBookingCodes(Request $request){

    $ann = BookingCodes::Where('status', 1)
    ->Where('date_posted', '!=', null)->
    orderBy('id', 'desc')
    ->take(100)
    ->get();

  if($ann){

    return $this->res(1, $ann, 200);

  }
  else{
    return $this->res(0, 'Record not found', 200);
  }

  }


}
