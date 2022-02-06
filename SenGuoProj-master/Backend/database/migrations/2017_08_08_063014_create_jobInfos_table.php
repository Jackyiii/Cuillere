<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
//        Schema::create('jobinfos', function(Blueprint $table){
//            $table->increments('id');
//            $table->string('info');
//            $table->unsignedInteger('expo_id');
//            $table->foreign('expo_id')->references('id')->on('expos');
//        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        //Schema::drop('jobinfos');
    }
}
