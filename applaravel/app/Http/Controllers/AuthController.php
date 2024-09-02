<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Metoda za registraciju
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'height' => 'nullable|integer|min:50|max:300',   
            'weight' => 'nullable|integer|min:30|max:300',   
            'date_of_birth' => 'nullable|date',
            'food_preferences' => 'nullable|string',
            'dietary_goals' => 'nullable|string',
            'activity_level' => 'nullable|string',
            'target_weight' => 'nullable|integer|min:30|max:300',
            'medical_conditions' => 'nullable|string',
            'role' => 'nullable|string|in:admin,user',  
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'height' => $request->height,
            'weight' => $request->weight,
            'date_of_birth' => $request->date_of_birth,
            'food_preferences' => $request->food_preferences,
            'dietary_goals' => $request->dietary_goals,
            'activity_level' => $request->activity_level,
            'target_weight' => $request->target_weight,
            'medical_conditions' => $request->medical_conditions,
            'role' => $request->role ?? 'user',  // Podrazumevana uloga je 'user'
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Metoda za prijavu
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Metoda za odjavu
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
