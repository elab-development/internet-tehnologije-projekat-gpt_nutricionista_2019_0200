<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

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

        // Poziv OpenAI API-ja
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $this->apiKey,
            'Content-Type' => 'application/json',
        ])->post($this->apiUrl, [
            'model' => 'gpt-3.5-turbo',  
            'messages' => $messages,
            'temperature' => 0.7,  
        ]);

        return $response->json();
    }

    protected function createPrompt($userInput)
    {
        // Kreiranje prompta na osnovu korisničkog unosa
        $prompt = "Create a detailed diet plan for the following user profile:\n";
        $prompt .= "User profile: " . json_encode($userInput) . "\n";
        $prompt .= "Diet plan should be for a period of " . $userInput['period'] . " days.\n";
        $prompt .= "Include meals that align with " . $userInput['preferences'] . " dietary preferences.\n";
        $prompt .= "Each day should include breakfast, lunch, dinner, and two snacks.\n";
        $prompt .= "Daily calorie goal: " . $userInput['calories'] . " calories.\n";
        $prompt .= "Each meal should contain details about ingredients and preparation instructions.";
        return $prompt;
    }
}
