<?php
/**
 * Created by PhpStorm.
 * User: Nicho
 * Date: 2017/7/31
 * Time: 19:56
 */

namespace App\Http\Middleware;


use Illuminate\Http\Request;
use Closure;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CorsMiddleware
{
    private $headers = [];

    public function __construct()
    {
        $this->headers = [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT',
            'Access-Control-Allow-Headers' => 'Content-Type'
        ];
    }

    /**
     * @param Request $requst
     * @param Closure $next
     */
    public function handle(Request $request, Closure $next){
        $response = $next($request);
        if($request->isMethod('options')){
            $response = response('ok');
        }
        if(!$response instanceof BinaryFileResponse){
            foreach($this->headers as $key=>$val){
                $response->header($key, $val);
            }
        }
        return $response;
    }
}