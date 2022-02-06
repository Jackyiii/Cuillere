<?php
/**
 * Created by PhpStorm.
 * User: Nicho
 * Date: 2017/8/8
 * Time: 10:38
 */

namespace App\Http\Controllers;
use App\Models\Expo;
use App\Models\Expodetail;
use App\Models\ExpoItem;
use App\Models\JobInfo;
use \Auth;
use App\Models\User;
use App\Http\JsonRes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ExpoController extends Controller
{
    /**
     * ExpoController constructor.
     */
    public function __construct()
    {

    }

    protected function uploadExpoImage($user, $file)
    {
        $url = null;
        do{
            if(!$file || !$user){
                break;
            }
            try{
                $image = app('image')->make($file);
                $options = ['visibility' => 'public'];
                $path = 'expo/'.$user->id.'_'.Str::random(40).'.png';
                if(!Storage::put($path, $image->encode('png')->encoded, $options)){
                    break;
                }
                $url = Storage::url($path);

            }catch(\Exception $e){
                break;
            }
        }while(false);
        return $url;
    }

    /**
     * @param Request $request
     */
    public function createExpo(Request $request){
        $responseCode = JsonRes::UNKNOWN;
        $body = null;
        do{
            $validator = $this->getValidationFactory()->make($request->all(),[
                'expTitle' => 'required | string'
            ]);
            if($validator->fails()){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }
            $user = $request->user();
            if(!$user){
                $responseCode = JsonRes::USER_NOTLOGIN;
                break;
            }
            $input = $request->all();
            $expo = new Expo();
            if(array_key_exists('expTitle', $input)
                && is_string($input['expTitle'])){
                $expo->title = $input['expTitle'];
            }
            if(array_key_exists('expStartTime', $input)){
                $expo->starttime = $input['expStartTime'];
            }
            if(array_key_exists('expEndTime', $input)){
                $expo->endtime = $input['expEndTime'];
            }
            if(array_key_exists('expType', $input)){
                $expo->type = $input['expType'];
            }
            if(array_key_exists('expCost', $input)){
                $expo->cost = $input['expCost'];
            }
            if(array_key_exists('expTagList', $input)
                && is_array($input['expTagList'])){
                $expo->taglist = implode(',', $input['expTagList']);
            }
            if(array_key_exists('expSubject', $input)){
                $expo->subject = $input['expSubject'];
            }
            if(array_key_exists('expAbstract', $input)){
                $expo->abstract = $input['expAbstract'];
            }
            $expo->user_id = $user->id;
            if(!$expo->save()){
                $responseCode = JsonRes::SAVE_DENIED;
                break;
            }
            $responseCode = JsonRes::OK;
            $body = [
                'id' => $expo->id
            ];

        }while(0);
        return JsonRes::makeResponse($responseCode, $body);
    }

    /**
     * @param Request $request
     */
    public function createExpoDetail(Request $request)
    {
        $responseCode = JsonRes::UNKNOWN;
        $body = null;
        do{
            $validator = $this->getValidationFactory()->make($request->all(),[
                'expId' => 'required'
            ]);
            if($validator->fails()){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }
            $user = $request->user();
            if(!$user){
                $responseCode = JsonRes::USER_NOTLOGIN;
                break;
            }
            $input = $request->all();
            $expo = Expo::find($input['expId']);
            if(!$expo){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }
            if(array_key_exists('expCatalogArray', $input)
                && is_array($input['expCatalogArray'])){
                foreach($input['expCatalogArray'] as $catalog){
                    if(is_array($catalog)){
                        $expoDetail = new Expodetail();
                        if(array_key_exists('expCatalogTitle', $catalog)){
                            $expoDetail->title = $catalog['expCatalogTitle'];
                        }
                        if(array_key_exists('expCatalogAbstract', $catalog)){
                            $expoDetail->abstract = $catalog['expCatalogAbstract'];
                        }
                        if(array_key_exists('expCatalogCoverImage', $catalog)){
                            $expoDetail->image =
                                $this->uploadExpoImage($user, $catalog['expCatalogCoverImage']);
                        }
                        $expoDetail->expo_id = $expo->id;
                        if(!$expoDetail->save()){
                            continue;
                        }
                        if(array_key_exists('expItemArray', $catalog)
                            && is_array($catalog['expItemArray'])){
                            foreach($catalog['expItemArray'] as $expItem){
                                $item = new ExpoItem();
                                if(array_key_exists('expItemTitle', $expItem)){
                                    $item->title = $expItem['expItemTitle'];
                                }
                                if(array_key_exists('expItemAbstract', $expItem)){
                                    $item->abstract = $expItem['expItemAbstract'];
                                }
                                if(array_key_exists('expItemImage', $expItem)){
                                    $item->image =
                                        $this->uploadExpoImage($user, $expItem['expItemImage']);
                                }
                                $item->expodetail_id = $expoDetail->id;
                                $item->save();
                            }
                        }
                    }
                }
            }
            $responseCode = JsonRes::OK;
        }while(false);
        return JsonRes::makeResponse($responseCode);
    }

    /**
     * @param Request $request
     */
    public function getExpo(Request $request)
    {
        $responseCode = JsonRes::UNKNOWN;
        $body = null;
        do{
            $validator = $this->getValidationFactory()->make($request->all(),[
                'offset' => 'required | integer',
                'limit'  => 'required | integer'
            ]);
            if($validator->fails()){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }
            $user = $request->user();
            if(!$user){
                $responseCode = JsonRes::USER_NOTLOGIN;
                break;
            }
            $collections = $user->expos()->offset($request['offset'])->limit($request['limit'])->get();
            if(!$collections) {
                $responseCode = JsonRes::OK;
                $body = [];
                break;
            }
            $body['count'] = $collections->count();
            $userJobInfos = $user->professionals;
            $userJobArray = [];
            if($userJobInfos){
                foreach($userJobInfos as $job){
                    $userJobArray[] = $job->profession;
                }
            }
            foreach($collections as $collection){
                $commentCount = 0;
                $comments = $collection->comments;
                if($comments){
                    $commentCount = $comments->count();
                }
                $expo = [
                    'expId' => $collection['id'],
                    'startTime' => $collection['starttime'],
                    'endTime' => $collection['endtime'],
                    'expTitle' => $collection['title'],
                    'expCost' => $collection['cost'],
                    'expPayed' => $user->userPaid($collection['id']),
                    'expAuthor' => $user->surname.' '.$user->givenname,
                    'expAuthorJobInfo' => $userJobArray,
                    'expAbstract' => $collection['abstract'],
                    'expFollowerCount' => $collection['followcount'],
                    'expCommentCount' => $commentCount,
                    'expLikeCount' => $collection['likecount']
                ];
                $body[] = $expo;
            }
            $responseCode = JsonRes::OK;
        }while(0);
        return JsonRes::makeResponse($responseCode, $body);
    }

    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function getExpoDetail(Request $request, $id)
    {
        $responseCode = JsonRes::UNKNOWN;
        $body = null;
        do{
            $validator = $this->getValidationFactory()->make([
                'id' => $id
            ],[
                'id' => 'required | integer'
            ]);
            if($validator->fails()){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }
            $expo = Expo::find($id);
            if(!$expo){
                $responseCode = JsonRes::NO_SUCH_EXPO;
                break;
            }
            $body['expCatalogArray'] = [];
            $collections = $expo->expoDetails;
            foreach($collections as $collection){
                $expoItems = $collection->expoitems;
                $expoItemArray = [];
                foreach($expoItems as $expoItem){
                    $expoItemPri = [
                        'expItemTitle' => $expoItem['title'],
                        'expItemAbstract' => $expoItem['abstract'],
                        'expItemImage' => $expoItem['image']
                    ];
                    $expoItemArray[] = $expoItemPri;
                }
                $expoDetail = [
                    'expCatalogTitle' => $collection['title'],
                    'expCatalogAbstract' => $collection['abstract'],
                    'expCatalogCoverImage' => $collection['image'],
                    'expItemArray' => $expoItemArray
                ];
                $body['expCatalogArray'][] = $expoDetail;
            }
            $responseCode = JsonRes::OK;
        }while(0);
        return JsonRes::makeResponse($responseCode, $body);
    }

    /**
     * @param Request $request
     */
    public function actionExpo(Request $request)
    {
        $responseCode = JsonRes::UNKNOWN;
        $body = null;
        do{
            $validator = $this->getValidationFactory()->make($request->all(),[
                'action' => 'required'
            ]);
            if($validator->fails()){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }
            $allowAction = ['recent'];
            $input = $request->all();
            if(!in_array($input['action'], $allowAction)){
                $responseCode = JsonRes::INVALID_ACTION;
                break;
            }
            $index = array_search($input['action'], $allowAction);
            switch($index){
                case 0:
                    $ret = $this->getRecentExpo($input);
                    $responseCode = $ret['responseCode'];
                    $body = $ret['body'];
                    break;
            }
        }while(false);
        return JsonRes::makeResponse($responseCode, $body);
    }

    protected function getRecentExpo($input){
        $responseCode = JsonRes::UNKNOWN;
        $body = null;
        do{
            $validator = $this->getValidationFactory()->make($input,[
                'offset' => 'required | integer',
                'limit'  => 'required | integer'
            ]);
            if($validator->fails()){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }
            $expos = Expo::orderBy('updated_at', 'desc')->offset($input['offset'])->limit($input['limit'])->get();
            foreach($expos as $expo){
                $user = $expo->user;
                $jobInfoArray = null;
                if($user){
                    $jobInfoArray = [];
                    $jobs = $user->professionals;
                    foreach($jobs as $job){
                        $jobInfoArray[] = $job->profession;
                    }
                }
                $comments = $expo->comments;
                $commentCount = $comments->count();
                $collection = [
                    'expId'=> $expo['id'],
                    'startTime' => $expo['starttime'],
                    'endTime' => $expo['endtime'],
                    'expTitle' => $expo['title'],
                    'expCost' => $expo['cost'],
                    'expPayed' => $user->userPaid($expo),
                    'expAuthor' => $user->surname.' '.$user->givenname,
                    'expAuthorJobInfo' => $jobInfoArray,
                    'expAbstract' => $expo['abstract'],
                    'expFollowerCount' => $expo['followcount'],
                    'expCommentCount' => $commentCount,
                    'expLikeCount' => $expo['likecount']
                ];
                $body[] = $collection;
            }
            $responseCode = JsonRes::OK;
        }while(false);

        $ret = [];
        $ret['responseCode'] = $responseCode;
        $ret['body'] = $body;
        return $ret;
    }
}