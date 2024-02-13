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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->string('sub_title', 100);
            $table->longText('logo');
            $table->string('website', 100);
            $table->string('phone', 15)->nullable();
            $table->string('whatsapp', 15)->nullable();
            $table->string('telegram', 50)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('address', 200)->nullable();
            $table->float('minimum_withdrawal')->nullable();
            $table->integer('under_maintenance')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
