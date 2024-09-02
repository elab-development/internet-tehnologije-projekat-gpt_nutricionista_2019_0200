<?php

namespace App\Http\Controllers;

use App\Models\MealPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\MealPlanResource;
use Illuminate\Support\Facades\Auth;

class MealPlanController extends Controller
{
    // Prikaz svih planova ishrane za ulogovanog korisnika
    public function index()
    {
        $user = Auth::user();
        $mealPlans = MealPlan::where('user_id', $user->id)->get();
        return MealPlanResource::collection($mealPlans);
    }

    // Prikaz jednog plana ishrane
    public function show($id)
    {
        $mealPlan = MealPlan::findOrFail($id);
        return new MealPlanResource($mealPlan);
    }

    // Kreiranje novog plana ishrane
    public function store(Request $request)
    {
        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'total_calories' => 'required|integer|min:0',
            'activity_level' => 'required|string|max:255',
            'protein_goal' => 'required|integer|min:0',
            'fat_goal' => 'required|integer|min:0',
            'carb_goal' => 'required|integer|min:0',
            'status' => 'required|string|max:50',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $mealPlan = MealPlan::create([
            'user_id' => $user->id,
            'title' => $request->title,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_calories' => $request->total_calories,
            'activity_level' => $request->activity_level,
            'protein_goal' => $request->protein_goal,
            'fat_goal' => $request->fat_goal,
            'carb_goal' => $request->carb_goal,
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        return new MealPlanResource($mealPlan);
    }

    // Ažuriranje postojećeg plana ishrane
    public function update(Request $request, $id)
    {
        $mealPlan = MealPlan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'total_calories' => 'required|integer|min:0',
            'activity_level' => 'required|string|max:255',
            'protein_goal' => 'required|integer|min:0',
            'fat_goal' => 'required|integer|min:0',
            'carb_goal' => 'required|integer|min:0',
            'status' => 'required|string|max:50',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $mealPlan->update($request->all());

        return new MealPlanResource($mealPlan);
    }

    // Brisanje plana ishrane
    public function destroy($id)
    {
        $mealPlan = MealPlan::findOrFail($id);
        $mealPlan->delete();

        return response()->json(['message' => 'Meal plan deleted successfully']);
    }
}
