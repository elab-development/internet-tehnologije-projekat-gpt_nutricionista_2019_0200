<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNutritionFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->float('height')->nullable(); // Visina korisnika u cm
            $table->float('weight')->nullable(); // Težina korisnika u kg
            $table->date('date_of_birth')->nullable(); // Datum rođenja korisnika
            $table->string('food_preferences')->nullable(); // Preferencije hrane
            $table->string('dietary_goals')->nullable(); // Ciljevi ishrane
            $table->string('activity_level')->nullable(); // Nivo fizičke aktivnosti
            $table->float('target_weight')->nullable(); // Ciljana težina u kg
            $table->text('medical_conditions')->nullable(); // Medicinska stanja
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'height',
                'weight',
                'date_of_birth',
                'food_preferences',
                'dietary_goals',
                'activity_level',
                'target_weight',
                'medical_conditions',
            ]);
        });
    }
}
