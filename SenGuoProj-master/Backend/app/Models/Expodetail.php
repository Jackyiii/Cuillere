<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expodetail extends Model
{
    //
    protected $table = 'expodetails';
    public $timestamps = false;

    public function expoitems()
    {
        return $this->hasMany(ExpoItem::class,'expodetail_id');
    }
}
