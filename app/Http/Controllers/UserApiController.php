<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Post;

class UserApiController extends Controller
{
    public function store(){
        request()->validate([
            "fullname" =>"required",
            "email" => "required",
            "password" =>"required"
        ]);
        try{
            $result = User::create([
                "id"=>request("id"),
                "fullname" => request("fullname"),
                "email" => request("email"),
                "password" => request("password"),
                "refresh_token" => request("refresh_token")
            ]);
        }catch(Exception $error){
            return $error.getMessage();
        }
        return $result;
    }
}
