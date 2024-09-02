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
            $table->float('height'); // Visina korisnika u cm
            $table->float('weight'); // Težina korisnika u kg
            $table->date('date_of_birth'); // Datum rođenja korisnika
            $table->string('food_preferences'); // Preferencije hrane
            $table->string('dietary_goals'); // Ciljevi ishrane
            $table->string('activity_level'); // Nivo fizičke aktivnosti
            $table->float('target_weight'); // Ciljana težina u kg
            $table->text('medical_conditions'); // Medicinska stanja
            $table->string('role'); // Medicinska stanja
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
