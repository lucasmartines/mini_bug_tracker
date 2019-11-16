<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Bug extends Model
{
	protected $guarded = ['id'];
    //
    public function project(){
    	$this->hasOne("App\Project");
    }

}
