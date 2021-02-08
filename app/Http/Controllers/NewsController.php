<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use InterventionImage;

class NewsController extends Controller
{
    function uploadImage($originPath, $name, $extension='jpg')
    {
        $this->deleteFile('app/public/images/' . $name);

        $width = InterventionImage::make($originPath)->width();
        $fixed_width = 1920;

        $imgTamp = InterventionImage::make($originPath)->encode($extension, 90);

        if ($width > $fixed_width) {
            $imgTamp->resize($fixed_width, null, function ($constraint) {
                $constraint->aspectRatio();
            });
        }

        $imgTamp->save('storage/images/' . $name);
    }

    function uploadThumbnail($originPath, $name, $extension='jpg')
    {
        $this->deleteFile('app/public/images_thumbnail/' . $name);

        $width = InterventionImage::make($originPath)->width();
        $fixed_width = 800;

        $imgTamp = InterventionImage::make($originPath)->encode($extension, 90);

        if ($width > $fixed_width) {
            $imgTamp->resize($fixed_width, null, function ($constraint) {
                $constraint->aspectRatio();
            });
        }

        $imgTamp->save('storage/images_thumbnail/' . $name);
    }


    function uploadImageHome($file_image){

        if($file_image!=null){
            
            $hash_name  = md5($file_image->getClientOriginalName() . time());
            $extension  = $file_image->extension();

            if ($extension != 'png') {
                $extension = 'jpg';
            }
            $name       = $hash_name . "." . $extension;

            $path = $file_image->getRealPath();

            $this->uploadThumbnail($path, $name, $extension);
            $this->uploadImage($path, $name, $extension);
           
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
            $this->deleteFile('app/public/images/' . $file_name);
            $this->deleteFile('app/public/images_thumbnail/' . $file_name);
        }        
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
            News::orderBy("created_at", "DESC")->get()
        );
    }

    public function create()
    {
        //
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

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }

    public function show($news_id)
    {
        return json_encode(News::where("news_id",$news_id)->first());
    }

 
    public function edit()
    {
        //
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

            return "true";
        } catch (QueryException $ex) {
            return "false";
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
