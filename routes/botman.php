<?php

use App\Conversations\StartConversation;

$botman = resolve('botman');

$botman->fallback('App\Http\Controllers\FallbackController@index');