<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

use App\Models\News;
use App\Models\Contents;

class HomeController extends Controller
{   

    public function search($text = "")
    {
        if (strlen($text) < 3) {
            return json_encode([]);
        }

        $news = News::where('name', 'like', '%' . $text . '%')
                    ->orWhere('text', 'like', '%' . $text . '%')
                    ->select([
                        'news_id',
                        'name',
                        'text',
                    ])
                    ->get();

        $contents = Contents::where('name', 'like', '%' . $text . '%')
                    ->orWhere('text', 'like', '%' . $text . '%')
                    ->select([
                        'contents_id',
                        'name',
                        'text',
                    ])
                    ->get();

        return json_encode([
            'news' => $news,
            'contents' => $contents,
        ]);
    }

    public function welcome()
    {
        return view('welcome');
    }

    public function index($any = null, $param = null)
    {
        return view('layouts.app');
    }

    public function clear()
    {
        Artisan::call('cache:clear');
        Artisan::call('view:clear');
        Artisan::call('config:clear');
        Artisan::call('route:clear');
        Artisan::call('event:clear');
        return "true";
    }

    public function cache()
    {
        Artisan::call('view:cache');
        Artisan::call('config:cache');
        Artisan::call('route:cache');
        Artisan::call('event:cache');
        return "true";
    }
}
