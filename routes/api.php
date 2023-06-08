<?php

use App\Events\EventCreated;
use App\Events\WaApi;
use App\Http\Controllers\AbsenController;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\PhotoController;
use App\Models\BotSetting;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\DataAcara;
use App\Models\MasterTimPemenangan;
use App\Models\Notification;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//notif
Route::post('/notify', function (Request $request) {

    $type = $request->type;

    $data = [
        'title' => $request->title,
        'data' => $request->data
    ];
    Notification::create([
        'title' => $request->title,
        'type' => $request->type,
        'data' => $request->data,
    ]);
    EventCreated::dispatch($data);
});

Route::post('/wapi', function (Request $request) {
    $msg = [
        "msg" => $request->message,
        "type" => $request->type,
        "qr" => $request->qr
    ];

    if ($request->type == 'diconnected') {
    } elseif ($request->type == 'qr') {
        BotSetting::updateOrCreate(['setting_type' => 'wa-bot', 'input_type' => 'text'], ['setting_type' => 'wa-bot', 'input_type' => 'text','value'=>false]);
    } elseif ($request->type == 'ready') {
        BotSetting::updateOrCreate(['setting_type' => 'wa-bot', 'input_type' => 'text'], ['setting_type' => 'wa-bot', 'input_type' => 'text','value'=>true]);
    } elseif ($request->type == 'auth_failure') {
        BotSetting::updateOrCreate(['setting_type' => 'wa-bot', 'input_type' => 'text'], ['setting_type' => 'wa-bot', 'input_type' => 'text','value'=>false]);
    } elseif ($request->type == 'authenticated') {
        BotSetting::updateOrCreate(['setting_type' => 'wa-bot', 'input_type' => 'text'], ['setting_type' => 'wa-bot', 'input_type' => 'text','value'=>true]);
    } else {
        BotSetting::updateOrCreate(['setting_type' => 'wa-bot', 'input_type' => 'text'], ['setting_type' => 'wa-bot', 'input_type' => 'text','value'=>false]);
    }
    WaApi::dispatch($msg);

});

Route::POST('/uploadfromtelegram', [PhotoController::class, 'uploadFromUrl']);

Route::POST('/absen', [AbsenController::class, 'index']);

Route::get('/cekaja', function(){
    return 'hello';
});

Route::get('/getkecamatan', function (Request $request) {

    $all_kecamatan = Kecamatan::select('slug', 'nama')->get();

    return response()->json($all_kecamatan, 200);
});

Route::get('/getkelurahan/{slug}', function ($slug) {
    $selected_kecamatan_id = Kecamatan::where('slug', $slug)->select('id')->first();
    if ($selected_kecamatan_id) {
        $selected_kecamatan_id = $selected_kecamatan_id->id;
        $selected_kelurahan = Kelurahan::where('kecamatan_id', $selected_kecamatan_id)->select('nama', 'slug')->get();
        return response()->json($selected_kelurahan, 200);
    } else {
        return response()->json('error', 500);
    }
});

Route::post('/upload64', [PhotoController::class, 'uploadBase64']);

Route::post('/savefromwa', function (Request $request) {

    $nama = $request->nama;
    $nik = $request->nik;
    $no_handphone = $request->no_handphone;
    $kecamatan = $request->kecamatan;
    $kelurahan = $request->kelurahan;
    $rt = $request->rt;
    $rw = $request->rw;
    $img = $request->imgUrl;

    $kec = Kecamatan::where('slug', $kecamatan)->first();
    $kel = Kelurahan::where('slug', $kelurahan)->first();
    $kel_id = $kel->id;
    $kec_id = $kec->id;

    $save = MasterTimPemenangan::updateOrCreate(['nik' => $nik], [
        'nama' => $nama,
        'nik' => $nik,
        'no_handphone' => $no_handphone,
        'alamat' => 'RT/RW ' . $rt . '/' . $rw . ', ' . strtolower($kel->nama) . ', ' . strtolower($kec->nama) . ', Jakarta Utara',
        'no_tps' => 1,
        'kecamatan_id' => $kec_id,
        'kelurahan_id' => $kel_id,
        'telegram_id' => null,
        'rt' => $rt,
        'rw' => $rw,
        'jabatan' => null,
        'referensi' => 'suhud_alynudin',
        'photo' => $request->imageUrl,
        'tim' => 6
    ]);

    if ($save) {
        return response()->json('success', 200);
    } else {
        return response()->json('error', 500);
    }
});

Route::get('/list-acara', function(){
    
    try {
       $acara = DataAcara::all();
       return response()->json($acara, 200);
    } catch (Exception $th) {
        return response()->json($th->getMessage, 401);
    }
});

