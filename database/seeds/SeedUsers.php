<?php

use Illuminate\Database\Seeder;
use App\user;

class SeedUsers extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        User::create([
            'name'=>"root",
            'email'=>'root@root.com',
            'password'=> bcrypt('rootroot')
        ]);
    }
}
