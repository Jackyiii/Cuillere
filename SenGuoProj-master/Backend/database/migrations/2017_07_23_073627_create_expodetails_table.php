<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpodetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('expodetails', function(Blueprint $table){
            $table->increments('id');
            $table->string('title')->nullable();
            $table->string('abstract')->nullable();
            $table->string('image')->nullable();
            $table->unsignedInteger('expo_id');
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
        Schema::dropIfExists('expodetails');
    }
}
