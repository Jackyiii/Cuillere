<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expo extends Model
{
    //
    protected $table = 'expos';

    public function expoDetails()
    {
        return $this->hasMany(Expodetail::class, 'expo_id');
    }

    public function comments(){
        return $this->hasMany(Expocomment::class, 'expo_id');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
