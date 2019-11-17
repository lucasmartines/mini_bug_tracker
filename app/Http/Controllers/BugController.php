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
    public function count(){
        // return response()->json(["bug"=>"5"]);
        return response()->json(["bugQuantity"=>Bug::count()]);
    }
    public function store(Request $req){
        
        $bug = new Bug();
        
        $bug->name = $req->input("name") ;
        $bug->description = $req->input("description") ;
        $bug->severity = $req->input("severity") ;
        $bug_id = $req->input("project") ;

        $bug->save();
        
    	return response()->json($bug);
    }
    public function delete($id){

        $project = Bug::findOrFail($id)->first();
        $project->delete();
        return response()->json(["message"=>"Bug of id: $id has been destroyed!"]);

    }

}
