<?php

namespace Database\Factories;

use App\Models\Meal;
use App\Models\MealPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

class MealFactory extends Factory
{
    protected $model = Meal::class;

    /**
     * Definiše podrazumevane vrednosti atributa.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'meal_plan_id' => MealPlan::inRandomOrder()->first()->id,
            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'calories' => $this->faker->numberBetween(200, 800),
            'date' => $this->faker->date(),
            'time' => $this->faker->time(),
            'ingredients' => $this->faker->words(5, true), // Lista sastojaka
            'instructions' => $this->faker->paragraph(), // Uputstvo za pripremu
            'meal_type' => $this->faker->randomElement(['breakfast', 'lunch', 'dinner', 'snack']),
            'servings' => $this->faker->numberBetween(1, 4),
        ];
    }
}
