
/* Valida que el usuario sea admin para ingresar. Si es admin, continua a la ruta.
    Si no es admin, redirecciona dependiendo si hay o no un usuario logueado.
*/
export const adminAuth = (req, res, next) => {

    if (!req.session.admin) {

        if (!req.session.user && !req.session.mod) {

            res.redirect('/auth/login' + '?msg=Debe estar logueado para ingresar');
        } else {

            res.redirect('/admin' + '?msg_err=No tiene los permisos de admin para crear o eliminar items');
        }
    } else {
        next();
    }
}



/* Valida que el usuario sea admin o moderador para ingresar. Si esta ok, continua a la ruta.
    Si no, redirecciona dependiendo si hay o no un usuario logueado.
*/
export const modAuth = (req, res, next) => {

    if (!req.session.admin && !req.session.mod) {

        if (!req.session.user) {

            res.redirect('/auth/login' + '?msg=Debe estar logueado para ingresar');
        } else {

            res.redirect('/home' + '?msg=No tiene los permisos necesarios para ingresar');
        }
    } else {
        next();
    }
}