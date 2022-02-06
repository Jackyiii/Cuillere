<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    //
    protected $table = 'educations';
    public $timestamps = false;
    protected $hidden = [
        'id' , 'user_id'
    ];
}
