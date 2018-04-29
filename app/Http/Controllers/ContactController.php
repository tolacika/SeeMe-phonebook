<?php

namespace App\Http\Controllers;

use App\Helpers\Paginator;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;

/**
 * Class ContactController
 * @package App\Http\Controllers
 */
class ContactController extends Controller {

    /**
     * Megjeleníti a névjegy listázót
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return view('contact.list');
    }

    /**
     * A névjegy listázó ezzel tölti fel magát
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
        $pager = new Paginator(config('seeme.result_per_page'), $page, $count);

        $contacts = $contacts->offset($pager->getOffset())->limit($pager->getPerPage())->get();

        /** @var Contact $c */
        foreach ($contacts as $c) {
            $categories = [];
            foreach ($c->categories as $cat) {
                $categories[] = $cat->name;
            }
            $item = [
                'id'         => $c->id,
                'name'       => $c->name,
                'email'      => $c->email,
                'phone'      => $c->phone ? "+" . $c->phone : "",
                'categories' => $categories,
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
        return view('contact.create');
    }

    /**
     * Elmenti az új elemet
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store() {
        $newContact = $this->validate(request(), [
            'name'       => 'required',
            'email'      => 'required|email',
            'phone'      => ['nullable', 'regex:/^36(20|30|31|70)[0-9]{7}/'],
            'categories' => 'required|array',
        ]);

        $contact = Contact::create(collect($newContact)->except('categories')->toArray());
        $contact->categories()->sync($newContact['categories']);

        return redirect(route('contact'))->with('flash', ['level' => "success", 'title' => "Sikeres művelet!", 'message' => "A névjegy sikeresen létre lett hozva."]);
    }

    /**
     * Megjeleníti a szerkesztő form-ot
     *
     * @param Contact $contact
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(Contact $contact) {
        return view('contact.edit', ['contact' => $contact, 'categoryArray' => $contact->getCategoriesArray()]);
    }

    /**
     * Elmenti a szerkesztett elemet
     *
     * @param Contact $contact
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Contact $contact) {
        $newContact = $this->validate(request(), [
            'name'       => 'required',
            'email'      => 'required|email',
            'phone'      => ['nullable', 'regex:/^36(20|30|31|70)[0-9]{7}/'],
            'categories' => 'required|array',
        ]);

        $contact->fill(collect($newContact)->except('categories')->toArray());
        $contact->categories()->sync($newContact['categories']);
        $contact->save();

        return redirect(route('contact'))->with('flash', ['level' => "success", 'title' => "Sikeres művelet!", 'message' => "A névjegy sikeresen frissítve lett."]);
    }

    /**
     * Törli az adott elemet, valamint lekapcsolja magáról a kategóriákat
     *
     * @param Contact $contact
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     * @throws \Exception
     */
    public function destroy(Contact $contact) {

        $contact->categories()->detach();
        $contact->delete();

        return redirect(route('contact'))->with('flash', ['level' => "success", 'title' => "Sikeres művelet!", 'message' => "A névjegy sikeresen törölve lett."]);
    }
}
