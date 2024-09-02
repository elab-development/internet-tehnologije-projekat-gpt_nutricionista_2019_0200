<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Meal;
use App\Models\MealPlan;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
          // Prvo kreiramo nekoliko korisnika
          User::factory(10)->create();

          // Zatim kreiramo nekoliko planova ishrane, svaki povezan sa random korisnikom
          MealPlan::factory(20)->create();
  
          // Na kraju, kreiramo nekoliko obroka, svaki povezan sa random planom ishrane
          Meal::factory(50)->create();
    }
}
