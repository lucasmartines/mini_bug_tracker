<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Project;
use Illuminate\Support\Facades\Auth;


class ProjectController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => []]);
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
