<?php
/**
 * Created by PhpStorm.
 * User: Tolacika
 * Date: 2018. 01. 26.
 * Time: 11:27
 */

namespace App\Helpers;

/**
 * Segtő osztály az AJAX-os listázáshoz
 *
 * Class Paginator
 * @package App\Helpers
 */
class Paginator {
    private $perPage;
    private $currPage;
    private $total;

    /**
     * Paginator constructor.
     *
     * @param $perPage
     * @param $currPage
     * @param $count
     */
    function __construct($perPage, $currPage, $count) {
        $this->perPage = $perPage;
        $this->currPage = $currPage;
        $this->total = $count;
    }

    /**
     * Visszaadja, hogy honnan induljon az adatbázisból való lekérdezés
     *
     * @return float|int
     */
    public function getOffset() {
        return ($this->currPage) * $this->perPage;
    }

    /**
     * Visszaadja az egy oldalon megjelenítendő találatok számát
     *
     * @return mixed
     */
    public function getPerPage() {
        return $this->perPage;
    }

    /**
     * Visszaadja, hogy vannak-e további oldalak
     *
     * @return bool
     */
    public function hasMore() {
        return $this->getOffset() + $this->perPage > $this->total;
    }
}