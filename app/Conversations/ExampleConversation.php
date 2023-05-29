<?php
 
namespace App\Conversations;
 
use Illuminate\Foundation\Inspiring;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Outgoing\Question;
use BotMan\BotMan\Messages\Outgoing\Actions\Button;
use BotMan\BotMan\Messages\Conversations\Conversation;
use BotMan\BotMan\Messages\Outgoing\Question as BotManQuestion;
use BotMan\BotMan\Messages\Incoming\Answer as BotManAnswer;
 
 
class ExampleConversation extends Conversation
{
    protected $kitab = 'muslim';
    /**
     * First question
     */
    public function askHadits()
    {
        $question = Question::create("Silahkan pilih menu.")
            ->fallback('Unable to ask question')
            ->callbackId('ask_reason')
            ->addButtons([
                Button::create('Tabulasi Suara')->value('tabulasi_data'),
                Button::create('Input Relawan')->value('input_relawan'),
                Button::create('Survey')->value('survey'),
            ]);
 
        return $this->ask($question, function (Answer $answer) {
            if ($answer->isInteractiveMessageReply()) {
                switch ($answer->getValue()) {
                    case 'tabulasi_suara':
                        $this->kitab = 'dawud';
                        $this->jawabanNya('HR. Abu Daud');
                        break;
                    case 'survey':
                        $this->kitab = 'bukhari';
                        $this->jawabanNya('HR. Bukhari');
                        break;
                    case 'input_relawan':
                        $this->kitab = 'majah';
                        $this->jawabanNya('HR. Ibnu Majah');
                        break;
                    default:
                       break;
                }
 
            }
        });
    }
 
    public function jawabanNya($tokoh)
    {
        $this->ask('Kamu memilih kitab dari '.$tokoh.'. Silahkan masukkan nomor hadits yang ingin dicari.', function (Answer $answer) {
            $no = $answer->getText();
            // echo $no;
            $hasil=$this->getData($this->kitab, $no);
            $jawaban = sprintf("Hadits menjelaskan tentang: ".$hasil[3].". \r\t\n\n ".$hasil[0]."\r\t\n\n ".$hasil[1]);
            // $this->say('Hadits menjelaskan tentang: '.$hasil[3]);
            // $this->say($hasil[0]);
            $this->say($jawaban);
            if ($hasil[2]==true) {
                $this->say('Silahkan laporkan permasalahan ini dengan menu /lapor .');
            }
        });
    }
 
    public function getData($kitab, $no)
    {
        try {
            $str='https://scrape-fastapi.herokuapp.com/hadits/?tokoh='.$kitab.'&no='.$no;
            // $str='https://hadits-api-zhirrr.vercel.app/books/'.$kitab.'/'.$no;
            $dt = json_decode(file_get_contents($str));
            return [$dt->data->contents->arab, $dt->data->contents->id, false, $dt->data->contents->judul];
        } catch (\Throwable $th) {
            return ["Something went wrong 😯️","Sepertinya ada masalah.🧐️", true];
        }
 
    }
    /**
     * Start the conversation
     */
    public function run()
    {
        $this->askHadits();
        // $this->cariLagi();
    }
}
 