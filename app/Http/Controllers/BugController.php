<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bug;
use App\Project;
use Illuminate\Support\Facades\Auth;

class BugController extends Controller
{
    //

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['store','count']]);
    }
    public function index()
    {
    	$bugs = Bug::paginate(10)->all();

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
    /**
    * Store bug and save in a project
    */
    public function store(Request $req){
        
        $bug = new Bug();
        
        $bug->name = $req->input("name") ;
        $bug->description = $req->input("description") ;
        $bug->severity = $req->input("severity") ;
        $bug->status = "new bug";
        
        $bug_project_id = $req->input("project") ;
        $project = Project::find($bug_project_id);
        
        if (Auth::check()) {
            $bug->user_name = Auth::user()->name;
        }

        $bug->save();        
        $project->bug()->save($bug);       
        
    	return response()->json($bug);
    }
    public function delete($id){

        $project = Bug::findOrFail($id)->first();
        $project->delete();
        return response()->json(["message"=>"Bug of id: $id has been destroyed!"]);

    }

}
