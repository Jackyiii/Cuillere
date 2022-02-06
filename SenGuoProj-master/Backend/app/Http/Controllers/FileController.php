<?php
/**
 * Created by PhpStorm.
 * User: Nicho
 * Date: 2017/8/2
 * Time: 21:59
 */

namespace App\Http\Controllers;

use Aws\S3\S3Client;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\JsonRes;
use \Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use \Log;

class FileController extends Controller
{
    /**
     * FileController constructor.
     */
    public function __construct()
    {

    }

    public function uploadCv(Request $request)
    {
        $responseCode = JsonRes::UNKNOWN;
        $body = null;
        do
        {
            $user = $request->user();
            if(!$user){
                $responseCode = JsonRes::USER_NOTLOGIN;
                break;
            }
            $file = $request->file();
            $filekeys = array_keys($file);
            if(count($filekeys) > 1){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }
            $fileVals = array_values($file);
            //$key = $filekeys[0];
            $file = $fileVals[0];
            Log::debug($file);
            $ret =  $file->storePublicly('cv');

            if(!$ret){
                $responseCode = JsonRes::ACCESS_DENIED;
                break;
            }
            //delete the old
            if($user->cv){
                Storage::delete($user->cv);
                $user->cv = null;
            }
            $user->cv = $ret;
            if(!$user->save()){
                $responseCode = JsonRes::SAVE_DENIED;
                break;
            }

            $responseCode = JsonRes::OK;
            $body = [
                'url' => Storage::url($user->cv)
            ];
        }while(0);
        return JsonRes::makeResponse($responseCode, $body);
    }

    /**
     * @param Request $request
     */
    public function downloadCv(Request $request, $id)
    {
        $responseCode = JsonRes::UNKNOWN;
        do{
            $validator = $this->getValidationFactory()->make([
                'id' => $id
            ],[
                'id' => 'integer'
            ]);
            if($validator->fails()){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }

            $user = User::find($id);
            if(!$user){
                $responseCode = JsonRes::NO_SUCH_USER;
                break;
            }
            if(!$user->cv || !Storage::exists($user->cv)){
                $responseCode = JsonRes::NO_SUCH_FILE;
                break;
            }
            $url = Storage::url($user->cv);

            if(config('filesystems.default') === 'local'){
                $url = config('filesystems.disks.local.root').'/'.$user->cv;
                return response()->download($url);
            }else if(config('filesystem.default') == 's3'){
                return redirect($url);
            }
            $responseCode = JsonRes::OK;

        }while(false);
        return JsonRes::makeResponse($responseCode);
    }

    /**
     * @param Request $request
     */
    public function uploadAvatar(Request $request)
    {
        $responseCode = JsonRes::UNKNOWN;
        $body = null;
        do
        {
            $user = $request->user();
            if(!$user){
                $responseCode = JsonRes::USER_NOTLOGIN;
                break;
            }
            $file = $request->input('avatar');
            if(!$file){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }
            $path = null;
            try{
                $image = app('image')->make($file);
                $options = ['visibility' => 'public'];
                $path = 'avatar/'.Str::random(50).'.png';
                if(!Storage::put($path, $image->encode('png')->encoded, $options))
                {
                    $responseCode = JsonRes::DECODE_ERROR;
                    break;
                }

            }catch(\Exception $e){
                $responseCode = JsonRes::DECODE_ERROR;
                break;
            }

            //delete the old
            if($user->avatar){
                Storage::delete($user->avatar);
                $user->avatar = null;
            }
            $user->avatar = $path;
            if(!$user->save()){
                $responseCode = JsonRes::SAVE_DENIED;
                break;
            }

            $responseCode = JsonRes::OK;
            $body = [
                'url' => Storage::url($user->avatar)
            ];
        }while(0);
        return JsonRes::makeResponse($responseCode, $body);
    }
}