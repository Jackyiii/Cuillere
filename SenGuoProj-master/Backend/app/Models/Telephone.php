<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Telephone extends Model
{
    //
    public $timestamps = false;
    protected $hidden = [
        'id' , 'user_id'
    ];
}
