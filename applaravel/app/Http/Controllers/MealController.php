<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\MealResource;
use Illuminate\Support\Facades\Auth;

class MealController extends Controller
{
 
  
        // Prikaz svih obroka za određeni plan ishrane sa pretragom i paginacijom
        public function index(Request $request)
        {
            $mealPlanId = $request->query('meal_plan_id');
            $query = Meal::where('meal_plan_id', $mealPlanId);

            // Filtriranje po imenu obroka
            if ($request->has('search')) {
                $searchTerm = $request->query('search');
                $query->where('name', 'like', '%' . $searchTerm . '%');
            }

            // Dodavanje paginacije (npr. 10 obroka po stranici)
            $perPage = $request->query('per_page', 10);
            $meals = $query->paginate($perPage);

            return MealResource::collection($meals);
        }

    // Prikaz jednog obroka
    public function show($id)
    {
        $meal = Meal::findOrFail($id);
        return new MealResource($meal);
    }

    // Kreiranje novog obroka
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'meal_plan_id' => 'required|exists:meal_plans,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'calories' => 'required|integer|min:0',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'ingredients' => 'nullable|string',
            'instructions' => 'nullable|string',
            'meal_type' => 'required|string|max:50',
            'servings' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $meal = Meal::create($request->all());

        return new MealResource($meal);
    }

    // Ažuriranje postojećeg obroka
    public function update(Request $request, $id)
    {
        $meal = Meal::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'meal_plan_id' => 'required|exists:meal_plans,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'calories' => 'required|integer|min:0',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'ingredients' => 'nullable|string',
            'instructions' => 'nullable|string',
            'meal_type' => 'required|string|max:50',
            'servings' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $meal->update($request->all());

        return new MealResource($meal);
    }

    // Brisanje obroka
    public function destroy($id)
    {
        $meal = Meal::findOrFail($id);
        $meal->delete();

        return response()->json(['message' => 'Meal deleted successfully']);
    }
}
