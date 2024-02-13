namespace App\Services;

class WebCrawler
{
    public function res($message){
        return $message;
    }
}

$webCrawler = new WebCrawler();
$webCrawler->res("Hello world!");