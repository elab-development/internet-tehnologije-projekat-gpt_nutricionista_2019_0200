<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MealPlanResource extends JsonResource
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
            'title' => $this->title,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'total_calories' => $this->total_calories,
            'activity_level' => $this->activity_level,
            'protein_goal' => $this->protein_goal,
            'fat_goal' => $this->fat_goal,
            'carb_goal' => $this->carb_goal,
            'status' => $this->status,
            'notes' => $this->notes,
            'user' => new UserResource($this->whenLoaded('user')),  
            'meals' => MealResource::collection($this->whenLoaded('meals')),  
        ];
    }
}
