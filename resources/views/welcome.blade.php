<!doctype html>
<html lang="hu">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="{{ asset("css/bootstrap.min.css") }}">
    <link rel="stylesheet" href="{{ asset("css/toastr.min.css") }}">
    <link rel="stylesheet" href="{{ asset("css/app.css") }}">
    <link rel="stylesheet" href="{{ asset("css/fontawesome-all.min.css") }}">

    <title>SeeMe telefonkönyv</title>
</head>
<body>

<div class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1 class="display-4">SeeMe Telefonkönyv</h1>
        <p class="lead">Egyszeri próbafeladat a Dream Interactive részére</p>
        <hr class="my-4">
        <p>További információ a Bitbucketen található</p>
        <a class="btn btn-primary btn-lg" href="https://bitbucket.org/CmdNetWizard/seeme-phonebook/overview" target="_blank"><i class="fab fa-bitbucket"></i> BitBucket</a>
    </div>
</div>

<div class="container">
    @yield('content')
</div>

<script type="text/javascript" src="{{ asset('js/jquery-3.3.1.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/bootstrap.bundle.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/toastr.min.js') }}"></script>
<script type="text/javascript" src="{{ asset("js/app.js") }}"></script>
<script defer src="https://use.fontawesome.com/releases/v5.0.10/js/all.js" integrity="sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+" crossorigin="anonymous"></script>
</body>
</html>