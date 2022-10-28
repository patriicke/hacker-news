<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Comment;

use App\Models\Post;

use Illuminate\Support\Facades\Http;

class CommentsController extends Controller
{
    public function create(){
        $allPosts = Post::all();
        $postsLen = count($allPosts);
        for($i = 0; $i < $postsLen; $i++){
            if(!isset($allPosts[$i]["kids"])) continue;
            $comments = \json_decode($allPosts[$i]["kids"]);
            $commentsLen = count($comments);
            for ($j=0; $j < $commentsLen; $j++){
               $exist = Comment::where("id",$comments[$j])->first();
               if($exist) continue;
               $request = Http::get("https://hacker-news.firebaseio.com/v0/item/{$comments[$j]}.json?print=pretty");
               if(isset($request["deleted"])) continue;
               if(isset($request["dead"])) continue;
               Comment::create([
                "id" => $request["id"],
                "by" => isset($request["by"])?$request["by"]:null,
                "kids" => isset($request["kids"])? \json_encode($request["kids"]):null,
                "parent" => isset($request["parent"])?$request["parent"]:null,
                "text" => isset($request["text"])?$request["text"]:null,
                "time" => isset($request["time"])?$request["time"]:null,
                "type" => isset($request["type"])?$request["type"]:null,
                "title" => isset($request["title"])?$request["type"]:null
               ]);
            }
        }
        return Comment::all();
    }

    public function getComments(){
        return Comment::all();
    }
}
