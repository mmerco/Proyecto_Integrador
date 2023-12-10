
document.addEventListener('click', event => {
    let element = event.target;

    if (!element.matches('.delete__button')) {
        return

    } else {
        let id = element.dataset.id;

        fetch(`/admin/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
            .then(() => window.location.reload(true));
    }
});

