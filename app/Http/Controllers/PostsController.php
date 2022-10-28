<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Http;

use App\Models\Post;


class PostsController extends Controller
{
    public function create(){
        $allPosts = Post::all();
        $allPostsLen = count($allPosts);
        if($allPostsLen < 500){
            $base = Http::get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
            for($i= 0; $i < 500; $i++){
                    $exist = Post::where("id", $base[$i])->first();
                    if($exist) continue;
                    $request = Http::get("https://hacker-news.firebaseio.com/v0/item/{$base[$i]}.json?  print=pretty");
                    Post::create([
                    "id" => $request["id"],
                    "deleted"=> isset($request["deleted"]) ? $request["deleted"] : null,
                    "by" => isset($request["by"])? $request["by"]: null,
                    "type" => isset($request["type"])? $request["type"]: null,
                    "time" => isset($request["time"])? $request["time"]: null,
                    "text" => isset($request["text"])? $request["text"]: null,
                    "dead" => isset($request["dead"])? $request["dead"]: null,
                    "parent" => isset($request["parent"])? $request["parent"]: null,
                    "poll" => isset($request["poll"])? $request["poll"]: null,
                    "kids" => isset($request["kids"])? \json_encode($request["kids"]): null,
                    "url" => isset($request["url"])? $request["url"]: null,
                    "score" => isset($request["score"])? $request["score"]: null,
                    "title" => isset($request["title"])? $request["title"]: null,
                    "parts" => isset($request["parts"])? $request["parts"] : null,
                    "descendants" => isset($request["descendants"])? $request["descendants"] :null
                ]);
            }
        }
        return Post::all();
    }

    public function getPosts(){
        return Post::all();
    }
}