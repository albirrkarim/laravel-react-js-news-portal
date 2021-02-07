<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

use InterventionImage;
use Illuminate\Database\QueryException;

class SettingsController extends Controller
{

    function uploadImage($originPath,$name){
        $this->deleteFile('app/public/image/'.$name);
        InterventionImage::make($originPath)
                    ->encode('jpg', 90)
                    ->save('storage/image/'.$name);
    }

    function uploadThumbnail($originPath,$name){
        $this->deleteFile('app/public/thumbnail/'.$name);

        InterventionImage::make($originPath)
                    ->encode('jpg', 75)
                    ->resize(600,null, function ($constraint){$constraint->aspectRatio();})
                    ->save('storage/thumbnail/'.$name);
    }

    function uploadVideo($file){

        $hash_name  = md5($file->getClientOriginalName() . time());
        $name       = $hash_name . "." . $file->getClientOriginalExtension();

        $this->deleteFile('app/public/video/'.$name);

        $file->move("storage/video",$name);

        return $name;
    }

    function uploadLogo($file_img,$name){
        $this->deleteFile('app/public/logo/'.$name);

        $file_img->move("storage/logo",$name);
    }


    function processImage($file){
        $hash_name  = md5($file->getClientOriginalName() . time());
        $name       = $hash_name . ".".$file->getClientOriginalExtension();

        $this->uploadLogo($file,$name);

        return $name;
    }


    function processDeleteFile($old_data){
        $old_name = $old_data['file'];

        if($old_name!=""){
            if($old_data['role']=='image'){
                $this->deleteFile('app/public/logo/' . $old_name);
            }else{
                $this->deleteFile('app/public/video/' . $old_name);
            }
        }
    }

    function deleteFile($location)
    {
        if (file_exists(storage_path($location))) {
            unlink(storage_path($location));
        }
    }


    public function getSetting($key){
        return Setting::
                where("key",$key)
                ->select([
                    "value",
                    "role",
                    "file",
                ])
                ->first();
    }

    public function all()
    {
        $arr = [];
        $data= Setting::select([
                            "key",
                            "value",
                            "role",
                            "file",
                        ])
                        ->get();

        foreach ($data as $item) {
            $arr[$item['key']] = $item;
        }

        return json_encode($arr);
    }

    public function index()
    {
        return json_encode(Setting::paginate(10));
    }

    public function store(Request $request)
    {

        try {

            $role=$request["role"];

            $arr=[
                "key"     => $request["key"],
                "value"   => $request["value"],
                "role"    => $role,
            ];

            $file   = $request->file('file');
            
            if($file!=null){
                if($role=="image"){
                    $arr["file"] = $this->processImage($file);
                }else if ($role == 'video'){
                    $arr["file"] = $this->uploadVideo($file);
                }
            }


            Setting::create($arr);

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }

    public function show($id)
    {
        try {
            $data = Setting::where("id", $id)->first();

            if($data!=null){
                return json_encode([
                    "status" => true,
                    "data" => $data,
                ]);
            }

            return json_encode([
                "status" => false,
            ]);
        } catch (QueryException $ex) {
            return "false";
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $role=$request["role"];

            $arr=[
                "key"     => $request["key"],
                "value"   => $request["value"],
                "role"    => $role,
            ];

            $file   = $request->file('file');

            if($file!=null){
                $data =  Setting::where('id', $id)->first();

                $this->processDeleteFile($data);

                if($role=="image"){    
                    $arr["file"] = $this->processImage($file);
                }
                else if($role=="video"){            
                    $arr["file"] =  $this->uploadVideo($file);
                }
            }

            Setting::where("id", $id)->update($arr);

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }

    public function destroy($id)
    {
        try {
            $data =  Setting::where('id', $id)->first();

            $this->processDeleteFile($data);
           
            Setting::where('id', $id)->delete();

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }
}
