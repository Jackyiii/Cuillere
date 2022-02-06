<?php
/**
 * Created by PhpStorm.
 * User: Nicho
 * Date: 2017/7/23
 * Time: 18:58
 */

namespace App\Http\Controllers;

use App\Http\JsonRes;
use App\Models\Education;
use App\Models\Email;
use App\Models\Language;
use App\Models\Professional;
use App\Models\Skill;
use App\Models\Telephone;
use Hamcrest\Type\IsString;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Controller;
use App\Models\User;
use \Auth;

class UserController extends Controller
{

    private $saltstring;
    /**
     * UserController constructor.
     */
    public function __construct()
    {
        $this->saltstring = 'senguoblog';
    }

    public static function getApiToken(){

        return str_random(60);
    }

    private  function genSh1Password($password){
        if(!is_string($password)){
            return sha1($this->saltstring);
        }
        return sha1($this->saltstring.$password);
    }
    /**
     * @param Request $request
     */
    public function login(Request $request){
        $code = JsonRes::UNKNOWN;
        $body = null;
        do{
            try{
                $this->validate($request, [
                   'email' => 'required | email',
                    'password' => 'required'
                ]);
            }catch(ValidationException $e){
                $code = JsonRes::INVALID_ARGUMENT;
                break;
            }

            $user = User::where('email', '=', $request->input('email'))
                ->where('password', '=', $this->genSh1Password($request->input(USER::PASSWORD_NAME)))
                ->first();

            if(!$user){
                $code = JsonRes::NO_SUCH_USER;
                break;
            }
            $token = self::getApiToken();
            $user->api_token = $token;
            if(!$user->save()){
                $code = JsonRes::SAVE_DENIED;
                break;
            }

            $code = JsonRes::OK;
            $body = [
                'api_token' => $token,
                'user_info' =>[
                    'id' => $user->id
                ]
            ];

        }while(false);
        return JsonRes::makeResponse($code, $body);
    }

    /**
     * @param Request $request
     */
    public function register(Request $request){
        $code = JsonRes::UNKNOWN;
        $body = null;
        do{
            try{
                $this->validate($request, [
                    'email' => 'required | email',
                    'password' => 'required',
                    'surname' => 'required',
                    'givenname' => 'required'
                ]);
            }catch(ValidationException $e){
                $code = JsonRes::INVALID_ARGUMENT;
                break;
            }
            $user = User::where('email', '=', $request->input('email'))
                ->where('password', '=', $this->genSh1Password($request->input(USER::PASSWORD_NAME)))
                ->first();

            if($user){
                $code = JsonRes::USER_ALREADY_REGISTER;
                break;
            }

            $user = User::create([
               'email' => $request->input(User::EMAIL_NAME),
               'password' => $this->genSh1Password($request->input(User::PASSWORD_NAME)),
               'surname' => $request->input(User::SURNAME),
               'givenname' => $request->input(User::GIVENNAME)
            ]);
            $user->api_token = self::getApiToken();
            if(!$user->save()){
                $code = JsonRes::SAVE_DENIED;
                break;
            }

            $code = JsonRes::OK;
            $body = [
                'api_token' => $user->api_token,
                'user_info' =>[
                    'id' => $user->id
                ]
            ];

        }while(false);
        return JsonRes::makeResponse($code, $body);
    }

    /**
     * @param Request $request
     * @param $id userId
     */
    public function getUser(Request $request, $id){
        $responseCode = JsonRes::UNKNOWN;
        $body = null;
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

            $responseCode = JsonRes::OK;
            $body = $user;
        }while(0);

