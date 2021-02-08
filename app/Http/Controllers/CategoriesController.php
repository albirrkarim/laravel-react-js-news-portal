<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class CategoriesController extends Controller
{
    public function info($category_id)
    {
        try {
            $data = Categories::where("category_id", $category_id)
                ->select([
                    "category_id",
                    "name",
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
            Categories::orderBy("created_at", "DESC")->paginate(10)
        );
    }

    public function all(){
        return json_encode(Categories::get());
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
            ];

            Categories::create($arr);

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }

    public function show($category_id)
    {
        return json_encode(Categories::where("category_id", $category_id)->get());
    }


    public function edit()
    {
        //
    }


    public function update(Request $request, $category_id)
    {
        try {

            $arr = [
                "name" => $request['name'],
            ];

            Categories::where("category_id", $category_id)->update($arr);

            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }

    public function destroy($category_id)
    {
        try {
            Categories::where('category_id', $category_id)->delete();
            return "true";
        } catch (QueryException $ex) {
            return "false";
        }
    }
}
