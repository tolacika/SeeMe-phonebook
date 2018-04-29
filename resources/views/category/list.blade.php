@extends('layout.default')

@section('content')
    <div class="row pt-4 mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    Keresés
                </div>
                <div class="card-body">
                    <form id="search" class="row" action="{{ route('category.list.ajax') }}">
                        <div class="form-group col-sm-6 col-md-3">
                            <label for="nameSearch">Név</label>
                            <input type="text" name="name" id="nameSearch" class="form-control">
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
                                <th class="sorting_asc text-center" data-sort="name" data-elem="Name(elem.id, elem.name, '{{ route('category') }}')">Név</th>
                                <th class="text-center" data-elem="Count(elem.count, ':count db névjegy')">Névjegyek</th>
                                <th class="text-center" data-sort="created_at" data-elem="Created(elem.created_at)">Létrehozva</th>
                                <th class="text-right" data-elem="Buttons(elem.id, elem.name, '{{ route('category') }}', elem.hidden)">
                                    <a href="{{ route('category.create') }}" class="btn btn-primary btn-sm"><i class="fa fa-plus-circle"></i></a>
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