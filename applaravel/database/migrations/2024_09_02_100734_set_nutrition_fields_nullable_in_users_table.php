<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SetNutritionFieldsNullableInUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->float('height')->nullable()->change();
            $table->float('weight')->nullable()->change();
            $table->date('date_of_birth')->nullable()->change();
            $table->string('food_preferences')->nullable()->change();
            $table->string('dietary_goals')->nullable()->change();
            $table->string('activity_level')->nullable()->change();
            $table->float('target_weight')->nullable()->change();
            $table->text('medical_conditions')->nullable()->change();
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
            
        });
    }
}
