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
use Illuminate\Support\Str;
use Validator;

class PostController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['getPosts', 'getPostById', 'getPostsByTime', 'getRandomPosts', 'getRecentPosts']]);
    }

    public function res($status, $message, $code)
    {
        $res = new Response;
        return $res->res($status, $message, $code);
    }

    public function newPost(Request $request){
    	$validator = Validator::make($request->all(), [
            'post_title' => 'required|string',
            'post_image' => 'required|string',
            'post_content' => 'required|string',
            'post_date' => 'required|string',
            'status' => 'required|integer',
        ]);

        if(Auth::check()){
            $request->username = auth()->user()->username;
        /* if($request->username != auth()->user()->username){
            return $this->res(0, 'Invalid User!', 401);
        } */

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
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->post_title)));
        if($slug == null || $slug == ""){
            return $this->res(0, "Failed to post, try again", 422);
        }
        /*$posts = Posts::create(array_merge(
            $validator->validated()
        ));*/
        Posts::create([
            'post_title' => $request->post_title,
            'post_content' => $request->post_content,
            'post_image' => $request->post_image,
            'slug' => $request->slug,
            'slug' => Str::slug($request->post_title, '-'),
            'username' => auth()->user()->username,
            'post_date' => $request->post_date,
            'status' => $request->status,
                ]);
        return $this->res(1, "New post posted   ", 200);
    }

    public function uploadContentThumbnail(Request $request)
    {

       $validator = Validator::make($request->all(),
              [
                'name' => 'string',
                'file' => 'required|mimes:gif,png,jpg,jpeg|max:2048',
            ]);

        $roles = array('Author', 'Moderator', 'Admin', 'Super Admin');
        $role = auth()->user()->account_type;
        //$request->username = auth()->user()->username;

        if(!Auth::check()){
            return $this->res(0, 'Unauthorized User!', 401);
        }
        else if(!in_array($role, $roles)){
            return $this->res(0, 'You do not have right to post', 401);
        }
        else if ($validator->fails()) {
            return $this->res(0, 'Error uploading. Make sure file is not more 2MB | files allowed: gif,png,jpg,jpeg', 401);
            //return $this->res(0, $validator->errors()->all(), 401);
             }
        else
        {
            if ($files = $request->file('file'))
            {
                $urlAppend = "/Users/abcde/Projects/Predict5ive_web/backend/storage/app/public/uploads/images/";
                //$urlAppend = url('/')."/storage/app/uploads/images/";
                //store file into uploads folder
                $file = $request->file->store('public/uploads/images');
                //$file = $request->file->store('uploads/images');
                 return $this->res(1, $urlAppend.$files->hashName(), 200);
            }
            else
            {
                return $this->res(0, 'Image upload failed', 401);
            }
        }
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
        if(!Auth::check()){
            return $this->res(0, 'Not logged in!', 401);
        }
        if (auth()->user()->account_type != 'Admin') {
            return $this->res(0, 'Unauthorized!', 401);
        }

        $posts = Posts::find($id);
        if($posts == null){
            return $this->res(0, 'Post not found!', 422);
        }

        try{
//delete attachment
if($posts->post_image != null)
{
    //$destinationPath = '/home/planwvbx/influencer-api.planaa.com/storage/app/uploads/images';
    $destinationPath = '/storage/app/uploads/images';
    $filename = $posts->post_image;
    $filename = basename($filename);
    if(file_exists($filename))
    {
        File::delete($destinationPath.'/'.$filename);
    }
}
/*
if($posts->post_video != null){
    $destinationPath = '/home/planwvbx/influencer-api.planaa.com/storage/app/uploads/videos';
    $filename = $posts->post_video;
    $filename = basename($filename);
    File::delete($destinationPath.'/'.$filename);
}
if($posts->post_short_video != null){
    $destinationPath = '/home/planwvbx/influencer-api.planaa.com/storage/app/uploads/videos';
    $filename = $posts->post_short_video;
    $filename = basename($filename);
    File::delete($destinationPath.'/'.$filename);
}*/
        }
        catch(Exception $e){

        }

        $posts->delete();
        return $this->res(1, "Post deleted", 200);
    }

    public function getPostById(Request $request, $id, $slug){

        //$post = Posts::find($id);
        $post = Posts::Where('id', $id)->Where('slug', $slug)->first();
        /*
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

            } */
        return $this->res(1, $post, 200);
    }

    public function getPosts(Request $request){
        $today_date = "";
        $today_date = date('Y-m-d');
        //$yesterday_date = d ;

        $posts = Posts::Where('status', 1)->orderBy('post_date', 'desc')->take(20)->get();
        return $this->res(1, $posts, 200);
    }

    public function getRecentPosts(Request $request){
        $today_date = "";
        $today_date = date('Y-m-d');
        //$yesterday_date = d ;

        $posts = Posts::Where('status', 1)->orderBy('post_date', 'desc')->take(6)->get();
        return $this->res(1, $posts, 200);
    }

    public function getRandomPosts(Request $request){
        $today_date = "";
        $today_date = date('Y-m-d');
        //$yesterday_date = d ;

        $posts = Posts::Where('status', 1)->inRandomOrder()->take(10)->get();
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
