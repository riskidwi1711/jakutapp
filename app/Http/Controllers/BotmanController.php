<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use BotMan\BotMan\BotMan;
use App\Conversations\ExampleConversation;
use BotMan\BotMan\Cache\LaravelCache;
use BotMan\BotMan\BotManFactory;
use BotMan\BotMan\Drivers\DriverManager;

class BotManController extends Controller
{
    /**
     * Place your BotMan logic here.
     */
    public function handle()
    {
        // Load the driver(s) you want to use
        DriverManager::loadDriver(\BotMan\Drivers\Telegram\TelegramDriver::class);

        $config = [
            // Your driver-specific configuration
            "telegram" => [
                "token" => "5892352200:AAGjjmVYQwFQ1FUKujkm7x9Zn8Blm6pRpEQ"
            ]
        ];
        $botman = BotManFactory::create($config, new LaravelCache());

        $botman->hears('/start|start|mulai', function (BotMan $bot) {
            $user = $bot->getUser();
            $bot->reply('Assalamualaikum ' . $user->getFirstName() . ', Selamat datang di DPD PKS Jakarta Utara Telegram Bot!. ');
            $bot->startConversation(new ExampleConversation());
        })->stopsConversation();

        $botman->hears('/kitab|kitab', function (BotMan $bot) {
            $bot->startConversation(new ExampleConversation());
        })->stopsConversation();

        $botman->fallback(function($bot) {
            $bot->reply('Maaf saya tidak mengerti apa yang kamu kirimkan...');
        });
        $botman->listen();
    }
}
