<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMealPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meal_plans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Strani ključ ka korisniku
            $table->string('title');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('total_calories')->nullable();  // Ukupne kalorije
            $table->string('activity_level')->nullable();   // Nivo aktivnosti
            $table->integer('protein_goal')->nullable();    // Ciljani unos proteina u gramima
            $table->integer('fat_goal')->nullable();        // Ciljani unos masti u gramima
            $table->integer('carb_goal')->nullable();       // Ciljani unos ugljenih hidrata u gramima
            $table->string('status')->default('active');    // Status plana
            $table->text('notes')->nullable();              // Dodatne napomene
            $table->timestamps(); // Automatski dodaje created_at i updated_at kolone
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meal_plans');
    }
}
