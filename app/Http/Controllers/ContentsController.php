<?php

namespace App\Http\Controllers;

use App\Models\Contents;
use Illuminate\Http\Request;
use InterventionImage;
use Illuminate\Database\QueryException;

class ContentsController extends Controller
{
    function uploadImage($originPath, $name, $extension = 'jpg')
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

    function uploadThumbnail($originPath, $name, $extension = 'jpg')
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


    function uploadFile($file)
    {

        if ($file != null) {

            $hash_name  = md5($file->getClientOriginalName() . time());
            $extension  = $file->extension();
            $name       = $hash_name . "." . $extension;

            $arrVideo = ["mp4", "mkv", "m4v", "mov"];
            $arrAudio = ["mp3", "m4a", "flac", "wav"];
            $arrImage = ["png", "jpg", "jpeg","webp"];

            $type = "img";

            if (in_array($extension, $arrImage)) {
                if ($extension != 'png') {
                    $extension = 'jpg';
                }
                $name = $hash_name . "." . $extension;

                $path = $file->getRealPath();

                $this->uploadThumbnail($path, $name, $extension);
                $this->uploadImage($path, $name, $extension);


            } else if (in_array($extension, $arrVideo)) {
                $type = "video";
            } else if (in_array($extension, $arrAudio)) {
                $type = "audio";
            } else {
                $type = "document";
            }

            if ($type != "img") {
                $path = "storage/images";
                $file->move($path, $name);
            }

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

    function deleteFileComplete($contents_id)
    {
        $file = Contents::where("contents_id", $contents_id)->first();
        $file_name = $file['file'];

        if ($file_name != null && $file_name != "") {
            $this->deleteFile('app/public/images/' . $file_name);
            $this->deleteFile('app/public/images_thumbnail/' . $file_name);
        }
    }

    public function search($text = "")
    {
        if (strlen($text) < 3) {
            return json_encode([]);
        }
        $contents = Contents::where('name', 'like', '%' . $text . '%')
                    ->orWhere('text', 'like', '%' . $text . '%')
                    ->get();

        return json_encode($contents);
    }

    public function info($contents_id)
    {
        try {
            $data = Contents::where("contents_id", $contents_id)->first();

            if ($data != null) {
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
            Contents::orderBy("created_at", "DESC")->paginate(10)
        );

    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        try {

            $arr = [
                "name" => $request['name'],
                "text" => $request['text'],
                "category_id" => $request['category_id'],
            ];

            $file = $request->file("file");
            $arr['file'] = $this->uploadFile($file);

            Contents::create($arr);

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }


    public function show($category_id)
    {
        return json_encode(Contents::where("category_id", $category_id)->get());
    }


    public function edit()
    {
        //
    }

    public function update(Request $request, $contents_id)
    {
        try {

            $arr = [
                "name" => $request['name'],
                "text" => $request['text'],
                "category_id" => $request['category_id'],
            ];

            $file = $request->file("file");

            if ($file != null) {
                $this->deleteFileComplete($contents_id);
                $arr['file'] = $this->uploadFile($file);
            }

            Contents::where("contents_id", $contents_id)->update($arr);

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }

    public function destroy($contents_id)
    {
        try {
            $this->deleteFileComplete($contents_id);
            Contents::where('contents_id', $contents_id)->delete();

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }
}
