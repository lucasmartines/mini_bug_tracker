<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => ['login','register','count']]);
    }
    public function index(){
        return response()->json(User::all());
    }
    public function login()
    {
        $credentials = request(['name', 'password']);
        
        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
    public function count(){
        // return response()->json(["bug"=>"5"]);

        
        return response()->json(["userQuantity"=>User::count()]);
    }
    public function register(Request $req){
        
        

        try{
            $user = User::create([
                "name" => $req->input("name"),
                "password" =>bcrypt( $req->input("password")),
                "email" => $req->input("email")
            ]);


             $token = auth()->attempt([
                 "name" => $req->input("name"),
                 "password" => $req->input("password")
             ]);
            if($token != false){
                return $this->respondWithToken($token);
            }
            else{
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            
        }
        catch(\Exception $e){
            return response()->json([
                'error'=>$e->getMessage ()
            ]);
        }
        


       
       
    }
        /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        
        return response()->json(auth()->user());
    }
        /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
        /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

}
