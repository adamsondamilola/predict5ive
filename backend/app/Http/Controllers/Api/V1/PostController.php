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

class PostController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getPosts', 'getPostById', 'getPostsByTime']]);
    }

    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }

    public function newPost(Request $request){
    	$validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'post_title' => 'required|string',
            'post_image' => 'required|string',
            'post_content' => 'required|string',
            'post_date' => 'required|string',
            'status' => 'required|integer',
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
        $posts = Posts::create(array_merge(
            $validator->validated()
        ));
        return $this->res(1, "New post posted   ", 200);
    }

    public function updatePost(Request $request){
    	$validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'post_title' => 'required|string',
            'post_image' => 'required|string',
            'post_date' => 'required|string',
            'post_content' => 'required|string',
            'status' => 'required|integer'
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
        $posts = Posts::find($request->id);
        $posts->post_title = $request->post_title;
        $posts->post_image = $request->post_image;
        $posts->post_content = $request->post_content;
        $posts->post_date = $request->post_date;
        $posts->clicks = $request->clicks;
        $posts->status = $request->status;
        $posts->save();
        return $this->res(1, "Post updated", 200);
    }

    public function deletePostById(Request $request, $id){
        if (auth()->user()->account_type != 'Admin') {
            return $this->res(0, 'Unauthorized!', 401);
        }

        $posts = Posts::find($id);
        $posts->delete();
        return $this->res(1, "Post deleted", 200);
    }

    public function getPostById(Request $request, $id){

        $posts = Posts::find($id);
        $clicks = 1 + $posts->clicks;
        $posts->clicks = $clicks;
        $posts->save();

        if(Auth::check()){
            $username = auth()->user()->username;
            $package = auth()->user()->package;
            $package_status = auth()->user()->package_status;
            $today_date = date('Y-m-d');

            if($posts->post_date == $today_date && $package_status == 1){

            $post_clicks =
            PostClicks::Where('username', $username)
            ->Where('post_id', $id)
            ->first();

            if($post_clicks == null){
            $save = PostClicks::create([
            'username' => $username,
            'post_id' => $id,
                ]);
            if($save){
            $amount = 0;

            $amount = Packages::Where('package', $package)->first()->earn;

            $get_wallet = Wallets::Where('username', $username)->first();

            $amount = $amount + $get_wallet->main_wallet;

            $wallet = Wallets::find($get_wallet->id);
            $wallet->main_wallet = $amount;
            $wallet->save();
            }
            }
            }

            }
        return $this->res(1, $posts, 200);
    }

    public function getPosts(Request $request){
        $today_date = "";
        $today_date = date('Y-m-d');
        //$yesterday_date = d ;

        $posts = Posts::Where('status', 1)->orderBy('post_date', 'desc')->take(20)->get();
        return $this->res(1, $posts, 200);
    }

    public function getPostByTime(Request $request, $time){
        $today_date = date('Y-m-d');
        $yesterday_date = date('Y-m-d', time() - 60*60*24);
        $tomorrow_date = date('Y-m-d', time() + 60*60*24);

        if($time == "today"){
            $posts = Posts::Where('status', 1)->Where('post_date', $today_date)->orderBy('post_date', 'desc')->get();
            if(empty($posts)) return $this->res(0, "No post found!", 401);
            else return $this->res(1, $posts, 200);
        }
        /*
        else if($time == "tomorrow"){
            $posts = Posts::Where('post_date', $tomorrow_date)->orderBy('post_date', 'desc')->get();
            return $this->res(1, $posts, 200);
        }
        else if($time == "yesterday"){
            $posts = Posts::Where('post_date', $yesterday_date)->orderBy('post_date', 'desc')->get();
            return $this->res(1, $posts, 200);
        }*/
        else{
            return $this->res(0, "Invalid command!", 401);
        }
    }
}
