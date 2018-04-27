@extends('layout.default')

@section('content')
    <form id="search" action="{{ route('contact.list.ajax') }}"></form>

<div class="table-responsive">
    <table class="table table-striped table-hover table-borderless">
        <thead id="head">
        <tr>
            <th class="sorting_asc" data-sort="name" data-elem="Name(elem.id, elem.name, 'prefix')">Név</th>
            <th data-sort="email" data-elem="Email(elem.email)">E-mail cím</th>
            <th data-sort="phone" data-elem="Phone(elem.phone)">Telefonszám</th>
            <th data-elem="Buttons(elem.id)">&nbsp;</th>
        </tr>
        </thead>
        <tbody id="list"></tbody>
    </table>
</div>
@endsection