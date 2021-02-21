<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
// use Illuminate\Database\QueryException;
use InterventionImage;
use Illuminate\Support\Facades\URL;

class NewsController extends Controller
{
    public function ckupload(Request $request){
        $file_img=$request->file('upload');
        if ($file_img) {
        
            $name_new=$this->uploadImageHome($file_img);

            return json_encode([
                "uploaded" => true,
                "url" => URL::to('/')."/storage/files/".$name_new,
            ]);
        }

        return json_encode([
            "uploaded" => true,
            "error" =>  [
                "message" => "could not upload this image"
            ]
        ]);
    }


    function uploadImageHome($file){

        if($file!=null){
            
            $hash_name  = md5($file->getClientOriginalName() . time());
            $extension  = $file->extension();

            if ($extension != 'png') {
                $extension = 'jpg';
            }
            $name       = $hash_name . "." . $extension;

            // $path = $file->getRealPath();

            // $this->uploadThumbnail($path, $name, $extension);
            // $this->uploadImage($path, $name, $extension);

            $path = "storage/files";
            $file->move($path, $name);
           
            return $name;
        }

        return null;
    }

    function deleteFile($location)
    {
        if (file_exists(storage_path($location))) {
            unlink(storage_path($location));
        }
    }

    function deleteFileComplete($news_id)
    {
        $file = News::where("news_id", $news_id)->first();
        $file_name = $file['file'];

        if($file_name!=null&&$file_name!=""){
            $this->deleteFile('app/public/files/' . $file_name);
        
        }        
    }

    public function search($text = "")
    {
        if (strlen($text) < 3) {
            return json_encode([]);
        }
        $contents = News::where('name', 'like', '%' . $text . '%')
                    ->orWhere('text', 'like', '%' . $text . '%')
                    ->get();

        return json_encode($contents);
    }


    public function info($news_id)
    {
        try {
            $data=News::where("news_id",$news_id)->first();

            if($data!=null){
                return json_encode(
                    [
                        "status" => true,
                        "data" => $data,
                    ]
                );
            }

            return json_encode(
                [
                    "status" => false,
                ]
            );
        } catch (QueryException $ex) {
            return "false";
        }
    }
   
    public function index()
    {
        return json_encode(
            News::orderBy("created_at", "DESC")->paginate(10)
        );
    }

    public function all()
    {
        return json_encode(
            News::orderBy("created_at", "DESC")->limit(40)->get()
        );
    }

    public function create()
    {
        return view('layouts.createnews');
    }
    
    public function store(Request $request)
    {
        try{

            $arr = [
                "name" => $request['name'],
                "text" => $request['text'],
            ];

            $image = $request->file("file");
            $arr['file'] = $this->uploadImageHome($image);
            
            News::create($arr);

            return redirect()->back()->with('success','Berhasil menambah data');
        } catch (QueryException $ex) {
            return redirect()->back()->with('error','Gagal menambah data');
        }
    }

    public function show($news_id)
    {
        return json_encode(News::where("news_id",$news_id)->first());
    }

 
    public function edit($news_id)
    {
        $data= News::where("news_id",$news_id)->first();

        return view('layouts.news',compact(['data']));
    }


    public function update(Request $request, $news_id)
    {
        try{

            $arr = [
                "name" => $request['name'],
                "text" => $request['text'],
            ];

            $image = $request->file("file");
            if($image!=null){
                $this->deleteFileComplete($news_id);
                $arr['file'] = $this->uploadImageHome($image);
            }
            
            News::where("news_id",$news_id)->update($arr);

            return redirect()->back()->with('success','Berhasil mengedit data');
        } catch (QueryException $ex) {
            return redirect()->back()->with('error','Gagal mengedit data');
        }
    }

    public function destroy($news_id)
    {
        try {
            $this->deleteFileComplete($news_id);
            
            News::where('news_id', $news_id)->delete();

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }
}
