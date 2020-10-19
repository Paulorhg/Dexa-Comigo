<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Account;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = 'lucas';
        $user->email = 'lucas.flaquer@gmail.com';
        $user->password = bcrypt('123');
        $user->save();
        $user->accounts()->saveMany(
            factory(Account::class, 3)->make()
        );
        // factory(User::class, 10)
        //     ->create()
        //     ->each(function($user) {
        //         $user->accounts()->saveMany(
        //             factory(Account::class, 3)->make()
        //         );
        //     });
    }
}
