<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Bug extends Model
{
	protected $guarded = ['id'];
	protected $with = ['project'];
    //
    public function project(){
    	return $this->belongsTo("App\Project");
    }

}
/**
* 10 
*/