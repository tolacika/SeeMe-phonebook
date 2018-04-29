<!doctype html>
<html lang="hu">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="{{ asset('img/seeme.ico') }}"/>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{ asset("css/bootstrap.min.css") }}">
    <link rel="stylesheet" href="{{ asset("css/toastr.min.css") }}">
    <link rel="stylesheet" href="{{ asset("css/app.css") }}">
    <link rel="stylesheet" href="{{ asset("css/fontawesome-all.min.css") }}">

    <title>SeeMe telefonkönyv</title>
</head>
<body>

@include('sections.nav')

@if (in_array(\request()->route()->getName(), ['home', 'contact']))
    @include('sections.jumbotron')
@endif

<div class="container">
    @yield('content')
</div>

@include('modals.commonDelete')

<script type="text/javascript" src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/bootstrap.bundle.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/toastr.min.js') }}"></script>
<script type="text/javascript" src="{{ asset("js/moment.min.js") }}"></script>
<script type="text/javascript" src="{{ asset("js/moment.hu.js") }}"></script>
<script type="text/javascript" src="{{ asset("js/app.js") }}"></script>

@stack('after-scripts')

@if (session('flash'))
    <script type="text/javascript">
        window.app.flashMessage('{{ session('flash')['level'] }}', '{{ session('flash')['message'] }}', '{{ session('flash')['title'] ?? '' }}')
    </script>
@endif

</body>
</html>