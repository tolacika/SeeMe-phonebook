<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */

    'email'    => 'Valós e-mail címet adj meg: :attribute.',
    'required' => 'Kötelező mező :attribute',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'phone'      => [
            'regex' => 'Elfogatott telefonszám formátum: 36xx1234567, ahol az XX lehet 20, 30, 31 vagy 70',
        ],
        'categories' => [
            'required' => 'Legalább egy kategória kiválasztása kötelező',
            'array'    => 'Legalább egy kategória kiválasztása kötelező',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [
        'name'       => 'Név',
        'email'      => 'E-mail cím',
        'phone'      => 'Telefonszám',
        'categories' => 'Kategória',
    ],

];
