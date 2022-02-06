<?php
/**
 * Created by PhpStorm.
 * User: Nicho
 * Date: 2017/7/24
 * Time: 1:06
 */

namespace App;


class helpers
{
    public static function getDbConfig(){
        if (getenv('IS_IN_HEROKU')) {
            $url = parse_url(getenv("DATABASE_URL"));

            return $db_config = [
                'connetion' => 'pgsql',
                'host' => $url["host"],
                'database'  => substr($url["path"], 1),
                'username'  => $url["user"],
                'password'  => $url["pass"],
            ];
        } else {
            return $db_config = [
                'connetion' => env('DB_CONNECTION', 'mysql'),
                'host' => env('DB_HOST', 'localhost'),
                'database'  => env('DB_DATABASE', 'forge'),
                'username'  => env('DB_USERNAME', 'forge'),
                'password'  => env('DB_PASSWORD', ''),
            ];
        }
    }
}