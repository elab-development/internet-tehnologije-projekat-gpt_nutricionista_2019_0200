<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * Atributi koji se mogu masovno dodeljivati.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'height',              // Visina korisnika u cm
        'weight',              // Težina korisnika u kg
        'date_of_birth',       // Datum rođenja korisnika
        'food_preferences',    // Preferencije hrane (npr. vegetarijanac, vegan, bez glutena)
        'dietary_goals',       // Ciljevi ishrane (npr. smršati, dobiti mišićnu masu)
        'activity_level',      // Nivo fizičke aktivnosti (npr. sedentarni, aktivni)
        'target_weight',       // Ciljana težina korisnika u kg
        'medical_conditions',  // Medicinska stanja (npr. dijabetes, hipertenzija)
    ];

    /**
     * Atributi koji treba da budu skriveni za nizove.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Atributi koji treba da budu kastovani.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'date_of_birth' => 'date',
    ];

    /**
     * Veza između korisnika i planova ishrane.
     * Jedan korisnik može imati više planova ishrane.
     */
    public function mealPlans()
    {
        return $this->hasMany(MealPlan::class);
    }
}
