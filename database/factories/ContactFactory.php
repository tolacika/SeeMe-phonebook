<?php
/**
 * Created by PhpStorm.
 * User: Tolacika
 * Date: 2018. 04. 27.
 * Time: 10:17
 */
use Faker\Generator as Faker;



$factory->define(App\Models\Contact::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'phone' => rand(0, 2) == 1 ? null : "3620" . str_pad("" . rand(0, 100000), 7, "0", STR_PAD_LEFT),
    ];
});