<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use Illuminate\Support\Facades\Auth;


class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index','count']]);
    }
    public function index()
    {
    	$projects = Project::all();
    	return response()->json($projects);
    }
    public function project($id){

    	$project = Project::findOrFail($id)->first();
    	return response()->json($project);
    }
    public function count(){
        return response()->json(['projectQuantity'=>Project::count()]);
    }
    public function update($id,Request $req){


        Project::where("id",$id)->update(['name' => $req->input('name')]);
            
        return response()->json("item $id and ".$req->input("name")." has been saved");
    }
    public function store(Request $req){

    	$project = new Project();
    	$project->name = $req->input('name');
    	$project->user_id = auth()->id();
    	 
    	$project->save();

    	return response()->json($project);
    }
    public function delete($id){

    	$project = Project::findOrFail($id)->first();
        $project->delete();
    	return response()->json(["message"=>"Bug of id: $id has been destroyed!"]);
    }

}
