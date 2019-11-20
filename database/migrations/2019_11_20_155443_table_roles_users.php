<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TableRolesUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('roles_users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string("name");

            $table->integer('user_id');
            $table->integer('role_id');

            $table->foreign('user_id')->references('id')->on('users')
                ->onDelete('cascade');
            
            $table->foreign('role_id')->references('id')->on('roles')
                ->onDelete('cascade');

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
        $table->dropForeign(['user_id']);
        $table->dropForeign(['role_id']);

        Schema::dropIfExists('roles_users');

    }
}
