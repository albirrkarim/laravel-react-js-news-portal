<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;


use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
  
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function logout() {
        Auth::logout();
        return redirect('/');
    }

    public function clear(){
        Artisan::call('cache:clear');
        Artisan::call('view:clear');
        Artisan::call('config:clear');
        Artisan::call('route:clear');
        Artisan::call('event:clear');
        Session::flush();
    }

    public function index()
    {
        return json_encode(Auth::user());
    }

  
    public function store(Request $request)
    {
        try {
            User::create([
                "name"          => $request["name"],
                "email"         => $request["email"],
                "password"      => Hash::make($request["password"]),
            ]);
            
            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }

   
    public function show($id)
    {
        try {

            return json_encode(User::where("id",$id)->first());
        } catch (QueryException $ex) {
            return "false";
        }
    }
 
    public function update(Request $request,$id)
    {
        try {

            $arr  =[
                "name"          => $request["name"],
                "email"         => $request["email"],
            ];

            if($request["password"]!="") {
                $arr["password"] = Hash::make($request["password"]);
            }

            User::where("id",$id)->update($arr);

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }


    public function destroy($id)
    {
        try {
            User::where("id",$id)->delete();

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }
}
