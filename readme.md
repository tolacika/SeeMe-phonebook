## A projektről

A projekt egy beugró próbafeladat a Dream Interactive részére.

Első lépésként az adatbézis szerkezetet hoztam létre, amit nem bonyolítottam túl, három táblából áll. Egy a névjegyeknek, egy a kategóriáknak, és egy pedig a kapcsolótábla (many-to-many). Miután megvolt az adatszerkezet készítettem egy seeder-t, amely feltölti az adatbázist kezdeti adatokkal (4 előre meghatározott kategória, 100 névjegy 1-2 kategóriában).

Mivel adataink már vannak, jöhetnek a felületek, ahol ezeket látjuk. A feladatkiírástól eltérően először a címzettekhez (névjegyek) tartozó felületeket csináltam meg. A listázó oldalon elhagytam a lapozási lehetőséget, helyette viszont betettem egy lazy-load-ot, mely egyszerre 15 elemet tölt be, majd ha a lista aljára érünk, betölti az újabb 15 rekordot (Config-ból állítható a mennyisége). A létrehozó-szerkesztő felületen az adatok ellenőrzése egyszerre zajlik frontend-en és backend-en. Frontend-en a HTML5 direktívák szerint `require` és `pattern` attribútumokkal valósítottam meg az ellenőrzést, a kategória kiválasztás esetében pedig javascript-tel. Backend-en pedig a Laravel árltal használt `Validator` osztály segítségével ellenőrzöm az adatok formalitását. Valamint a rejtett (alapértelmezett) kategória nem választható. Törlés esetén soft-delete-et használok, hiszen törzsadatot nem illik csak úgy törölni. Viszont törléskor a kategóriákat leválasztom a névjegyről.

A kategóriák esetében ugyanaz az eljárás, mint a névjegyek esetében, azzal a különbséggel, hogy listázáskor a névjegyek számát is megjelenítem, létrehozáskor és szerkesztéskor csak nevet lehet megadni, valamint törlés esetén a összes névjegyről le lesz választva a törölt kategória, a "szabadon maradt" névjegyeket pedig behelyezzük az alapértelmezett kategóriába.

## [Live Demo](http://seeme.packingstation.hu/)

## Szerver szükségletek:

- PHP >= 7.1.3
- PDO PHP Extension
- JSON PHP Extension
- MySQL >= 5.0

## Telepítés

GIT Repo klónozása:
```
git clone https://CmdNetWizard@bitbucket.org/CmdNetWizard/seeme-phonebook.git
```
Composer futtatása:
```
composer install
```
`.env` fájl létrehozása `.env.examlpe` alapján, valamint a megfelelő adatbázis kapcsolat beállítasa ugyanezen fájlban:
```
DB_DATABASE=bigfish
DB_USERNAME=bigfish
DB_PASSWORD=******
```
Szükség esetén az `.env` fájlban az `APP_URL`-t át kell írni a megfelelőre.

Az adatbázis kapcsolat létrejötte után már csak migrálni kell az adatbázisunkat, valamint feltölteni adatokkal. Ezt a következő parancs segítségével lehet:
```
php artisan migrate --seed
```

És már használható is az alkalmazás. :)

Amennyiben a lépések elvégzése után azzal a hibaüzenettel találkozunk, hogy: `No application encryption key has been specified.`, akkor még szükség van egy `php artisan key_generate` parancsra.

## Haladási napló

**2018-04-27**

- Laravel, Bootstrap berőffentése (~2 óra)
- Különböző már létező elemek összevadászása, implementálása (~1 óra)
- Telefonkönyv listázó valamint design finomítgatás (~3 óra)
- Új kontakt (~1 óra)

**2018-04-29**

- Kontakt szerkesztése, törlése (~1 óra)
- Kategóriák listázása, létrehozása, szerkesztése, törlése (~2 óra)

## Harmadik féltől származó és saját komponensek

### [Laravel 5.6](https://laravel.com/)

Keretrendszer, a projekt alapja

### [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar)

Fejlesztést segítő könyvtár frontend-re. Segítségével vizsgálhatóak a frontend és backend közötti kérések tulajdonságai, részletei

### [Laravel IDE helper](https://github.com/barryvdh/laravel-ide-helper)

Szintén fejlesztést segítő könyvtár backend-re. Segítségével [PhpStorm](https://www.jetbrains.com/phpstorm/)hoz és más fejlesztőkörnyezetekhez lehet generálni fájlokat, osztályokat, a gyorsabb, és precízebb fejlesztéshez.

### [Bootstrap 4.x](https://getbootstrap.com/), [jQuery 3.3.1](https://jquery.com/download/), [Popper.js](https://popper.js.org/)

Frontend keretrendszer foleg, de nem utolsó sorban a reszponzivitás és a design érdekében.

### [FontAwesome](https://fontawesome.com/)

Icon set

### [Toastr](https://github.com/CodeSeven/toastr)

Értesítések megjelenítése

### assets/js/application.js, admin-list.js

Korábban más projekthez létrehozott, bevált kód, saját termés.

### assets/js/utils/jquery-invisible.js

Forrása már feledésbe merült, de régóta használatos.

## Licensz

A projekt egy nyílt forráskódú, [MIT licensz](https://opensource.org/licenses/MIT) alatt licenszelt kódbázis
