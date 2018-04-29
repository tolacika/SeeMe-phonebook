<?php

use Illuminate\Database\Seeder;

/**
 * Class ContactSeeder
 *
 * Feltölti a névjegyek táblát véletlenszerű kezdeti adatokkal
 */
class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Contact::class, 100)->create()->each(function($u) {
            /** @var $u \App\Models\Contact */
            $firstCategory = rand(1, 4);
            $u->categories()->attach($firstCategory);
            if (rand(0, 1) == 1 && $firstCategory > 1) {
                try {
                    $u->categories()->attach(rand(2, 4));
                } catch (\Illuminate\Database\QueryException $ex) {}
            }
        });
    }
}
