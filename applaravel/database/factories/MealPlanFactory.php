<?php

namespace Database\Factories;

use App\Models\MealPlan;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MealPlanFactory extends Factory
{
    protected $model = MealPlan::class;

    /**
     * Definiše podrazumevane vrednosti atributa.
     *
     * @return array
     */
    public function definition()
    {
        return [
           'user_id' => User::inRandomOrder()->first()->id,
            'title' => $this->faker->sentence(),
            'start_date' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'end_date' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
            'total_calories' => $this->faker->numberBetween(1500, 3000),
            'activity_level' => $this->faker->randomElement(['sedentary', 'active', 'very active']),
            'protein_goal' => $this->faker->numberBetween(50, 200),
            'fat_goal' => $this->faker->numberBetween(20, 100),
            'carb_goal' => $this->faker->numberBetween(100, 300),
            'status' => $this->faker->randomElement(['active', 'completed', 'pending']),
            'notes' => $this->faker->paragraph(),
        ];
    }
}
