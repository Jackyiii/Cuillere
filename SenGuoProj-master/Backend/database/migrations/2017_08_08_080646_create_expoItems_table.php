<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExpoItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('expoitems', function(Blueprint $table){
            $table->increments('id');
            $table->string('title')->nullable();
            $table->string('abstract')->nullable();
            $table->string('image')->nullbale();
            $table->unsignedInteger('expodetail_id');
            $table->foreign('expodetail_id')->references('id')->on('expodetails');
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
        Schema::dropIfExists('expoitems');
    }
}
