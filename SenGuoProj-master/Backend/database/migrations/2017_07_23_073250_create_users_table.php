<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\GlobalConst;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('users', function(Blueprint $table){
            $table->increments('id');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('surname');
            $table->string('givenname');
            $table->string('wechat')->nullable();
            $table->string('facebook')->nullable();
            $table->string('avatar')->nullable();
            $table->string('cv')->nullable();
            $table->tinyInteger('telephonevis')->default(GlobalConst::USER_ALLOW_ALL);
            $table->tinyInteger('emailvis')->default(GlobalConst::USER_ALLOW_ALL);
            $table->tinyInteger('wechatvis')->default(GlobalConst::USER_ALLOW_ALL);
            $table->tinyInteger('facebooksvis')->default(GlobalConst::USER_ALLOW_ALL);
            $table->tinyInteger('educationvis')->default(GlobalConst::USER_ALLOW_ALL);
            $table->tinyInteger('professionalvis')->default(GlobalConst::USER_ALLOW_ALL);
            $table->tinyInteger('skillvis')->default(GlobalConst::USER_ALLOW_ALL);
            $table->tinyInteger('access')->default(GlobalConst::USER_NORMAL);
            $table->string('api_token',60)->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop('users');
    }
}
