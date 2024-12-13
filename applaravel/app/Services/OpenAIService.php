<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenAIService
{
    protected $apiKey;
    protected $apiUrl = 'https://api.openai.com/v1/chat/completions';

    public function __construct()
    {
        $this->apiKey = env('OPENAI_API_KEY');
    }

    public function generateDietPlan($userInput)
    {
        $messages = [
            [
                'role' => 'user', 
                'content' => $this->createPrompt($userInput)
            ]
        ];

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post($this->apiUrl, [
            'model' => 'gpt-3.5-turbo',
            'messages' => $messages,
            'temperature' => 0.7,
        ]);
        
        Log::info($response->json());  // Ispis u log radi debugovanja
        return $response->json();
    }

    protected function createPrompt($userInput)
    {
        // Kreiraj prompt za generisanje JSON odgovora sa obrocima
        $prompt = "Create a detailed diet plan for a user with the following details:\n";
        $prompt .= "Period: " . $userInput['period'] . " days\n";
        $prompt .= "Calories: " . $userInput['calories'] . "\n";
        $prompt .= "Preferences: " . $userInput['preferences'] . "\n";
        $prompt .= "Return the diet plan in JSON format with the following structure:\n";
        $prompt .= "{ \"meals\": [{\"name\": \"Meal name\", \"description\": \"Meal description\", \"calories\": 500, \"meal_type\": \"breakfast\", \"ingredients\": [\"ingredient1\", \"ingredient2\"], \"instructions\": \"Prepare like this.\"}], \"protein_goal\": 100, \"fat_goal\": 50, \"carb_goal\": 150 }";
        return $prompt;
    }
    
}
