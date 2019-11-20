<?php

use Illuminate\Database\Seeder;
use App\user;
use App\Project;
use App\Bug;
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

        Project::create([
            'name' => 'BugTracker',
            'user_id' => 1
        ]);
        Bug::create([
            'name' => 'BugTracker',
            'description' => 1,
            'severity' => "Low",
            'status' => 'new bug',
            'project_id' => 1
        ]);
    }
}
