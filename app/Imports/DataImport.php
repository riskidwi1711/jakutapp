<?php

namespace App\Imports;

use App\Models\Data;
use App\Models\Kecamatan;
use App\Models\Kelurahan;
use App\Models\MasterTimPemenangan;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class DataImport implements ToModel, WithStartRow, WithValidation, SkipsEmptyRows
{
    /**
     * @return int
     */
    public function startRow(): int
    {
        return 2;
    }
    public function model(array $row)
    {
        return new MasterTimPemenangan([
            'nama' => $row[0],
            'alamat' => $row[1],
            'no_handphone' => $row[2],
            'no_tps' => $row[3],
            'photo' => null,
            'telegram_photo' => null,
            'tim' => $row[4],
            'telegram_id' => null,
            'user_created' => 'import file',
            'jabatan' => $row[5],
            'kecamatan_id' => $this->getKecId($row[6]),
            'kelurahan_id' => $this->getKelId($row[7]),
            'rt' => $row[8],
            'rw' => $row[9],
            'referensi' => 'suhud alynudin'
            // ...
        ]);
    }

    public function getKecId($slug)
    {
        $kec = Kecamatan::where('slug', $slug)->select('id')->first();

        return $kec->id;
    }

    public function getKelId($slug)
    {
        $kec = Kelurahan::where('slug', $slug)->select('id')->first();

        return $kec->id;
    }

    public function cekKecSlug($slug)
    {
        $kec = Kecamatan::where('slug', $slug)->first();
        if ($kec === null) {
            return false;
        } else {
            return true;
        }
    }

    public function cekKelSlug($slug)
    {
        $kec = Kelurahan::where('slug', $slug)->first();
        if ($kec === null) {
            return false;
        } else {
            return true;
        }
    }


    public function rules(): array
    {
        return [
            '6' => function ($attribute, $value, $onFailure) {
                if (!$this->cekKecSlug($value)) {
                    $onFailure('Kecamatan tidak terdaftar');
                }
            },
            '7' => function ($attribute, $value, $onFailure) {
                if (!$this->cekKelSlug($value)) {
                    $onFailure('Kelurahan tidak terdaftar');
                }
            }


        ];
    }
}
