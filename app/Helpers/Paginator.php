<?php
/**
 * Created by PhpStorm.
 * User: Tolacika
 * Date: 2018. 01. 26.
 * Time: 11:27
 */

namespace App\Helpers;


class Paginator {
    private $perPage;
    private $currPage;
    private $total;

    function __construct($perPage, $currPage, $count) {
        $this->perPage = $perPage;
        $this->currPage = $currPage;
        $this->total = $count;
    }

    public function getOffset() {
        return ($this->currPage) * $this->perPage;
    }

    public function getPerPage() {
        return $this->perPage;
    }

    public function hasMore() {
        return $this->getOffset() + $this->perPage > $this->total;
    }
}