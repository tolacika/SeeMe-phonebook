@extends('layout.default')

@section('content')
    <div class="row mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    Keresés
                </div>
                <div class="card-body">
                    <form id="search" class="row" action="{{ route('contact.list.ajax') }}">
                        <div class="form-group col-sm-6 col-md-3">
                            <label for="nameSearch">Név</label>
                            <input type="text" name="name" id="nameSearch" class="form-control">
                        </div>
                        <div class="form-group col-sm-6 col-md-3">
                            <label for="emailSearch">E-mail cím</label>
                            <input type="text" name="email" id="emailSearch" class="form-control">
                        </div>
                        <div class="form-group col-sm-6 col-md-3">
                            <label for="phoneSearch">Telefonszám</label>
                            <input type="text" name="phone" id="phoneSearch" class="form-control">
                        </div>
                        <div class="form-group col-sm-6 col-md-3">
                            <label for="categorySearch">Kategória</label>
                            <select name="category" id="categorySearch" class="form-control">
                                <option value="">--- Összes ---</option>
                                @foreach(\App\Models\Category::orderBy('name')->get() as $cat)
                                    <option value="{{ $cat->id }}">{{ $cat->name }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-12">
                            <button type="submit" class="btn btn-outline-primary">Keresés</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    Névjegyek
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover table-borderless valign-middle">
                            <thead id="head">
                            <tr>
                                <th class="sorting_asc text-center" data-sort="name" data-elem="Name(elem.id, elem.name, '{{ route('contact') }}')">Név</th>
                                <th class="text-center" data-sort="email" data-elem="Email(elem.email)">E-mail cím</th>
                                <th class="text-center" data-sort="phone" data-elem="Phone(elem.phone)">Telefonszám</th>
                                <th class="text-center" data-sort="phone" data-elem="Categories(elem.categories)">Kategóriák</th>
                                <th class="text-right" data-elem="Buttons(elem.id, '{{ route('contact') }}')">
                                    <a href="{{ route('contact.create') }}" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i></a>
                                </th>
                            </tr>
                            </thead>
                            <tbody id="list"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection