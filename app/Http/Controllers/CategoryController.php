<?php

namespace App\Http\Controllers;

use App\Helpers\Paginator;
use App\Models\Category;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller {
    public function index() {
        return view('category.list');
    }

    public function listAjax() {
        $response = [
            'status' => "success",
            'end'    => true,
            'list'   => [],
            'count'  => 0,
        ];
        $page = \request('page', 0);

        $categories = Category::with('contacts');

        $name = \request('name');

        if ($name) {
            $categories = $categories->where('name', 'LIKE', "%" . $name . "%");
        }

        $categories = $categories->orderBy(request('order_field', 'id'), request('order_by', 'asc'));
        $count = $categories->count();
        $pager = new Paginator(10, $page, $count);

        $categories = $categories->offset($pager->getOffset())->limit($pager->getPerPage())->get();

        /** @var Category $c */
        foreach ($categories as $c) {
            $item = [
                'id'         => $c->id,
                'name'       => $c->name,
                'hidden'     => $c->hidden ? true : false,
                'count'      => count($c->contacts),
                'created_at' => $c->created_at->format('Y-m-d H:i:s'),
            ];
            $response['list'][] = $item;
        }

        $response['end'] = $pager->hasMore();
        $response['count'] = $count;

        return new JsonResponse($response);
    }

    public function create() {
        return view('category.create');
    }

    public function store() {
        $newCategory = $this->validate(request(), [
            'name' => 'required',
        ]);

        Category::create($newCategory);

        return redirect(route('category'));
    }

    public function edit(Category $category) {
        if ($category->hidden == 1) {
            abort(404);
        }

        return view('category.edit', ['category' => $category]);
    }

    public function update(Category $category) {
        if ($category->hidden == 1) {
            abort(404);
        }
        $newCategory = $this->validate(request(), [
            'name' => 'required',
        ]);

        $category->name = $newCategory['name'];
        $category->save();

        return redirect(route('category'));
    }

    /**
     * @param Category $category
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     * @throws \Exception
     */
    public function destroy(Category $category) {
        $contacts = Contact::with('categories')->whereHas('categories', function($q) use ($category) {
            $q->where('id', $category->id);
        })->get();
        foreach ($contacts as $contact) {
            if (count($contact->categories) <= 1) {
                $contact->categories()->detach();
                $contact->categories()->attach(1);
            } else {
                $contact->categories()->detach($category);
            }
        }
        $category->delete();

        return redirect(route('category'));
    }
}
