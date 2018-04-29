@extends('layout.default')

@section('content')
    <div class="row pt-4">
        <div class="col-sm-8 mx-auto">
            <div class="card">
                <h5 class="card-header">
                    Új kategória felvétele
                </h5>
                <div class="card-body">
                    @if (count($errors))
                        <div class="alert alert-danger" role="alert">
                            @foreach($errors->all() as $error)
                                <div>{{ $error }}</div>
                            @endforeach
                        </div>
                    @endif
                    <form method="POST" action="{{ route('category.store') }}" id="createCategoryForm">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="nameField">Név</label>
                            <input type="text" name="name" id="nameField" class="form-control" required value="{{ old('name') }}">
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