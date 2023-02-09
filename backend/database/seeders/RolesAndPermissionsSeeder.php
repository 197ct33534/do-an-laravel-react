<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Permission::create(['name' => 'create product', 'title' => 'create product']);
        Permission::create(['name' => 'delete product', 'title' => 'delete product']);
        Permission::create(['name' => 'read product', 'title' => 'read product']);
        Permission::create(['name' => 'edit product', 'title' => 'edit product']);

        Role::create(['name' => 'Super-Admin', 'title' => 'Super-Admin']);


        $editor = Role::create(['name' => 'editor', 'title' => 'editor']);
        $editor->givePermissionTo(['create product', 'delete product', 'read product', 'edit product']);

        $reviewer = Role::create(['name' => 'reviewer', 'title' => 'reviewer']);
        $reviewer->givePermissionTo(['read product']);

        $listAdmin = User::where('group_role', '1')->get();
        foreach ($listAdmin as $ad) {
            $ad->assignRole('Super-Admin');
        }

        $listEditor = User::where('group_role', '2')->get();
        foreach ($listEditor as $ed) {
            $ed->assignRole('editor');
        }

        $listReview = User::where('group_role', '3')->get();
        foreach ($listReview as $re) {
            $re->assignRole('reviewer');
        }
    }
}
