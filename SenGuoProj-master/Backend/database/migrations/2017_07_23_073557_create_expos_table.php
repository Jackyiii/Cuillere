<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExposTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('expos', function(Blueprint $table){
            $table->increments('id');
            $table->string('title')->nullable();
            $table->string('type')->nullable();
            $table->string('starttime')->nullable();
            $table->string('endtime')->nullable();
            $table->float('cost')->nullable();
            $table->string('taglist')->nullable();
            $table->string('subject')->nullable();
            $table->string('abstract')->nullable();
            $table->unsignedInteger('followcount')->default(0);
            $table->unsignedInteger('likecount')->default(0);
            $table->unsignedInteger('user_id');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('expos');
    }
}
