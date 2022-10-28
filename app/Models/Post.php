<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        "id",
        "deleted",
        "by",
        "type",
        "time",
        "text",
        "dead",
        "parent",
        "poll",
        "kids",
        "url",
        "score",
        "title",
        "parts",
        "descendants"
    ];
}
