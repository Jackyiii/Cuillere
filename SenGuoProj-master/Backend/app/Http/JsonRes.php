<?php

namespace App\Http;

use Illuminate\Support\Facades\Response;

class JsonRes
{
    const INVALID_ARGUMENT           = 40000;
    const WRONG_ARGUMENT             = 40001;
    const MISS_ARGUMENT              = 40002;
    const SAVE_DENIED                = 40003;
    const USER_ALREADY_REGISTER      = 40004;
    const EMAIL_ALREADY_REGISTER     = 40005;
    const DECODE_ERROR               = 40006;
    const INVALID_ACTION             = 40007;

    const UNKNOWN                    = -1;
    const OK                         = 20000;
    const UNAUTHORIZED               = 40100;
    const TOKEN_EXPIRED              = 40101;
    const USER_NOTLOGIN              = 40102;

    const INVALID_USERNAME           = 3;
    const INVALID_PASSWORD           = 4;
    const INVALID_USERPASS           = 5;
    const ACCESS_DENIED              = 40300;
    const NO_SUCH_USER               = 40400;
    const NO_SUCH_FILE               = 40401;
    const NO_SUCH_EXPO               = 40402;

    const NOT_IMPL                   = 50;

    static public $msgMap = [
        self::INVALID_ARGUMENT       => [400, "Invaild Argument"],
        self::WRONG_ARGUMENT         => [400, 'Wrong argument'],
        self::MISS_ARGUMENT          => [400, 'Miss argument'],
        self::SAVE_DENIED            => [400, 'Save To Database Denied'],
        self::USER_ALREADY_REGISTER  => [400, 'User Already Regist'],
        self::EMAIL_ALREADY_REGISTER => [400, 'Email Already Regist'],
        self::DECODE_ERROR           => [400, 'Image Or File Decode Error'],
        self::INVALID_ACTION         => [400, 'Invalid Action'],
        self::OK                     => [200, 'Ok'],
        self::UNKNOWN                => [500, 'Unknown error'],
        self::UNAUTHORIZED           => [401, 'Unauthorized'],
        self::TOKEN_EXPIRED          => [401, 'Token expired'],
        self::USER_NOTLOGIN          => [401, 'User Not Login'],
        self::ACCESS_DENIED          => [403, 'Access denied'],
        self::INVALID_USERPASS       => [401, 'Wrong user name or password'],
        self::NO_SUCH_USER           => [404, 'No such user'],
        self::NO_SUCH_FILE           => [404, 'No Such Fiel'],
        self::NO_SUCH_EXPO           => [404, 'No Such Expo'],
        self::NOT_IMPL               => [500, 'Not implement yet'],
    ];
    static public function getCodeInfo($code)
    {
        return array_key_exists($code, self::$msgMap) ? self::$msgMap[$code] :
                                                        [200, 'Undefine code'];
    }

    static public function makeResponse($code, $data = null, $msg = null)
    {
        $codeInfo = JsonRes::getCodeInfo($code);
        $msg = $msg ? : $codeInfo[1];
        $httpcode = $codeInfo[0];
        return response()->json(['code' => $code, 'msg' => $msg, 'data' => $data])
            ->setStatusCode($httpcode);
    }

    static public function makeArrayResponse($code, $offset, $total, $array, $msg = null)
    {
        $data = ['offset' => $offset, 'count' => count($array), 'total' => $total,
                 'results' => $array];
        return self::makeResponse($code, $data, $msg);
    }
}