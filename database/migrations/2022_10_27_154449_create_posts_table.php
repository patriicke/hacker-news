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
        Schema::create('posts', function (Blueprint $table) {
            $table->integer("id")->unique();
            $table->boolean("deleted")->nullable();
            $table->string("by")->nullable();
            $table->string("type")->nullable();
            $table->string("time")->nullable();
            $table->string("text", 60000)->nullable();
            $table->boolean("dead")->nullable();
            $table->string("parent")->nullable();
            $table->string("poll")->nullable();
            $table->json("kids")->nullable();
            $table->string("url")->nullable();
            $table->string("score")->nullable();
            $table->string("title")->nullable();
            $table->string("parts")->nullable();
            $table->string("descendants")->nullable();
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
        Schema::dropIfExists('posts');
    }
};
