<?php

namespace App\Http\Controllers;

use App\Http\Requests\AbsenRequest;
use App\Models\DataAcara;
use App\Models\Kecamatan;
use App\Models\MasterTimPemenangan;
use App\Models\WaAbsen;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AbsenController extends Controller
{
    public function index(AbsenRequest $request)
    {
        $name = $request->nama;
        $no_handphone = $request->no_handphone;
        $alamat = $request->alamat;
        $kode_acara = $request->acara;


        $save = WaAbsen::create([
            'nama' => $name,
            'no_handphone' => $no_handphone,
            'alamat' => $alamat,
            'kode_acara'=>$kode_acara
        ]);

        return response()->json([
            "success" => true,
            "message" => 'Berhasil menyimpan',
            "data" => null
        ], 200);
    }

    public function view()
    {
        $arr = [
            'page' => 'Absen',
            'data' => WaAbsen::orderBy('created_at', 'desc')->get(),
            'acara' => DataAcara::all(),
            'kecamatan' => Kecamatan::all()
        ];
        return Inertia::render('Absen', $arr);
    }

    public function dataAcara()
    {
        $arr = [
            'page' => 'acara',
            'data' => DataAcara::all()
        ];
        return Inertia::render('DataAcara', $arr);
    }

    public function createEvent(Request $request)
    {

        $lokasi = $request->lokasi;
        $date = $request->tanggal;
        $judul = $request->judul_acara;
        $kode = Str::random(4);

        DataAcara::create([
            'title' => $judul,
            'kode_acara' => '#' . $kode,
            'date' => $date,
            'lokasi' => $lokasi
        ]);

        return redirect()->back();
    }

    public function delEvent($id)
    {

        DataAcara::where('id', $id)->delete();

        return redirect()->back();
    }
}
