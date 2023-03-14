<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function uploadFromUrl(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'url' => 'required|url'
            ]);
            $url = $validatedData['url'];
            $extension = pathinfo(parse_url($url)['path'], PATHINFO_EXTENSION);

            $client = new Client();
            $response = $client->get($url);
            $contentType = $response->getHeader('content-type')[0];
            $fileName = time() . '.' . $extension;

            $path = public_path('data_file/' . $fileName);
            file_put_contents($path, $response->getBody());

            return response()->json([
                'status' => 'success',
                'file_name' => $fileName
            ], 201);
        } catch (RequestException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengunduh file dari URL yang diberikan'
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat mengupload foto'
            ], 500);
        }
    }

    public function uploadBase64(Request $request)
    {
        try {
            $path = public_path('data_file/' . 'base.txt');
            file_put_contents($path, $request->image);
            $file = file_get_contents(public_path('data_file/' . 'base.txt'));
            $image =  base64_decode($file);
            $fileName = time() . '.png';
            file_put_contents(public_path('data_file/' . $fileName), $image);

            return response()->json([
                'status' => 'success',
                'file_name' => $fileName
            ], 200);
        } catch (RequestException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengunduh file dari URL yang diberikan'
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan saat mengupload foto'
            ], 500);
        }
    }
}
