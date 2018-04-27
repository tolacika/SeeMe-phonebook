<nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
    <div class="container">
        <a class="navbar-brand" href="{{ route('home') }}">
            <img src="{{ asset('img/seeme.png') }}" width="30" height="30" class="d-inline-block align-top" alt="">
            SeeMe Telefonkönyv
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item {{ starts_with(\request()->route()->getName(), ['home', 'contact']) ? "active" : "" }}">
                    <a class="nav-link" href="{{ route('contact') }}"><i class="far fa-address-book"></i> <span class="d-sm-none d-md-inline">Telefonkönyv</span></a>
                </li>
                <li class="nav-item {{ starts_with(\request()->route()->getName(), ['categories', 'category']) ? "active" : "" }}">
                    <a class="nav-link" href="#"><i class="fa fa-database"></i> <span class="d-sm-none d-md-inline">Kategóriák</span></a>
                </li>
            </ul>
        </div>
    </div>
</nav>