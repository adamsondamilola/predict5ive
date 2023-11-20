<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('username', 25);
            $table->string('country', 100);
            $table->string('country_code', 100)->nullable();
            $table->string('league', 255);
            $table->string('home_team', 100);
            $table->string('home_logo', 255)->nullable();
            $table->string('away_team', 100);
            $table->string('away_logo', 255)->nullable();
            $table->string('prediction', 100);
            $table->string('result', 20)->nullable();
            $table->date('game_date');
            $table->string('game_type')->nullable();
            $table->string('game_time')->nullable();
            $table->integer('status')->default(0);
            $table->integer('win_or_lose')->default(0);
            $table->integer('is_premium')->default(0);
            $table->integer('clicks')->default(0);
            $table->integer('upvotes')->default(0);
            $table->integer('downvotes')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
