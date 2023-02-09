<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory;

class UserSeeder extends Seeder
{
    /**
     * tạo ra 100 dong dữ liệu trong model user
     *
     * @return void
     */
    public function run()
    {
        $faker =  Factory::create();
        $groupRole = ['1', '2', '3'];
        for ($i = 0; $i < 100; $i++) {
            $temp['name'] = $faker->name;
            $temp['email'] = $faker->unique()->email;
            $temp['password'] = Hash::make('123456789');
            $temp['is_active'] = $i % 2 == 0 ? 1 : 0;
            $temp['is_delete'] = $i % 2 == 0 ? 0 : 1;
            $temp['group_role'] = $groupRole[array_rand($groupRole, 1)];

            User::create($temp);
        }
    }
}
