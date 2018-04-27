<?php
/**
 * Created by PhpStorm.
 * User: Tolacika
 * Date: 2018. 04. 27.
 * Time: 10:17
 */
use Faker\Generator as Faker;



$factory->define(App\User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10),
    ];
});