<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    //
    public $timestamps = false;
    protected $hidden = [
        'id' , 'user_id'
    ];
}
