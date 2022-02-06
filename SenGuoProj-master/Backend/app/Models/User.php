<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Database\Eloquent\Model;

class User extends Model implements
    AuthenticatableContract,
    AuthorizableContract
{
    //
    use Authenticatable,Authorizable;

    const EMAIL_NAME = 'email';
    const PASSWORD_NAME = 'password';
    const SURNAME = 'surname';
    const GIVENNAME = 'givenname';

    protected $fillable = [
        'email', 'password', 'surname', 'givenname'
    ];

    protected $hidden = [
    'password', 'api_token', 'created_at', 'updated_at'
];

    public function logout(){
        $this->api_token = null;
    }

    public function emails(){
        return $this->hasMany('App\Models\Email');
    }

    public function educations(){
        return $this->hasMany(Education::class);
    }

    public function languages(){
        return $this->hasMany(Language::class);
    }

    public function professionals(){
        return $this->hasMany(Professional::class);
    }

    public function skills(){
        return $this->hasMany(Skill::class);
    }

    public function telephones(){
        return $this->hasMany(Telephone::class);
    }

    public function expos(){
        return $this->hasMany(Expo::class, 'user_id');
    }

    /**
     * @param $expId
     * @return bool
     */
    public function userPaid($expId){
        return 'false';
    }

    public function toArray(){
        return parent::toArray();
    }

}
