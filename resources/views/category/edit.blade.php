@extends('layout.default')
<?php /** @var \App\Models\Category $category */ ?>
@section('content')
    <div class="row pt-4">
        <div class="col-sm-8 mx-auto">
            <div class="card">
                <h5 class="card-header">
                    Kategória szerkesztése
                </h5>
                <div class="card-body">
                    @if (count($errors))
                        <div class="alert alert-danger" role="alert">
                            @foreach($errors->all() as $error)
                                <div>{{ $error }}</div>
                            @endforeach
                        </div>
                    @endif
                    <form method="POST" action="{{ route('category.update', ['contact' => $category]) }}" id="editCategoryForm">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="nameField">Név</label>
                            <input type="text" name="name" id="nameField" class="form-control" required value="{{ old('name') ?? $category->name }}">
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