<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->integer("id")->unique();
            $table->string("by")->nullable();
            $table->json("kids")->nullable();
            $table->integer("parent")->nullable();
            $table->string("text", 10000)->nullable();
            $table->string("time")->nullable();
            $table->string("type")->nullable();
            $table->string("title")->nullable();
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
        Schema::dropIfExists('comments');
    }
};
