<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MealResource extends JsonResource
{
    /**
     * Transformiše resurs u niz.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'calories' => $this->calories,
            'date' => $this->date,
            'time' => $this->time,
            'ingredients' => $this->ingredients,
            'instructions' => $this->instructions,
            'meal_type' => $this->meal_type,
            'servings' => $this->servings,
            'meal_plan' => new MealPlanResource($this->whenLoaded('mealPlan')), // Resurs za MealPlan
        ];
    }
}
