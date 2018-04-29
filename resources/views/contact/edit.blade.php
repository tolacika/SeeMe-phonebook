@extends('layout.default')
<?php /** @var \App\Models\Contact $contact */ ?>
<?php /** @var array categoryArray */ ?>
@section('content')
    <div class="row pt-4">
        <div class="col-sm-8 mx-auto">
            <div class="card">
                <h5 class="card-header">
                    Névjegy szerkesztése
                </h5>
                <div class="card-body">
                    @if (count($errors))
                        <div class="alert alert-danger" role="alert">
                            @foreach($errors->all() as $error)
                                <div>{{ $error }}</div>
                            @endforeach
                        </div>
                    @endif
                    <form method="POST" action="{{ route('contact.update', ['contact' => $contact]) }}" id="editContactForm">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="nameField">Név</label>
                            <input type="text" name="name" id="nameField" class="form-control" required value="{{ old('name') ?? $contact->name }}">
                        </div>
                        <div class="form-group">
                            <label for="emailField">E-mail cím</label>
                            <input type="email" name="email" id="emailField" class="form-control" required value="{{ old('email') ?? $contact->email }}">
                        </div>
                        <div class="form-group">
                            <label for="phoneField">Telefonszám</label>
                            <input type="text" name="phone" id="phoneField" class="form-control" pattern="^36(20|30|31|70)[0-9]{7}"
                                   title="Elfogatott formátum: 36xx1234567, ahol az XX lehet 20, 30, 31 vagy 70" value="{{ old('phone') ?? $contact->phone }}">
                        </div>
                        <div class="form-group">
                            <label>Kategória</label>
                            @foreach(\App\Models\Category::where('hidden', 0)->orderBy('name')->get() as $cat)
                                <div class="form-check">

                                    <input class="form-check-input categorySelect" id="categorySelect{{ $cat->id }}" type="checkbox" name="categories[]"
                                           value="{{ $cat->id }}" {{ in_array($cat->id, old('categories') !== null ? old('categories') : $categoryArray) ? "checked" : "" }}>

                                    <label class="form-check-label" for="categorySelect{{ $cat->id }}">{{ $cat->name }}</label>
                                </div>
                            @endforeach
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-success">Mentés</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('after-scripts')
    <script type="text/javascript">
        $(document).ready(function () {
            $("#editContactForm").submit(function (e) {
                if ($(".categorySelect:checked").length === 0) {
                    alert("Legalább egy kategória kiválasztandó");
                    e.preventDefault();
                    return false;
                }
            });
        });
    </script>
@endpush