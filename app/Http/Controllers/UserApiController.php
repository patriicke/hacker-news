<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class UserApiController extends Controller
{
    public function users (){
        return User::all();
    }
    public function create (){
            request()->validate([
                "password" => "required",
                "cpassword" => "required",
                "email" => "required",
                "fullname" => "required",
            ]);
            if(\request("password")  != \request("cpassword")) return "Password's don't match";
            $uuid = \uniqid();
            return User::create([
               "uuid" => $uuid,
               "password" => \request("password"),
               "email" => \request("email"),
               "fullname" => \request("fullname"),
            ]);
    }

    public function update ($user){
        request()->validate([
            "password" => "required",
            "cpassword" => "required",
            "email" => "required",
            "fullname" => "required",
        ]);
        if(\request("password")  != \request("cpassword")) return "Password's don't match";
        $uuid = \uniqid();
        return User::create([
           "uuid" => $uuid,
           "password" => \request("password"),
           "email" => \request("email"),
        "fullname" => \request("fullname"),
    ]);
}


}
