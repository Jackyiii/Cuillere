<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
use App\Http\JsonRes;

$app->get('/', function () use ($app) {
    return JsonRes::makeResponse(JsonRes::OK);
});

$app->get('/api', 'APIListController@apiList');
$app->get('/test/{testItem}', 'APIListController@testItem');

$app->group(['prefix' => 'api/v1'], function($app){
   $app->post('user/login', 'UserController@login');
   $app->post('user/register', 'UserController@register');
   $app->post('user/email/verify', 'UserController@emailVerify');
   $app->get('user/{id}/cv', 'FileController@downloadCv');
    $app->get('/user/{id}', 'UserController@getUser');
});

$app->group(['prefix' => 'api/v1', 'middleware' => 'auth'], function($app){
    $app->post('/user/logout', 'UserController@logout');

    $app->get('/user', 'UserController@getUserSelfInfo');
    $app->post('/user', 'UserController@userUpdate');
    $app->post('/user/email', 'UserController@emailUpdate');
    $app->post('/user/cv', 'FileController@uploadCv');
    $app->post('/user/avatar', 'FileController@uploadAvatar');
    $app->post('/expo/create', 'ExpoController@createExpo');
    $app->post('/expo/detail/create', 'ExpoController@createExpoDetail');
    $app->post('/expo', 'ExpoController@actionExpo');
    $app->get('/expo', 'ExpoController@getExpo');
    $app->get('/expo/{id}/detail', 'ExpoController@getExpoDetail');
});