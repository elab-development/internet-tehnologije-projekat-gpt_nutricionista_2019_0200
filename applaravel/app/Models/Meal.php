<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Meal extends Model
{
    use HasFactory;

    /**
     * Atributi koji se mogu masovno dodeljivati.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'meal_plan_id',
        'name',
        'description',
        'calories',
        'date',
        'time',
        'ingredients',          // Lista sastojaka potrebnih za pripremu jela
        'instructions',         // Uputstvo za pripremu jela
        'meal_type',            // Tip obroka (npr. doručak, ručak, večera, užina)
        'servings',             // Broj porcija
    ];

    /**
     * Veza između obroka i plana ishrane.
     * Obrok pripada jednom planu ishrane.
     */
    public function mealPlan()
    {
        return $this->belongsTo(MealPlan::class);
    }
}
