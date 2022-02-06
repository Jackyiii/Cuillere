<?php
/**
 * Created by PhpStorm.
 * User: Nicho
 * Date: 2017/7/23
 * Time: 19:22
 */

namespace App\Http\Controllers;


use App\Http\JsonRes;
use Symfony\Component\HttpFoundation\Request;

class APIListController extends Controller
{
    protected $apiPrefix = '{code : (int), msg : (string), data : (array)}';

    protected $apiSet = [
        'api/v1/user/login' => [
            'description' => 'user login',
            'method' => 'post'

        ]
    ];

    private function outputPdf($file){
        $fileName = storage_path().$file;
        $response = null;
        if(file_exists($fileName)){
            $response = response(file_get_contents($fileName));
            $response->header("Content-type", "application/pdf;charset=utf-8");
        }
        else{
            $response =  JsonRes::makeResponse(JsonRes::NOT_IMPL);
        }
        return $response;
    }

    /**
     * @param Request $request
     */
    public function apilist(Request $request){

         return $this->outputPdf('/api/api.pdf');

    }

    /**
     * @param Request $requst
     * @param $testItem
     */
    public function testItem(Request $requst, $testItem){
        if(!is_string($testItem)){
            return JsonRes::makeResponse(JsonRes::NOT_IMPL);
        }

        $default = true;
        switch($testItem){
            case 'phpinfo':
                $default = !$default;

                phpinfo();
                break;
            default:
                break;
        }

        if($default)
            return JsonRes::makeResponse(JsonRes::NOT_IMPL);
    }
}