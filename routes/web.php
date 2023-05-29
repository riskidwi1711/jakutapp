<?php

use App\Events\EventCreated;
use App\Events\WaApi;
use App\Http\Controllers\AbsenController;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\BotManController;
use App\Http\Controllers\ForsightController;
use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\Verify;
use App\Imports\DataImport;
use App\Mail\VerifyEmail;
use App\Models\Notification;
use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use PhpParser\Node\Stmt\TryCatch;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('register/verify/{registrationCode}', [Verify::class, 'confirm']);

Route::get('/', function () {
    return redirect('/login');
});

Route::any('/reverify', function (Request $request) {

    switch ($request->method()) {
        case 'POST':

            $user = User::where('confirmed', 0)->where('confirmation_code', '!=', null)->get();
            if (count($user) >= 1) {
                Mail::to($request->email)->send(new VerifyEmail($user[0]->confirmation_code));
                session()->flash('message', 'Silahkan cek email anda untuk konfirmasi.');
                return Redirect::to('login');
            } else {
                session()->flash('message', 'Email telah terverifikasi.');
            }

            break;

        case 'GET':
            return Inertia::render('Auth/EmailVerification');
            break;

        default:
            return Inertia::render('Auth/EmailVerification');
            break;
    }
})->name('reverify');

Route::match(['get', 'post'], '/botman', [BotManController::class, 'handle']);

Route::get('/dashboard', [Dashboard::class, 'index'])->name('dashboard');
Route::get('/petadata', [Dashboard::class, 'petadata'])->name('dashboard.peta');
Route::get('/datatable/{param}', [Dashboard::class, 'DataSaksi'])->name('dashboard.datasaksi');
Route::get('/data/kel/{param}/{id}', [Dashboard::class, 'detaildata'])->name('dashboard.datasaksi');


Route::get('/pengaturan/bot-telegram', [Dashboard::class, 'BotSetting'])->name('dashboard.setting.bot');
Route::post('/pengaturan/bot-telegram', [Dashboard::class, 'BotSetting'])->name('dashboard.setting.bot');
Route::get('/pengaturan/web-setting', [Dashboard::class, 'WebSetting'])->name('dashboard.setting.web');
Route::get('/pengaturan/bot-wa', [Dashboard::class, 'BotSetting'])->name('dashboard.setting.wa');

Route::get('/pdkependudukan', [Dashboard::class, 'GisCapil'])->name('dashboard.setting.capil');

Route::post('/insert/{param}', [Dashboard::class, 'Insert'])->name('dashboard.post.saksi');
Route::delete('/delete/{param}/{id}', [Dashboard::class, 'deleteData'])->name('dashboard.delete.saksi');
Route::post('/edit/{id}', [Dashboard::class, 'EditData'])->name('edit.data');

Route::get('/datawilayah/{param}', [Dashboard::class, 'dataWilayah']);
Route::get('/detailwilayah/{param}/{id}', [Dashboard::class, 'detailWilayah']);


//forsight route
Route::get('/forsight/home', [ForsightController::class, 'index']);
Route::post('/addsurvey', [ForsightController::class, 'storeSurvey']);
Route::post('/addquestion/{id}', [ForsightController::class, 'storeQuestion']);
Route::get('/forsight/detail/{id}', [ForsightController::class, 'detail']);
Route::get('/forsight/delete/q/{id}', [ForsightController::class, 'deleteq']);
Route::get('/forsight/delete/s/{id}', [ForsightController::class, 'deletes']);

//changecoplorpartai
Route::post('/changecolor/{param}', [Dashboard::class, 'changecolor']);

//userroute
Route::get('/users', [Dashboard::class, 'users']);
Route::get('/registeredusers', [Dashboard::class, 'registeredUser']);


Route::get('assets/{path}', function ($path) {
    return response()->file(public_path("assets/$path"));
});

Route::any('upload/{data}', function ($data, Request $request) {

    $dataImport = [];

    if ($request->isMethod('POST')) {
        $request->validate([
            'file' => 'required|mimes:xls,xlsx'
        ]);
        $file = $request->file('file');
        $failures = [];
        if ($request->has('process')) {
            try {
                Excel::import(new DataImport, $file);
            } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
                $failures = $e->failures();
                $data = [
                    'page' => 'uploaddata',
                    'datas' => [],
                    'result' => $failures
                ];

                return Inertia::render('UploadData', $data);
            }
        } else {
            $dataImport =  Excel::toArray(new DataImport, $file);
            $data = [
                'page' => 'uploaddata',
                'datas' => $dataImport,
                'result' => null
            ];

            return Inertia::render('UploadData', $data);
        }

        $data = [
            'page' => 'uploaddata',
            'datas' => $dataImport,
            'result' => null
        ];

        return Inertia::render('UploadData', $data);
    } else {

        $data = [
            'page' => 'uploaddata',
            'datas' => $dataImport,
            'result' => null
        ];

        return Inertia::render('UploadData', $data);
    }
});

Route::get('formatedfile', function () {
    return  response()->download(public_path('excel/format.xlsx'), 'Contoh file untuk di upload.xlsx');
});

//absen route
Route::get('/absen', [AbsenController::class, 'view']);
Route::get('/acara', [AbsenController::class, 'dataAcara']);
Route::post('/createacara', [AbsenController::class, 'createEvent']);
Route::delete('/deleteevent/{id}', [AbsenController::class, 'delEvent']);



Route::middleware(['access'])->group(function () {
    Route::get('/users', [Dashboard::class, 'users']);
    Route::get('/registeredusers', [Dashboard::class, 'registeredUser']);
    Route::put('/giveaccess/{id}', [Dashboard::class, 'access']);
});

//event
Route::get('notifikasi', [NotifikasiController::class, 'index'])->name('notifications');
Route::delete('/deletenotif/{id}', [NotifikasiController::class, 'delete']);

Route::get('rsc/{filename}', function ($filename) {
    return response()->file(resource_path('js/' . $filename));
});


require __DIR__ . '/auth.php';
