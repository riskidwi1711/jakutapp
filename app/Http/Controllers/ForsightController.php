<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\QuestionProp;
use App\Models\Survey;
use App\Models\SurveyData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ForsightController extends Controller
{
    public function index()
    {


        $data = [
            'page' => 'Forsight/Home',
            'surveys' => Survey::all()
        ];
        return Inertia::render('Forsight/Home', $data);
    }

    public function detail($id)
    {
        $questions = Question::join('surveys', 'surveys.id', '=', 'questions.survey_id')->where('surveys.id', $id)->select('questions.*', 'surveys.id as survey_id')->get();
        $qprops = QuestionProp::all();
        $survey_data = collect(SurveyData::where('survey_id', $id)->get())->groupBy('q_id');
        $k=[];
        foreach ($survey_data as $key => $value) {
            foreach (collect($value)->groupBy('value') as $r => $ss) {
                $k[$key][] = [
                    $r,
                    count($ss)
                ];
            }
        }



        $data = [
            'page' => 'Forsight/Detail',
            'surveys' => Survey::find($id),
            'id' => $id,
            'question' => $questions,
            'propsQ' => $qprops,
            'chart' => $k
        ];
        return Inertia::render('Forsight/Detail', $data);
    }
    public function deleteq($id)
    {
        $d = Question::find($id);
        $d->delete();

        return Redirect::back();
    }

    public function deletes($id)
    {
        $d = Survey::find($id);
        $d->delete();

        return Redirect::back();
    }

    public function storeSurvey(Request $request)
    {
        $nama_survey = $request->nama_survey;
        $deskripsi = $request->deskripsi;
        $user = $request->user_created;
        Survey::create([
            'nama_survey' => $nama_survey,
            'description' => $deskripsi,
            'slug' => str_replace(' ', '_', $nama_survey),
            'user_created' => $user
        ]);
        return Redirect::back();
    }

    public function storeQuestion(Request $request, $id)
    {
        $type = $request->type;
        $questions = $request->data['pertanyaan'];
        $create = Question::create([
            'survey_id' => $id,
            'pertanyaan' => $questions,
            'type' => $type
        ]);

        if ($create) {
            if ($type == 'multi_choice') {
                foreach ($request->choice as $choice) {
                    QuestionProp::create([
                        'question_id' => $create->id,
                        'type' => $type,
                        'value' => $choice
                    ]);
                }
            } else {
                QuestionProp::create([
                    'question_id' => $create->id,
                    'type' => $type,
                    'value' => '-'
                ]);
            }
        }
        return Redirect::back();
    }
}
