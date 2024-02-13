<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\GamesController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\SettingsController;
use App\Http\Controllers\Api\V1\UsersController;
use App\Http\Controllers\Api\V1\VendorsController;
use App\Http\Controllers\Api\V1\WalletController;
use App\Http\Controllers\Api\V1\CronJobsController;
use App\Http\Controllers\Api\V1\AdminController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/{referer}/register', [AuthController::class, 'registerByRefer']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/password/reset', [AuthController::class, 'passwordReset']);
    Route::post('/password/reset/confirm', [AuthController::class, 'confirmPasswordReset']);
    Route::get('/logged/user', [AuthController::class, 'loggedUser']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/update-password', [AuthController::class, 'updatePassword']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/game'
], function ($router) {
    Route::post('/new_game', [GamesController::class, 'newGame']);
    Route::post('/update_game', [GamesController::class, 'updateGame']);
    Route::post('/update_game_outcome', [GamesController::class, 'updateGameOutcome']);
    Route::get('/{id}/get_game', [GamesController::class, 'getGameById']);
    Route::get('/{id}/{voteType}/game_vote', [GamesController::class, 'voteById']);
    Route::get('/get_games', [GamesController::class, 'getGames']);
    Route::get('/old_games', [GamesController::class, 'oldGames']);
    Route::get('/old_games/premium', [GamesController::class, 'oldPremiumGames']);
    Route::get('/pending_games', [GamesController::class, 'pendingGames']);
    Route::get('/admin_get_games', [GamesController::class, 'adminGetGames']);
    Route::get('/{id}/{actionType}/admin_approve_game', [GamesController::class, 'adminApproveGame']);
    //Route::get('/{time}/get_games', [GamesController::class, 'getGamesByTime']);
    Route::get('/{time}/get_games_new', [GamesController::class, 'getGamesByTime']);
    Route::get('/{time}/get_games/premium', [GamesController::class, 'getPremiumGamesByTime']);
    Route::get('/{id}/delete_game', [GamesController::class, 'deleteGameById']);

    Route::get('/user_get_games', [GamesController::class, 'userGetGames']);
    Route::post('/user_new_game', [GamesController::class, 'userNewGame']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/post'
], function ($router) {
    Route::post('/new_post', [PostController::class, 'newPost']);
    Route::post('/update_post', [PostController::class, 'updatePost']);
    Route::get('/{id}/get_post', [PostController::class, 'getPostById']);
    Route::get('/get_posts', [PostController::class, 'getPosts']);
    Route::get('/{time}/get_posts', [PostController::class, 'getPostsByTime']);
    Route::get('/{id}/delete_post', [PostController::class, 'deletePostById']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/settings'
], function ($router) {
    Route::get('/website_settings', [SettingsController::class, 'WebsiteSettings']);
    Route::get('/{country}/currency_rates', [SettingsController::class, 'CurrencyRates']);
    Route::get('/packages', [SettingsController::class, 'Packages']);
    Route::get('/faq', [SettingsController::class, 'Faqs']);
    Route::get('/get_country', [SettingsController::class, 'GetCountry']);
    Route::get('/app/version-control', [SettingsController::class, 'appVersionControl']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/user'
], function ($router) {
    Route::get('/referrals', [UsersController::class, 'getReferrals']);
    Route::get('/wallet', [UsersController::class, 'wallet']);
    Route::post('/activate-package', [UsersController::class, 'activatePackage']);
    Route::get('/announcement', [UsersController::class, 'announcement']);
    Route::get('/announcements', [UsersController::class, 'announcements']);
    Route::post('/push/notification/create', [UsersController::class, 'createPushNotification']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/push'
], function ($router) {
Route::post('/notification/create', [UsersController::class, 'createPushNotification']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/vendor'
], function ($router) {
    Route::get('/{country}/vendors', [VendorsController::class, 'getVendorsByCountry']);
    Route::get('/vendor-coupons', [VendorsController::class, 'getCouponsByVendor']);
    Route::get('/vendor-used-coupons', [VendorsController::class, 'getUsedCouponsByVendor']);
    Route::get('/vendor-unused-coupons', [VendorsController::class, 'getUnusedCouponsByVendor']);
    Route::post('/generate-coupons', [VendorsController::class, 'generateCoupon']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/wallet'
], function ($router) {
    Route::get('/{walletType}/withdraw', [WalletController::class, 'withdraw']);
    Route::get('/transactions', [WalletController::class, 'getTransactions']);
    Route::get('/payment-options', [WalletController::class, 'getPaymentOptions']);
    Route::post('/update-payment-options', [WalletController::class, 'updatePaymentOptions']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/cronjobs'
], function ($router) {
    Route::get('/daily_earning', [CronJobsController::class, 'daily_earning']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'v1/admin'
], function ($router) {
    Route::get('/{time}/get_games', [AdminController::class, 'getGamesByTime']);
    Route::get('/announcement/list', [AdminController::class, 'listAnnouncements']);
        Route::get('/announcement/groups', [AdminController::class, 'announcementGroups']);
    Route::post('/announcement/add', [AdminController::class, 'addAnnouncement']);
    Route::get('/{id}/announcement/delete', [AdminController::class, 'deleteAnnouncement']);
        Route::post('/push-notification/send', [AdminController::class, 'pushNotification']);
        
        
         Route::get('/booking/codes', [AdminController::class, 'listBookingCodes']);
    Route::post('/booking/add', [AdminController::class, 'addBookingCode']);
    Route::get('/{id}/booking/delete', [AdminController::class, 'deleteBookingCode']);
});

