<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpocommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('expocomments', function(Blueprint $table){
            $table->increments('id');
            $table->text('comment');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('expo_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('expo_id')->references('id')->on('expos');
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
        Schema::dropIfExists('expocomments');
    }
}
