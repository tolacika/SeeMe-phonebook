<?php

namespace App\Http\Controllers;

use App\Helpers\Paginator;
use App\Models\Category;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;

/**
 * Class CategoryController
 * @package App\Http\Controllers
 */
class CategoryController extends Controller {

    /**
     * Megjeleníti a kategória listázót
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index() {
        return view('category.list');
    }

    /**
     * A kategória listázó ezzel tölti fel magát
     *
     * @return JsonResponse
     */
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
        $pager = new Paginator(config('seeme.result_per_page'), $page, $count);

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
    /**
     * Megjeleníti a létrehozó form-ot
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create() {
        return view('category.create');
    }

    /**
     * Elmenti az új elemet
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store() {
        $newCategory = $this->validate(request(), [
            'name' => 'required',
        ]);

        Category::create($newCategory);

        return redirect(route('category'))->with('flash', ['level' => "success", 'title' => "Sikeres művelet!", 'message' => "A kategória sikeresen létre lett hozva."]);
    }

    /**
     * Megjeleníti a szerkesztő form-ot
     *
     * @param Category $category
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(Category $category) {
        if ($category->hidden == 1) {
            abort(404);
        }

        return view('category.edit', ['category' => $category]);
    }

    /**
     * Elmenti a szerkesztett elemet
     *
     * @param Category $category
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Category $category) {
        if ($category->hidden == 1) {
            abort(404);
        }
        $newCategory = $this->validate(request(), [
            'name' => 'required',
        ]);

        $category->name = $newCategory['name'];
        $category->save();

        return redirect(route('category'))->with('flash', ['level' => "success", 'title' => "Sikeres művelet!", 'message' => "A kategória sikeresen frissítve lett."]);
    }

    /**
     * Törli az adott kategóriát, leválasztja magáról az összes névjegyet,
     * Ha egy névjegy kategória nélkül marad, azt berakja az alap kategóriába (id=1)
     *
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

        return redirect(route('category'))->with('flash', ['level' => "success", 'title' => "Sikeres művelet!", 'message' => "A kategória sikeresen törölve lett."]);
    }
}
