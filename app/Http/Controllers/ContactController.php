<?php

namespace App\Http\Controllers;

use App\Helpers\Paginator;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller {
    public function index() {
        return view('contactList');
    }

    public function listAjax() {
        $response = [
            'status' => "success",
            'end'    => true,
            'list'   => [],
            'count'  => 0,
        ];
        $page = \request('page', 0);

        $contacts = Contact::with('categories');

        $name = \request('name');
        $email = \request('email');
        $phone = \request('phone');
        $category = \request('category');

        if ($name) {
            $contacts = $contacts->where('name', 'LIKE', "%" . $name . "%");
        }
        if ($email) {
            $contacts = $contacts->where('email', 'LIKE', "%" . $email . "%");
        }
        if ($phone) {
            $contacts = $contacts->where('phone', 'LIKE', "%" . preg_replace("/[^0-9]/", "", $phone) . "%");
        }
        if ($category) {
            $contacts = $contacts->whereHas('categories', function($q) use ($category) {
                $q->where('id', $category);
            });
        }

        $contacts = $contacts->orderBy(request('order_field', 'id'), request('order_by', 'asc'));
        $count = $contacts->count();
        $pager = new Paginator(10, $page, $count);

        $contacts = $contacts->offset($pager->getOffset())->limit($pager->getPerPage())->get();

        /** @var Contact $c */
        foreach ($contacts as $c) {
            $categories = [];
            foreach ($c->categories as $cat){
                $categories[] = $cat->name;
            }
            $item = [
                'id'         => $c->id,
                'name'       => $c->name,
                'email'      => $c->email,
                'phone'      => $c->phone ? "+" . $c->phone : "",
                'categories' => $categories,
            ];
            $response['list'][] = $item;
        }

        $response['end'] = $pager->hasMore();
        $response['count'] = $count;

        return new JsonResponse($response);
    }
}
