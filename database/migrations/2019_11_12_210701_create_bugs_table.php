<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBugsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bugs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string("name");
            $table->text("description");
            $table->string("severity");
            
            $table->string("status")->nullable();
            $table->string("user_name")->nullable();
            $table->integer("project_id")->nullable();
            
            $table->foreign("project_id")->references("id")->on("projects")->onDelete('cascade');


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
        Schema::dropIfExists('bugs');
        //$table->dropForeign(['project_id']);

    }
}
