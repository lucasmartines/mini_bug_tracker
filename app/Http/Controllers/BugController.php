<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bug;

class BugController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['store']]);
    }
    public function index()
    {
    	$bugs = Bug::all();

    	return response()->json($bugs);
    }
    public function bug($id){

    	$bug = Bug::findOrFail($id)->first();
    	return response()->json($bug);
    }
    public function store(Request $bug){

    	Bug::create($bug->all());
    	return response()->json($bug);
    }
    public function delete($id){

        $project = Bug::findOrFail($id)->first();
        $project->delete();
        return response()->json(["message"=>"Bug of id: $id has been destroyed!"]);

    }

}
