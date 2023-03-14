<?php

namespace App\Http\Controllers;

use App\Models\BotSetting;
use App\Models\Calon;
use App\Models\CalonPresiden;
use App\Models\Dapil;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\MasterTimPemenangan;
use App\Models\Notification;
use App\Models\Partai;
use App\Models\Polls;
use App\Models\Relawan;
use App\Models\Suara;
use App\Models\SuaraPresiden;
use App\Models\Tps;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class Dashboard extends Controller
{

    public function __construct()
    {
    }

    public function generateData($datasets, $group)
    {
        $sub_name = [];
        $dset = [];
        $v_name = [];
        foreach ($datasets->groupBy('nama_calon') as $key => $value) {
            $sub_name[] = $key;
            foreach ($value->groupBy($group) as $ket => $v) {
                $r[] = $v->sum('suara');
                $lab[] = $ket;
            }
            $b = collect($r)->split(count($sub_name))->toArray();
        }

        for ($i = 0; $i < count($sub_name); $i++) {
            $dset[] = [$sub_name[$i], $b[$i]];
        }
        foreach ($datasets->groupBy($group) as $key => $value) {
            $v_name[] = $key;
        }

        return [$dset, $v_name];
    }

    public function generateSingleData($datasets, $group)
    {

        $d = $datasets->groupBy($group);
        $object = [];
        $value = [];
        $dset = [];
        foreach ($d as $key => $l) {
            $object[] = $key;
            $value[] = $l->sum('suara');
        }

        for ($i = 0; $i < count($object); $i++) {
            $dset[] = [$object[$i], [$value[$i]]];
        }

        return $dset;
    }

    public function index()
    {



        $all_tps = Tps::all();
        $all_dapil = Dapil::all();
        $partai = Partai::all();
        $all_calon = Calon::all();
        $data_masuk = Suara::select('suara')->get();
        $tot_data_masuk = collect($data_masuk)->sum('suara');
        $relawan = Relawan::all();
        $sub_name = [];
        $dset = [];
        $v_name = [];
        $notification = Notification::all();
        //datapemenangan
        $all = MasterTimPemenangan::join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->get();
        $saksi = MasterTimPemenangan::whereRaw('LOCATE(2, `tim`) > 0')->orderBy("created_at", "DESC")->get();
        $korsak = MasterTimPemenangan::whereRaw('LOCATE(1, `tim`) > 0')->orderBy("created_at", "DESC")->get();
        $korte = MasterTimPemenangan::whereRaw('LOCATE(4, `tim`) > 0')->orderBy("created_at", "DESC")->get();
        $korwe = MasterTimPemenangan::whereRaw('LOCATE(3, `tim`) > 0')->orderBy("created_at", "DESC")->get();
        $kortps = MasterTimPemenangan::whereRaw('LOCATE(5, `tim`) > 0')->orderBy("created_at", "DESC")->get();
        $pemilih = MasterTimPemenangan::whereRaw('LOCATE(6, `tim`) > 0')->orderBy("created_at", "DESC")->get();
        $tokoh = MasterTimPemenangan::whereRaw('LOCATE(7, `tim`) > 0')->orderBy("created_at", "DESC")->get();
        $map_tps = Tps::join('kelurahans', 'kelurahans.id', '=', 'tps.id_kelurahan')->get();
        $map_saksi = MasterTimPemenangan::whereRaw('LOCATE(2, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->orderBy("created_at", "DESC")->get();
        $map_korsak = MasterTimPemenangan::whereRaw('LOCATE(1, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->orderBy("created_at", "DESC")->get();
        $map_korte  = MasterTimPemenangan::whereRaw('LOCATE(4, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->orderBy("created_at", "DESC")->get();
        $map_korwe = MasterTimPemenangan::whereRaw('LOCATE(3, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->orderBy("created_at", "DESC")->get();
        $map_kortps = MasterTimPemenangan::whereRaw('LOCATE(5, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->orderBy("created_at", "DESC")->get();
        $map_dcpt = MasterTimPemenangan::whereRaw('LOCATE(6, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->orderBy("created_at", "DESC")->get();
        $map_tokoh = MasterTimPemenangan::whereRaw('LOCATE(7, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->orderBy("created_at", "DESC")->get();


        $datasets = collect(Suara::join('calons', 'suaras.id_caleg', '=', 'calons.id')->join('tps', 'suaras.id_tps', '=', 'tps.id')->get()->toArray());
        $dataByPartai = collect(Suara::join('calons', 'suaras.id_caleg', '=', 'calons.id')->join('partais', 'suaras.id_partai', '=', 'partais.id')->get()->toArray());
        $dataByCalon = collect(Suara::join('calons', 'suaras.id_caleg', '=', 'calons.id')->get()->toArray());


        foreach ($datasets->groupBy('nama_calon') as $key => $value) {
            $sub_name[] = $key;
            foreach ($value->groupBy('nama') as $ket => $v) {
                $r[] = $v->sum('suara');
                $lab[] = $ket;
            }
            $b = collect($r)->split(count($sub_name))->toArray();
        }

        for ($i = 0; $i < count($sub_name); $i++) {
            $dset[] = [$sub_name[$i], $b[$i]];
        }
        foreach ($datasets->groupBy('nama') as $key => $value) {
            $v_name[] = $key;
        }



        $chart_data = [
            'per_tps' => [
                'data' => $dset,
                'label' => $v_name,
                'backgorund_color' => '#CFF5E7'
            ],
            'per_partai' => [
                'data' => $this->generateData($dataByPartai, 'nama_partai')[0],
                'label' => $this->generateData($dataByPartai, 'nama_partai')[1],
                'backgorund_color' => '#CFF5E7'
            ], 'per_calon' => [
                'data' => $this->generateSingleData($dataByCalon, 'nama_calon'),
                'label' => ['Data Suara Caleg Masuk'],
                'backgorund_color' => '#CFF5E7'
            ],
        ];

        $data = [
            'all' => $all,
            'tps' => $all_tps,
            'peta_tps' => $map_tps,
            'peta_saksi' => $map_saksi,
            'peta_korsak' => $map_korsak,
            'peta_korwe' => $map_korwe,
            'peta_korte' => $map_korte,
            'peta_dcpt' => $map_dcpt,
            'peta_kortps' => $map_kortps,
            'peta_tokoh' => $map_tokoh,
            'dapil' => $all_dapil,
            'calon' => $all_calon,
            'partai' => $partai,
            'data_masuk' => $tot_data_masuk,
            'relawan' => $relawan,
            'chart' => $chart_data,
            'korsak' => $korsak,
            'korte' => $korte,
            'korwe' => $korwe,
            'kortps' => $kortps,
            'kecamatan' => Kecamatan::all(),
            'kelurahan' => Kelurahan::all(),
            'tps' => Tps::all(),
            'saksi' => $saksi,
            'partai' => Partai::all(),
            'dprri' => Calon::where('tipe', 'dprri')->get(),
            'dprd' => Calon::where('tipe', 'dprdpro')->get(),
            'dpd' => Calon::where('tipe', 'dpd')->get(),
        ];

        return Inertia::render('Dashboard', $data);
    }

    public function petadata()
    {

        $all_tps = Tps::all();
        $all_dapil = Dapil::all();
        $all_calon = Calon::all();
        $data_masuk = Polls::all();
        $tps = Tps::join('kelurahans', 'kelurahans.id', '=', 'tps.id_kelurahan')->get();
        $saksi = MasterTimPemenangan::whereRaw('LOCATE(2, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->get();
        $korsak = MasterTimPemenangan::whereRaw('LOCATE(1, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->get();
        $korte  = MasterTimPemenangan::whereRaw('LOCATE(4, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->get();
        $korwe = MasterTimPemenangan::whereRaw('LOCATE(3, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->get();
        $kortps = MasterTimPemenangan::whereRaw('LOCATE(5, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->get();
        $dcpt = MasterTimPemenangan::whereRaw('LOCATE(6, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->get();
        $tokoh = MasterTimPemenangan::whereRaw('LOCATE(7, `tim`) > 0')->join('kelurahans', 'kelurahans.id', '=', 'master_tim_pemenangans.kelurahan_id')->select('kelurahans.nama as kel_nama', 'master_tim_pemenangans.*')->get();

        $data = [
            'tps' => $all_tps,
            'dapil' => $all_dapil,
            'calon' => $all_calon,
            'data_masuk' => $data_masuk,
            'tps' => $tps,
            'saksi' => $saksi,
            'korsak' => $korsak,
            'korte' => $korte,
            'kecamatan' => Kecamatan::all(),
            'kelurahan' => Kelurahan::all(),
            'korwe' => $korwe,
            'kortps' => $kortps,
            'dcpt' => $dcpt,
            'tokoh' => $tokoh
        ];

        return Inertia::render('PetaData', $data);
    }

    public function DataSaksi($param)
    {
        $arr = [];

        if ($param == 'saksi') {
            $arr = [
                'page' => 'DataSaksi',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(2, `tim`) > 0')->orderBy("created_at", "DESC")->get()
            ];
        } elseif ($param == 'korwe') {
            $arr = [
                'page' => 'Korwe',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(3, `tim`) > 0')->orderBy("created_at", "DESC")->get()
            ];
        } elseif ($param == 'korte') {
            $arr = [
                'page' => 'Korte',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(4, `tim`) > 0')->orderBy("created_at", "DESC")->get()
            ];
        } elseif ($param == 'kortps') {
            $arr = [
                'page' => 'Kortps',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(5, `tim`) > 0')->orderBy("created_at", "DESC")->get()
            ];
        } elseif ($param == 'pemilih') {
            $arr = [
                'page' => 'Pemilih',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(6, `tim`) > 0')->orderBy("created_at", "DESC")->get()
            ];

        } elseif ($param == 'tokoh') {
            $arr = [
                'page' => 'Tokoh',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(7, `tim`) > 0')->orderBy("created_at", "DESC")->get()
            ];
        } elseif ($param == 'suara_caleg') {
            $arr = [
                'page' => 'SCaleg',
                'data_tim_pemenangan' => Suara::join('partais', 'partais.id', '=', 'suaras.id_partai')->join('tps', 'tps.id', '=', 'suaras.id_tps')->join('calons', 'calons.id', '=', 'id_caleg')->get()
            ];
        } elseif ($param == 'suara_partai') {
            $arr = [
                'page' => 'SPartai',
                'data_tim_pemenangan' => Suara::join('partais', 'partais.id', '=', 'suaras.id_partai')->join('tps', 'tps.id', '=', 'suaras.id_tps')->join('calons', 'calons.id', '=', 'id_caleg')->get()
            ];
        } elseif ($param == 'ppwp') {
            $arr = [
                'page' => 'Master/Presiden',
                'data_presiden' => CalonPresiden::all()
            ];
        } elseif ($param == 'partai') {
            $arr = [
                'page' => 'Master/Partai',
                'data_partai' => Partai::all()
            ];
        } elseif ($param == 'caleg-dprri') {
            $arr = [
                'page' => 'Master/Dprri',
                'partai' => Partai::all(),
                'data_caleg' => Calon::join('partais', 'partais.id', 'calons.id_partai')->where('tipe', 'dprri')->select('partais.nama_partai', 'calons.*')->get()
            ];
        } elseif ($param == 'caleg-dprd-pro') {
            $arr = [
                'page' => 'Master/Dprdpro',
                'partai' => Partai::all(),
                'data_caleg' => Calon::join('partais', 'partais.id', 'calons.id_partai')->where('tipe', 'dprdpro')->select('partais.nama_partai', 'calons.*')->get()
            ];
        } elseif ($param == 'caleg-dpd') {
            $arr = [
                'page' => 'Master/Dpd',
                'partai' => Partai::all(),
                'data_caleg' => Calon::join('partais', 'partais.id', 'calons.id_partai')->where('tipe', 'dpd')->select('partais.nama_partai', 'calons.*')->get()
            ];
        }elseif ($param == 'dasawisma') {
            $arr = [
                'page' => 'Dasawisma',
                'partai' => Partai::all(),
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(8, `tim`) > 0')->orderBy("created_at", "DESC")->get()
            ];
        } else {
            $arr = [
                'page' => 'Korsak',
                'data_tim_pemenangan' => MasterTimPemenangan::where('tim', 1)->orderBy("created_at", "DESC")->get()
            ];
        }

        $arr['kecamatan'] = Kecamatan::all();

        $arr['kelurahan'] = Kelurahan::all();


        return Inertia::render($arr['page'], $arr);
    }

    public function BotSetting(Request $request)
    {
        $arr = [
            'page' => 'BotSetting',
            'data' => BotSetting::all(),
            'status'=> BotSetting::where('setting_type','wa-bot')->first()
        ];

        if ($request->isMethod('post')) {
            BotSetting::where('setting_type', 'bot_api')->update(['value' => $request->bot_api]);
            return redirect()->back();
        }
        return Inertia::render($arr['page'], $arr);
    }

    public function WaSetting(Request $request)
    {
        $arr = [
            'page' => 'WaBot',
            'data' => BotSetting::all()
        ];

        if ($request->isMethod('post')) {
            BotSetting::where('setting_type', 'bot_api')->update(['value' => $request->bot_api]);
            return redirect()->back();
        }
        return Inertia::render($arr['page'], $arr);
    }

    public function WebSetting()
    {
        $arr = [
            'page' => 'WebSetting'
        ];
        return Inertia::render($arr['page'], $arr);
    }

    public function GisCapil()
    {
        return Inertia::render('GisCapil');
    }

    public function getKecName($id)
    {
        $kec = Kecamatan::where('id', $id)->select('nama')->first();

        return $kec->nama;
    }

    public function getKelName($id)
    {
        $kec = Kelurahan::where('id', $id)->select('nama')->first();

        return $kec->nama;
    }


    public function deleteData($param, $id)
    {
        switch ($param) {
            case 'saksi':
                $data = MasterTimPemenangan::find($id);
                $data->delete();
                break;
            case 'korsak':
                $data = MasterTimPemenangan::find($id);
                $data->delete();
                break;
            case 'korwe':
                $data = MasterTimPemenangan::find($id);
                $data->delete();
                break;
            case 'dprri':
                $data = Calon::find($id);
                $data->delete();
                break;
            case 'dprd':
                $data = Calon::find($id);
                $data->delete();
                break;
            case 'dpd':
                $data = Calon::find($id);
                $data->delete();
                break;
            case 'presiden':
                $data = CalonPresiden::find($id);
                $data->delete();
                break;
            case 'partai':
                $data = Partai::find($id);
                $data->delete();
                break;
            case 'user':
                $data = User::find($id);
                $data->delete();
                break;
            default:
                $data = MasterTimPemenangan::find($id);
                $data->delete();
                break;
        }
    }

    //Operation Method
    public function Insert(Request $request, $param)
    {
        $nama = $request->nama;
        $no_handphone = $request->no_handphone;
        $alamat = $request->alamat;
        $no_tps = $request->no_tps;
        $kecamatan = $request->kecamatan;
        $kelurahan = $request->kelurahan;
        $rw = $request->rw;
        $rt = $request->rt;
        $referensi = $request->referensi;
        $nama_file = '';
        $countryCode = 62;


        $no_handphone =  preg_replace('/^0?/', '+' . $countryCode, $no_handphone);

        if ($request->file('file')) {
            $image = $request->file('file');
            $tujuan_upload = 'data_file';
            $nama_file = rand() . '.' . $image->getClientOriginalExtension();
            $image->move($tujuan_upload, $nama_file);
        }


        //insert data
        switch ($param) {
            case 'saksi':
                $request->validate([
                    'nama' => ['required', 'max:50'],
                    'no_handphone' => ['required', 'max:50', 'min:10'],
                    'no_tps' => ['required', 'max:50'],
                    'kecamatan' => ['required', 'max:50'],
                    'kelurahan' => ['required', 'max:50'],
                    'rw' => ['required', 'max:50'],
                    'rt' => ['required', 'max:50'],
                    'referensi' => ['required', 'max:50'],
                ]);
                $insertdata = MasterTimPemenangan::create([
                    'nama' => $nama,
                    'no_handphone' => $no_handphone,
                    'alamat' => 'RT/RW ' . $rt . '/' . $rw . ', ' . strtolower($this->getKelName($kelurahan)) . ', ' . strtolower($this->getKecName($kecamatan)) . ', Jakarta Utara',
                    'no_tps' => $no_tps,
                    'kecamatan_id' => $kecamatan,
                    'kelurahan_id' => $kelurahan,
                    'telegram_id' => $request->telegram_id,
                    'rt' => $rt,
                    'rw' => $rw,
                    'jabatan' => null,
                    'referensi' => $referensi,
                    'photo' => $nama_file,
                    'tim' => 2
                ]);
                break;
            case 'korsak':
                $request->validate([
                    'nama' => ['required', 'max:50'],
                    'no_handphone' => ['required', 'max:50', 'min:10'],
                    'no_tps' => ['required', 'max:50'],
                    'kecamatan' => ['required', 'max:50'],
                    'kelurahan' => ['required', 'max:50'],
                    'rw' => ['required', 'max:50'],
                ]);
                $insertdata = MasterTimPemenangan::create([
                    'nama' => $nama,
                    'no_handphone' => $no_handphone,
                    'alamat' => 'RT/RW ' . $rt . '/' . $rw . ', ' . strtolower($this->getKelName($kelurahan)) . ', ' . strtolower($this->getKecName($kecamatan)) . ', Jakarta Utara',
                    'no_tps' => $no_tps,
                    'kecamatan_id' => $kecamatan,
                    'kelurahan_id' => $kelurahan,
                    'telegram_id' => $request->telegram_id,
                    'rt' => $rt,
                    'rw' => $rw,
                    'jabatan' => null,
                    'referensi' => $referensi,
                    'photo' => $nama_file,
                    'tim' => 1
                ]);
                break;
            case 'korwe':
                $request->validate([
                    'nama' => ['required', 'max:50'],
                    'no_handphone' => ['required', 'max:50', 'min:10'],
                    'no_tps' => ['required', 'max:50'],
                    'kecamatan' => ['required', 'max:50'],
                    'kelurahan' => ['required', 'max:50'],
                    'rw' => ['required', 'max:50'],
                ]);
                $insertdata = MasterTimPemenangan::create([
                    'nama' => $nama,
                    'no_handphone' => $no_handphone,
                    'alamat' => 'RT/RW ' . $rt . '/' . $rw . ', ' . strtolower($this->getKelName($kelurahan)) . ', ' . strtolower($this->getKecName($kecamatan)) . ', Jakarta Utara',
                    'no_tps' => $no_tps,
                    'kecamatan_id' => $kecamatan,
                    'kelurahan_id' => $kelurahan,
                    'telegram_id' => $request->telegram_id,
                    'rt' => $rt,
                    'rw' => $rw,
                    'jabatan' => null,
                    'referensi' => $referensi,
                    'photo' => $nama_file,
                    'tim' => 3
                ]);
                break;
            case 'korte':
                $request->validate([
                    'nama' => ['required', 'max:50'],
                    'no_handphone' => ['required', 'max:50', 'min:10'],
                    'no_tps' => ['required', 'max:50'],
                    'kecamatan' => ['required', 'max:50'],
                    'kelurahan' => ['required', 'max:50'],
                    'rw' => ['required', 'max:50'],
                ]);
                $insertdata = MasterTimPemenangan::create([
                    'nama' => $nama,
                    'no_handphone' => $no_handphone,
                    'alamat' => 'RT/RW ' . $rt . '/' . $rw . ', ' . strtolower($this->getKelName($kelurahan)) . ', ' . strtolower($this->getKecName($kecamatan)) . ', Jakarta Utara',
                    'no_tps' => $no_tps,
                    'kecamatan_id' => $kecamatan,
                    'kelurahan_id' => $kelurahan,
                    'telegram_id' => $request->telegram_id,
                    'rt' => $rt,
                    'rw' => $rw,
                    'jabatan' => null,
                    'referensi' => $referensi,
                    'photo' => $nama_file,
                    'tim' => 4
                ]);
                break;
            case 'kortps':
                $request->validate([
                    'nama' => ['required', 'max:50'],
                    'no_handphone' => ['required', 'max:50', 'min:10'],
                    'no_tps' => ['required', 'max:50'],
                    'kecamatan' => ['required', 'max:50'],
                    'kelurahan' => ['required', 'max:50'],
                    'rw' => ['required', 'max:50'],
                ]);
                $insertdata = MasterTimPemenangan::create([
                    'nama' => $nama,
                    'no_handphone' => $no_handphone,
                    'alamat' => 'RT/RW ' . $rt . '/' . $rw . ', ' . strtolower($this->getKelName($kelurahan)) . ', ' . strtolower($this->getKecName($kecamatan)) . ', Jakarta Utara',
                    'no_tps' => $no_tps,
                    'kecamatan_id' => $kecamatan,
                    'kelurahan_id' => $kelurahan,
                    'telegram_id' => $request->telegram_id,
                    'rt' => $rt,
                    'rw' => $rw,
                    'jabatan' => null,
                    'referensi' => $referensi,
                    'photo' => $nama_file,
                    'tim' => 5
                ]);
                break;
            case 'dcpt':
                $request->validate([
                    'nama' => ['required', 'max:50'],
                    'no_handphone' => ['required', 'max:50', 'min:10'],
                    'no_tps' => ['required', 'max:50'],
                    'kecamatan' => ['required', 'max:50'],
                    'kelurahan' => ['required', 'max:50'],
                    'rw' => ['required', 'max:50'],
                ]);
                $insertdata = MasterTimPemenangan::create([
                    'nama' => $nama,
                    'no_handphone' => $no_handphone,
                    'alamat' => 'RT/RW ' . $rt . '/' . $rw . ', ' . strtolower($this->getKelName($kelurahan)) . ', ' . strtolower($this->getKecName($kecamatan)) . ', Jakarta Utara',
                    'no_tps' => $no_tps,
                    'kecamatan_id' => $kecamatan,
                    'kelurahan_id' => $kelurahan,
                    'telegram_id' => $request->telegram_id,
                    'rt' => $rt,
                    'rw' => $rw,
                    'jabatan' => null,
                    'referensi' => $referensi,
                    'photo' => $nama_file,
                    'tim' => 6
                ]);
                break;
            case 'tokoh':
                $request->validate([
                    'nama' => ['required', 'max:50'],
                    'no_handphone' => ['required', 'max:50', 'min:10'],
                    'no_tps' => ['required', 'max:50'],
                    'kecamatan' => ['required', 'max:50'],
                    'kelurahan' => ['required', 'max:50'],
                    'rw' => ['required', 'max:50'],
                ]);
                $insertdata = MasterTimPemenangan::create([
                    'nama' => $nama,
                    'no_handphone' => $no_handphone,
                    'alamat' => 'RT/RW ' . $rt . '/' . $rw . ', ' . strtolower($this->getKelName($kelurahan)) . ', ' . strtolower($this->getKecName($kecamatan)) . ', Jakarta Utara',
                    'no_tps' => $no_tps,
                    'kecamatan_id' => $kecamatan,
                    'kelurahan_id' => $kelurahan,
                    'telegram_id' => $request->telegram_id,
                    'rt' => $rt,
                    'rw' => $rw,
                    'jabatan' => null,
                    'referensi' => $referensi,
                    'photo' => $nama_file,
                    'jabatan' => $request->jabatan,
                    'tim' => 7
                ]);
                break;
            case 'partai':
                $insertdata = Partai::create([
                    'nama_partai' => $request->nama,
                    'nama_lengkap' => $request->nama_lengkap,
                    'warna' => $request->warna,
                    'no_urut' => $request->no_urut
                ]);
                break;
            case 'presiden':
                $insertdata = CalonPresiden::create([
                    'nama' => $request->nama,
                    'warna' => $request->warna,
                    'no_urut' => $request->no_urut
                ]);
                break;
            case 'dprri':
                $insertdata = Calon::create([
                    'nama_calon' => $request->nama,
                    'no_urut' => $request->no_urut,
                    'tempat_tinggal' => $request->tempat_tinggal,
                    'jk' => $request->jk,
                    'id_partai' => $request->partai,
                    'tipe' => 'dprri'
                ]);
                break;
            case 'dprdpro':
                $insertdata = Calon::create([
                    'nama_calon' => $request->nama,
                    'no_urut' => $request->no_urut,
                    'tempat_tinggal' => $request->tempat_tinggal,
                    'jk' => $request->jk,
                    'id_partai' => $request->partai,
                    'tipe' => 'dprdpro'
                ]);
                break;
            case 'dpd':
                $insertdata = Calon::create([
                    'nama_calon' => $request->nama,
                    'no_urut' => $request->no_urut,
                    'tempat_tinggal' => $request->tempat_tinggal,
                    'jk' => $request->jk,
                    'id_partai' => $request->partai,
                    'tipe' => 'dpd'
                ]);
                break;
            case 'user':
                $insertdata = User::create([
                    'name' => $request->nama,
                    'email' => $request->email,
                    'telegram_id' => $request->telegram_id,
                    'bot_ability' => $request->bot_ability,
                    'no_handphone' => $request->no_handphone,
                    'keterangan' => $request->keterangan,
                    'password' => Hash::make($request->password)
                ]);
                break;

            default:
                $insertdata = MasterTimPemenangan::create([
                    'nama' => $nama,
                    'no_handphone' => $no_handphone,
                    'alamat' => 'RT/RW ' . $rw . ', ' . strtolower($this->getKelName($kelurahan)) . ', ' . strtolower($this->getKecName($kecamatan)) . ', Jakarta Utara',
                    'no_tps' => $no_tps,
                    'kecamatan_id' => $kecamatan,
                    'kelurahan_id' => $kelurahan,
                    'rt/rw' => $rw,
                    'jabatan' => null,
                    'photo' => $nama_file,
                    'tim' => 1
                ]);
                break;
        }

        return Redirect::back();
    }


    public function dataWilayah($param)
    {
        switch ($param) {
            case 'kecamatan':
                $data = [
                    'kecamatan' => Kecamatan::all()
                ];
                return Inertia::render('Wilayah/Kecamatan', $data);
            case 'kelurahan':
                $data = [
                    'kelurahan' => Kelurahan::join('kecamatans', 'kecamatans.id', '=', 'kelurahans.kecamatan_id')->select('kecamatans.nama as kec_nama', 'kelurahans.*')->get()
                ];
                return Inertia::render('Wilayah/Kelurahan', $data);
            case 'tps':
                $data = [
                    'tps' => Tps::join('kelurahans', 'kelurahans.id', '=', 'tps.id_kelurahan')->join('kecamatans', 'kecamatans.id', '=', 'kelurahans.kecamatan_id')->select('kelurahans.nama as kel_nama', 'kecamatans.nama as kec_nama', 'tps.*')->get(),
                    'kecamatan' => Kecamatan::all(),
                    'kelurahan' => Kelurahan::all()
                ];
                return Inertia::render('Wilayah/Tps', $data);

            default:
                # code...
                break;
        }
    }

    public function detailWilayah($param, $id)
    {
        $dset = [];
        $v_name = [];
        switch ($param) {
            case "kecamatan":
                $kelurhan = Kelurahan::where('kecamatan_id', $id)->get();
                $kl = [];
                $tl = [];
                $sub_name = [];
                foreach ($kelurhan as $k) {
                    $kl[] = $k->id;
                }
                $tps = Tps::whereIn('id_kelurahan', $kl)->get();
                foreach ($tps as $t) {
                    $tl[] = $t->id;
                }
                $suara = collect(Partai::join('suaras', 'suaras.id_partai', '=', 'partais.id')->whereIn('suaras.id_tps', $tl)->get());
                $dataByCalon = collect(Suara::whereIn('suaras.id_tps', $tl)->join('calons', 'suaras.id_caleg', '=', 'calons.id')->where('calons.tipe', 'dprri')->get());
                $datasets = collect(Suara::join('calons', 'suaras.id_caleg', '=', 'calons.id')->join('tps', 'suaras.id_tps', '=', 'tps.id')->where('calons.tipe', 'dprri')->get()->toArray());

                foreach ($datasets->groupBy('nama_calon') as $key => $value) {
                    $sub_name[] = $key;
                    foreach ($value->groupBy('nama') as $ket => $v) {
                        $r[] = $v->sum('suara');
                        $lab[] = $ket;
                    }
                    $b = collect($r)->split(count($sub_name))->toArray();
                }

                for ($i = 0; $i < count($sub_name); $i++) {
                    $dset[] = [$sub_name[$i], $b[$i]];
                }
                foreach ($datasets->groupBy('nama') as $key => $value) {
                    $v_name[] = $key;
                }

                $partai = [
                    'data' => $this->generateData($suara, 'nama_partai')[0],
                    'label' => $this->generateData($suara, 'nama_partai')[1],
                    'backgorund_color' => '#CFF5E7'
                ];
                $calon =  [
                    'data' => $this->generateSingleData($dataByCalon, 'nama_calon'),
                    'label' => ['Data Suara Caleg Masuk'],
                    'backgorund_color' => '#CFF5E7'
                ];
                $per_tps = [
                    'data' => $dset,
                    'label' => $v_name,
                    'backgorund_color' => '#CFF5E7'
                ];

                $suara_presiden = collect(SuaraPresiden::whereIn('id_tps', $tl)->get());
                $nama_calon = [];
                $suara_pres = [];

                foreach ($suara_presiden->groupBy('id_calon') as $key => $suara) {
                    $calpres = CalonPresiden::where('id', $key)->select('nama')->get();
                    $nama_calon[] = $calpres[0]->nama;
                    $suara_pres[] = $suara->sum('suara');
                }

                $data = [
                    'param' => $param,
                    'kecamatan' => Kecamatan::find($id),
                    'jumlah_kelurahan' => $kelurhan,
                    'jumlah_tps' => $tps,
                    'chart_partai' => $partai,
                    'chart_calon' => $calon,
                    'chart_tps' => $per_tps,
                    'chart_presiden' => [$nama_calon, $suara_pres]

                ];
                return Inertia::render('Wilayah/Detail', $data);
            case 'kelurahan':
                $kelurhan = Kelurahan::where('id', $id)->get();
                $kl = [];
                $tl = [];
                $sub_name = [];
                foreach ($kelurhan as $k) {
                    $kl[] = $k->id;
                }
                $tps = Tps::whereIn('id_kelurahan', $kl)->get();
                foreach ($tps as $t) {
                    $tl[] = $t->id;
                }

                $suara = collect(Partai::join('suaras', 'suaras.id_partai', '=', 'partais.id')->whereIn('suaras.id_tps', $tl)->get());
                $dataByCalon = collect(Suara::whereIn('suaras.id_tps', $tl)->join('calons', 'suaras.id_caleg', '=', 'calons.id')->where('calons.tipe', 'dprri')->get());
                $datasets = collect(Suara::join('calons', 'suaras.id_caleg', '=', 'calons.id')->join('tps', 'suaras.id_tps', '=', 'tps.id')->where('calons.tipe', 'dprri')->get()->toArray());

                foreach ($datasets->groupBy('nama_calon') as $key => $value) {
                    $sub_name[] = $key;
                    foreach ($value->groupBy('nama') as $ket => $v) {
                        $r[] = $v->sum('suara');
                        $lab[] = $ket;
                    }
                    $b = collect($r)->split(count($sub_name))->toArray();
                }

                for ($i = 0; $i < count($sub_name); $i++) {
                    $dset[] = [$sub_name[$i], $b[$i]];
                }
                foreach ($datasets->groupBy('nama') as $key => $value) {
                    $v_name[] = $key;
                }

                $partai = [
                    'data' => $this->generateData($suara, 'nama_partai')[0],
                    'label' => $this->generateData($suara, 'nama_partai')[1],
                    'backgorund_color' => '#CFF5E7'
                ];
                $calon =  [
                    'data' => $this->generateSingleData($dataByCalon, 'nama_calon'),
                    'label' => ['Data Suara Caleg Masuk'],
                    'backgorund_color' => '#CFF5E7'
                ];
                $per_tps = [
                    'data' => $dset,
                    'label' => $v_name,
                    'backgorund_color' => '#CFF5E7'
                ];

                $suara_presiden = collect(SuaraPresiden::whereIn('id_tps', $tl)->get());
                $nama_calon = [];
                $suara_pres = [];

                foreach ($suara_presiden->groupBy('id_calon') as $key => $suara) {
                    $calpres = CalonPresiden::where('id', $key)->select('nama')->get();
                    $nama_calon[] = $calpres[0]->nama;
                    $suara_pres[] = $suara->sum('suara');
                }

                $data = [
                    'param' => $param,
                    'kecamatan' => Kecamatan::find($id),
                    'jumlah_kelurahan' => $kelurhan,
                    'jumlah_tps' => $tps,
                    'chart_partai' => $partai,
                    'chart_calon' => $calon,
                    'chart_tps' => $per_tps,
                    'chart_presiden' => [$nama_calon, $suara_pres]

                ];
                return Inertia::render('Wilayah/Detail', $data);

            case 'tps':

                $tps = Tps::where('id', $id)->get();
                $kelurhan = Kelurahan::where('id', $tps[0]->id_kelurahan)->get();

                $kl = [];
                $tl = [];
                $sub_name = [];
                foreach ($kelurhan as $k) {
                    $kl[] = $k->id;
                }
                foreach ($tps as $t) {
                    $tl[] = $t->id;
                }

                $suara = collect(Partai::join('suaras', 'suaras.id_partai', '=', 'partais.id')->whereIn('suaras.id_tps', $tl)->get());
                $dataByCalon = collect(Suara::whereIn('suaras.id_tps', $tl)->join('calons', 'suaras.id_caleg', '=', 'calons.id')->where('calons.tipe', 'dprri')->get());
                $datasets = collect(Suara::join('calons', 'suaras.id_caleg', '=', 'calons.id')->join('tps', 'suaras.id_tps', '=', 'tps.id')->where('calons.tipe', 'dprri')->get()->toArray());

                foreach ($datasets->groupBy('nama_calon') as $key => $value) {
                    $sub_name[] = $key;
                    foreach ($value->groupBy('nama') as $ket => $v) {
                        $r[] = $v->sum('suara');
                        $lab[] = $ket;
                    }
                    $b = collect($r)->split(count($sub_name))->toArray();
                }

                for ($i = 0; $i < count($sub_name); $i++) {
                    $dset[] = [$sub_name[$i], $b[$i]];
                }
                foreach ($datasets->groupBy('nama') as $key => $value) {
                    $v_name[] = $key;
                }

                $partai = [
                    'data' => $this->generateData($suara, 'nama_partai')[0],
                    'label' => $this->generateData($suara, 'nama_partai')[1],
                    'backgorund_color' => '#CFF5E7'
                ];
                $calon =  [
                    'data' => $this->generateSingleData($dataByCalon, 'nama_calon'),
                    'label' => ['Data Suara Caleg Masuk'],
                    'backgorund_color' => '#CFF5E7'
                ];
                $per_tps = [
                    'data' => $dset,
                    'label' => $v_name,
                    'backgorund_color' => '#CFF5E7'
                ];

                $suara_presiden = collect(SuaraPresiden::where('id_tps', $id)->get());
                $nama_calon = [];
                $suara_pres = [];

                foreach ($suara_presiden->groupBy('id_calon') as $key => $suara) {
                    $calpres = CalonPresiden::where('id', $key)->select('nama')->get();
                    $nama_calon[] = $calpres[0]->nama;
                    $suara_pres[] = $suara->sum('suara');
                }


                $data = [
                    'param' => $param,
                    'jumlah_kelurahan' => $kelurhan,
                    'jumlah_tps' => $tps,
                    'chart_partai' => $partai,
                    'chart_calon' => $calon,
                    'kecamatan' => Kecamatan::all(),
                    'chart_tps' => $per_tps,
                    'chart_presiden' => [$nama_calon, $suara_pres]

                ];

                return Inertia::render('Wilayah/Detail', $data);
            default:
                break;
        }
    }

    public function changecolor(Request $request, $param)
    {
        switch ($param) {
            case 'partai':
                $p = Partai::find($request->id);
                $p->warna = $request->color;
                $p->save();
                break;
            case 'presiden':
                $p = CalonPresiden::find($request->id);
                $p->warna = $request->color;
                $p->save();
                break;
        }
    }

    public function users()
    {
        $user = User::where('giveaccess', 1)->get();
        $data = [
            'page' => 'User',
            'pengguna' => $user
        ];
        return Inertia::render('User', $data);
    }

    public function registeredUser()
    {
        $user = User::where('giveaccess', 0)->get();
        $data = [
            'page' => 'UserRegister',
            'pengguna' => $user
        ];
        return Inertia::render('UserRegistered', $data);
    }

    public function detaildata($param, $id)
    {
        if ($param == 'saksi') {
            $arr = [
                'page' => 'DataSaksi',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(2, `tim`) > 0')->where('kelurahan_id', $id)->orderBy("created_at", "DESC")->get()
            ];
        } elseif ($param == 'korwe') {
            $arr = [
                'page' => 'Korwe',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(3, `tim`) > 0')->where('kelurahan_id', $id)->orderBy("created_at", "DESC")->get()
            ];
        } elseif ($param == 'korsak') {
            $arr = [
                'page' => 'Korsak',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(1, `tim`) > 0')->where('kelurahan_id', $id)->orderBy("created_at", "DESC")->get()
            ];
        } elseif ($param == 'korte') {
            $arr = [
                'page' => 'Korte',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(4, `tim`) > 0')->where('kelurahan_id', $id)->orderBy("created_at", "DESC")->get()
            ];
        } elseif ($param == 'kortps') {
            $arr = [
                'page' => 'Kortps',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(5, `tim`) > 0')->where('kelurahan_id', $id)->orderBy("created_at", "DESC")->get()
            ];
        } elseif ($param == 'pemilih') {
            $arr = [
                'page' => 'Pemilih',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(6, `tim`) > 0')->where('kelurahan_id', $id)->orderBy("created_at", "DESC")->get()
            ];
        } elseif ($param == 'tokoh') {
            $arr = [
                'page' => 'Tokoh',
                'data_tim_pemenangan' => MasterTimPemenangan::whereRaw('LOCATE(7, `tim`) > 0')->where('kelurahan_id', $id)->orderBy("created_at", "DESC")->get()
            ];
        }

        $arr['kecamatan'] = Kecamatan::all();
        $arr['kelurahan'] = Kelurahan::all();

        return Inertia::render('DetailData', $arr);
    }

    public function access($id)
    {
        $user = User::where('id', $id)->first();
        $user->giveaccess = 1;
        $user->save();
    }

    public function EditData(Request $request, $id)
    {
        $nama_file = '';

        $master = MasterTimPemenangan::where('id', $id)->first();
        $master->nama = $request->nama;
        $master->alamat = 'RT/RW ' . $request->rt . '/' . $request->rw . ', ' . strtolower($this->getKelName($request->kelurahan)) . ', ' . strtolower($this->getKecName($request->kecamatan)) . ', Jakarta Utara';
        $master->kecamatan_id = $request->kecamatan;
        $master->kelurahan_id = $request->kelurahan;
        $master->rt = $request->rt;
        $master->rw = $request->rw;
        $master->no_handphone = $request->no_handphone;
        $master->referensi = $request->referensi;
        $master->no_tps = $request->no_tps;
        $master->telegram_id = $request->telegram_id;
        if ($request->file('file')) {
            $image = $request->file('file');
            $tujuan_upload = 'data_file';
            $nama_file = rand() . '.' . $image->getClientOriginalExtension();
            $image->move($tujuan_upload, $nama_file);
            $master->photo = $nama_file;
        } else {
            $master->photo = $request->file;
        }

        $master->save();
    }
}
