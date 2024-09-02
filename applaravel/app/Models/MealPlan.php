<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MealPlan extends Model
{
    use HasFactory;

    /**
     * Atributi koji se mogu masovno dodeljivati.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'start_date',
        'end_date',
        'total_calories',      // Ukupne kalorije planirane za ceo period
        'activity_level',      // Nivo aktivnosti korisnika tokom ovog plana
        'protein_goal',        // Ciljani unos proteina u gramima
        'fat_goal',            // Ciljani unos masti u gramima
        'carb_goal',           // Ciljani unos ugljenih hidrata u gramima
        'status',              // Status plana (npr. aktivno, završeno, na čekanju)
        'notes',               // Dodatne napomene vezane za plan ishrane
    ];

    /**
     * Veza između plana ishrane i korisnika.
     * Plan ishrane pripada jednom korisniku.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Veza između plana ishrane i obroka.
     * Jedan plan ishrane može imati više obroka.
     */
    public function meals()
    {
        return $this->hasMany(Meal::class);
    }

    /**
     * Metod za izračunavanje ukupnih kalorija iz svih obroka u planu.
     *
     * @return int
     */
    public function calculateTotalCalories()
    {
        return $this->meals->sum('calories');
    }

    /**
     * Metod za označavanje plana kao završenog.
     *
     * @return void
     */
    public function markAsCompleted()
    {
        $this->update(['status' => 'completed']);
    }

    /**
     * Metod za proveru da li je plan aktivan.
     *
     * @return bool
     */
    public function isActive()
    {
        $today = now();
        return $this->start_date <= $today && $this->end_date >= $today;
    }
}