        return JsonRes::makeResponse(JsonRes::OK, $body);
    }

    /**
     * @param Request $request
     */
    public function getUserSelfInfo(Request $request)
    {
        $user = Auth::user();
        if(!$user){
            return JsonRes::makeResponse(JsonRes::NO_SUCH_USER, null);
        }
        $user->emails;
        $user->telephones;
        $user->educations;
        $user->languages;
        $user->professionals;
        $user->skills;
        if($user->cv){
            $user->cv = Storage::url($user->cv);
        }
        if($user->avatar){
            $user->avatar = Storage::url($user->avatar);
        }
        return JsonRes::makeResponse(JsonRes::OK, $user);
    }

    /**
     * @param Request $request
     */
    public function logout(Request $request)
    {
        $responseCode = JsonRes::UNKNOWN;
        do{
            $user = $request->user();
            if(!$user){
                $responseCode = JsonRes::USER_NOTLOGIN;
                break;
            }
            $user->logout();
            if(!$user->save()){
                $responseCode = JsonRes::SAVE_DENIED;
                break;
            }
            $responseCode = JsonRes::OK;
        }while(0);
        return JsonRes::makeResponse($responseCode);
    }

    /**
     * @param Request $request
     */
    public function emailVerify(Request $request){
        $responseCode = JsonRes::UNKNOWN;
        do{
            try{
                $this->validate($request, [
                   'email' => 'required | email'
                ]);

                $user = User::where('email', $request->input('email'))->first();
                if($user){
                    $responseCode = JsonRes::EMAIL_ALREADY_REGISTER;
                    break;
                }

            }catch(ValidationException $e){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;

            }catch(\Exception $e){
                throw $e;
            }

            $responseCode = JsonRes::OK;
        }while(false);
        return JsonRes::makeResponse($responseCode);
    }

    /**
     * @param Request $request
     */
    public function emailUpdate(Request $request){
        $responseCode = JsonRes::UNKNOWN;
        $body = null;
        do{
            try{
                $this->validate($request, [
                    'email' => 'required | email'
                ]);
                $user = $request->user();
                if(!$user){
                    $responseCode = JsonRes::USER_NOTLOGIN;
                    break;
                }
                $user->email = $request->input('email');
                if(!$user->save()){
                    $responseCode = JsonRes::SAVE_DENIED;
                    break;
                }
                $body = [
                    'id' => $user->id,
                    'email' => $user->email
                ];

            }catch(ValidationException $e){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }
            $responseCode = JsonRes::OK;
        }while(0);
        return JsonRes::makeResponse($responseCode, $body);
    }

    public function file(Request $request){
        $file = $request->file();

    }
    /**
     * @param Request $request
     */
    public function userUpdate(Request $request)
    {
        $responseCode = JsonRes::UNKNOWN;
        $inputArr = $request->all();
        $body = null;
        do
        {
            if(count($inputArr) <= 0){
                $responseCode = JsonRes::INVALID_ARGUMENT;
                break;
            }
            $user = $request->user();
            if(!$user){
                $request = JsonRes::USER_NOTLOGIN;
                break;
            }
            $needSave = false;
            if(array_key_exists('surname', $inputArr)
                && is_string($inputArr['surname'])
                && $user->surname != $inputArr['surname'])
            {
                $user->surname = $inputArr['surname'];
                $needSave = true;
            }
            if(array_key_exists('givenname', $inputArr)
                && is_string($inputArr['givenname'])
                && $user->givenname != $inputArr['givenname'])
            {
                $user->givenname = $inputArr['givenname'];
                $needSave = true;
            }
            if(array_key_exists('wechat', $inputArr)
                && is_string($inputArr['wechat'])
                && $user->wechat != $inputArr['wechat'])
            {
                $user->wechat = $inputArr['wechat'];
                $needSave = true;
            }
            if(array_key_exists('facebook', $inputArr)
                && is_string($inputArr['facebook'])
                && $user->facebook != $inputArr['facebook'])
            {
                $user->facebook = $inputArr['facebook'];
                $needSave = true;
            }
            if(array_key_exists('avatar', $inputArr)
                && is_string($inputArr['avatar'])
                && $user->avatar != $inputArr['avatar'])
            {
                $user->avatar = $inputArr['avatar'];
                $needSave = true;
            }
            if(array_key_exists('cv', $inputArr)
                && is_string($inputArr['cv'])
                && $user->cv != $inputArr['cv'])
            {
                $user->cv = $inputArr['cv'];
                $needSave = true;
            }
            if(array_key_exists('telephonevis', $inputArr)
                && is_integer($inputArr['telephonevis'])
                && $user->telephonevis != $inputArr['telephonevis'])
            {
                $user->telephonevis = $inputArr['telephonevis'];
                $needSave = true;
            }
            if(array_key_exists('emailvis', $inputArr)
                && is_integer($inputArr['emailvis'])
                && $user->emailvis != $inputArr['emailvis'])
            {
                $user->emailvis = $inputArr['emailvis'];
                $needSave = true;
            }
            if(array_key_exists('wechatvis', $inputArr)
                && is_integer($inputArr['wechatvis'])
                && $user->wechatvis != $inputArr['wechatvis'])
            {
                $user->wechatvis = $inputArr['wechatvis'];
                $needSave = true;
            }
            if(array_key_exists('facebooksvis', $inputArr)
                && is_integer($inputArr['facebooksvis'])
                && $user->facebooksvis != $inputArr['facebooksvis'])
            {
                $user->facebooksvis = $inputArr['facebooksvis'];
                $needSave = true;
            }
            if(array_key_exists('educationvis', $inputArr)
                && is_integer($inputArr['educationvis'])
                && $user->educationvis != $inputArr['educationvis'])
            {
                $user->educationvis = $inputArr['educationvis'];
                $needSave = true;
            }
            if(array_key_exists('jobvis', $inputArr)
                && is_integer($inputArr['jobvis'])
                && $user->professionalvis != $inputArr['jobvis'])
            {
                $user->professionalvis = $inputArr['jobvis'];
                $needSave = true;
            }
            if(array_key_exists('skillvis', $inputArr)
                && is_integer($inputArr['skillvis'])
                && $user->skillvis != $inputArr['skillvis'])
            {
                $user->skillvis = $inputArr['skillvis'];
                $needSave = true;
            }
            if(array_key_exists('emails', $inputArr))
            {
                $this->updateUserEmail($user, $inputArr['emails']);
            }
            if(array_key_exists('telephones', $inputArr))
            {
                $this->updateUserTelephone($user, $inputArr['telephones']);
            }
            if(array_key_exists('educations', $inputArr))
            {
                $this->updateUserEducation($user, $inputArr['educations']);
            }
            if(array_key_exists('languages', $inputArr))
            {
                $this->updateUserLanguage($user, $inputArr['languages']);
            }
            if(array_key_exists('jobs', $inputArr))
            {
                $this->updateUserJob($user, $inputArr['jobs']);
            }
            if(array_key_exists('skills', $inputArr))
            {
                $this->updateUserSkill($user, $inputArr['skills']);
            }
            if($needSave)
            {
                $user->save();
            }
            $responseCode = JsonRes::OK;

        }while(false);
        return JsonRes::makeResponse($responseCode, $body);
    }

    /**
     * @param User $user
     * @param $emailArr
     * @return bool
     */
    private function updateUserEmail(User $user, $emailArr){
        $ret = true;
        do
        {
            if(!is_array($emailArr)){
                break;
            }
            $emails = $user->emails;
            foreach($emails as $email){
                $email->delete();
            }
            $func = function($email) use($user){
                if(array_key_exists('email', $email))
                {
                    $newEmail = new Email();
                    $newEmail->email = $email['email'];
                    $newEmail->setAttribute('user_id', $user->id);
                    $newEmail->save();
                }
            };

            foreach($emailArr as $email){
                $func($email);
            }
        }while(false);
        return $ret;
    }

    private function updateUserTelephone(User $user, $telephoneArr){
        $ret = true;
        do
        {
            if(!is_array($telephoneArr)){
                break;
            }
            $telephones = $user->telephones;
            foreach($telephones as $telephone){
                $telephone->delete();
            }
            $func = function($telephone) use($user){
                if(array_key_exists('telephone', $telephone))
                {
                    $newTelephone = new Telephone();
                    $newTelephone->telephone = $telephone['telephone'];
                    $newTelephone->setAttribute('user_id', $user->id);
                    $newTelephone->save();
                }
            };

            foreach($telephoneArr as $telephone){
                $func($telephone);
            }
        }while(false);
        return $ret;
    }
    /**
     * @param $user
     * @param $educationArr
     * @return bool
     */
    private function updateUserEducation($user, $educationArr){
        $ret = true;
        do
        {
            if(!is_array($educationArr)){
                break;
            }
            $educations = $user->educations;
            foreach($educations as $education){
                $education->delete();
            }
            $func = function($education) use($user){
                if(array_key_exists('education', $education))
                {
                    $newEducations = new Education();
                    $newEducations->education = $education['education'];
                    $newEducations->setAttribute('user_id', $user->id);
                    $newEducations->save();
                }
            };

            foreach($educationArr as $education){
                $func($education);
            }
        }while(false);
        return $ret;
    }

    private function updateUserJob($user, $jobArr){
        $ret = true;
        do
        {
            if(!is_array($jobArr)){
                break;
            }
            $jobs = $user->professionals;
            foreach($jobs as $job){
                $job->delete();
            }
            $func = function($profession) use($user){
                if(array_key_exists('job', $profession))
                {
                    $newProfessional = new Professional();
                    $newProfessional->profession = $profession['job'];
                    $newProfessional->setAttribute('user_id', $user->id);
                    $newProfessional->save();
                }
            };

            foreach($jobArr as $job){
                $func($job);
            }
        }while(false);
        return $ret;
    }

    private function updateUserLanguage($user, $lanArr){
        $ret = true;
        do{
            if(!is_array($lanArr)){
                break;
            }
            $lans = $user->languages;
            foreach($lans as $lan){
                $lan->delete();
            }
            $func = function($lan) use($user){
                if(array_key_exists('language', $lan))
                {
                    $newLan = new Language();
                    $newLan->lang = $lan['language'];
                    $newLan->setAttribute('user_id', $user->id);
                    $newLan->save();
                }
            };

            foreach($lanArr as $lan){
                $func($lan);
            }
        }while(false);
        return $ret;
    }

    private function updateUserSkill($user, $skillArr)
    {
        $ret = true;
        do{
            if(!is_array($skillArr)){
                break;
            }
            $skills = $user->skills;
            foreach($skills as $skill){
                $skill->delete();
            }
            $func = function($skill) use($user){
                if(array_key_exists('skill', $skill))
                {
                    $newLan = new Skill();
                    $newLan->skill = $skill['skill'];
                    $newLan->setAttribute('user_id', $user->id);
                    $newLan->save();
                }
            };

            foreach($skillArr as $skill){
                $func($skill);
            }
        }while(false);
        return $ret;
    }
}