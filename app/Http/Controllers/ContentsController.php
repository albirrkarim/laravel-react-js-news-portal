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


    function uploadImageHome($file_image)
    {

        if ($file_image != null) {
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

    function deleteFileComplete($contents_id)
    {
        $file = Contents::where("contents_id", $contents_id)->first();
        $file_name = $file['file'];

        if ($file_name != null && $file_name != "") {
            $this->deleteFile('app/public/images/' . $file_name);
            $this->deleteFile('app/public/images_thumbnail/' . $file_name);
        }
    }

    public function info($contents_id)
    {
        try {
            $data = Contents::where("contents_id", $contents_id)
                ->select([
                    "contents_id",
                    "name",
                    "text",
                    "file",
                    "category_id",
                ])
                ->first();

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
            Contents::orderBy("name", "ASC")->paginate(10)
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

            $image = $request->file("file");
            $arr['file'] = $this->uploadImageHome($image);

            Contents::create($arr);

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }


    public function show($contents_id)
    {
        return json_encode(Contents::where("contents_id", $contents_id)->get());
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

            $image = $request->file("file");

            if ($image != null) {
                $this->deleteFileComplete($contents_id);
                $arr['file'] = $this->uploadImageHome($image);
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
