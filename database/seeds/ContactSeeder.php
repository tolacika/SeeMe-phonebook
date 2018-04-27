<?php

use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Contact::class, 40)->create()->each(function($u) {
            /** @var $u \App\Models\Contact */
            $u->categories()->attach(rand(1, 4));
            if (rand(0, 1) == 1) {
                try {
                    $u->categories()->attach(rand(1, 4));
                } catch (\Illuminate\Database\QueryException $ex) {}
            }
//            var_dump($u->categories);die;
        });
    }
}
