<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class UserLoginController extends Controller
{
    public function login(){
        \request()->validate([
            "email" => "required",
            "password" => "required",
        ]);
        $user = User::where("email", \request("email"))->first();
        if(!password_verify(\request("password"),$user["password"])) return "Invalid email or password." ;
        return $user;
    }
}
