<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'height' => $this->height,
            'weight' => $this->weight,
            'date_of_birth' => $this->date_of_birth->format('Y-m-d'),
            'food_preferences' => $this->food_preferences,
            'dietary_goals' => $this->dietary_goals,
            'activity_level' => $this->activity_level,
            'target_weight' => $this->target_weight,
            'medical_conditions' => $this->medical_conditions,
     
        ];
    }
}
