<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMealsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('meal_plan_id'); // Strani ključ ka planu ishrane
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('calories')->nullable();
            $table->date('date');
            $table->time('time');
            $table->text('ingredients')->nullable();  // Lista sastojaka
            $table->text('instructions')->nullable(); // Uputstvo za pripremu jela
            $table->string('meal_type')->nullable();  // Tip obroka
            $table->integer('servings')->nullable();  // Broj porcija
            $table->text('notes')->nullable();        // Dodatne napomene
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
        Schema::dropIfExists('meals');
    }
}
