<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Role;

class RoleController extends Controller
{
    /**all roles */
    public function index(){
        $roles = Role::all();

        return response()->json($roles);
    }
    /** pass user and get his roles */
    
}
