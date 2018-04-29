<div class="modal modal-danger" id="deleteModal" aria-hidden="true"
     aria-labelledby="deleteModal" role="dialog" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Megerősítés</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Bezárás">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p id="deleteModalText">Biztosan törlöd az adott elemet?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Nem</button>
                <form action="#" method="POST" id="deleteModalForm">
                    {{ csrf_field() }}
                    <button type="submit" class="btn btn-danger">Igen</button>
                </form>
            </div>
        </div>
    </div>
</div>