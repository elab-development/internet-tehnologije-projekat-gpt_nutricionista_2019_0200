<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Definiše podrazumevane vrednosti atributa.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => bcrypt('password'), // podrazumevana lozinka
            'height' => $this->faker->numberBetween(150, 200), // visina u cm
            'weight' => $this->faker->numberBetween(50, 100), // težina u kg
            'date_of_birth' => $this->faker->date(),
            'food_preferences' => $this->faker->randomElement(['vegan', 'vegetarian', 'gluten-free', 'none']),
            'dietary_goals' => $this->faker->sentence(),
            'activity_level' => $this->faker->randomElement(['sedentary', 'active', 'very active']),
            'target_weight' => $this->faker->numberBetween(50, 100), // ciljana težina u kg
            'medical_conditions' => $this->faker->randomElement(['diabetes', 'hypertension', 'none']),
            'remember_token' => Str::random(10),
        ];
    }
}
