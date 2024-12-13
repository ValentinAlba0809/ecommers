// const express = require('express');
// const router = express.Router();


// router.post('/auth/login', async (req, res) => {
//     const { firebaseToken } = req.body;

//     if (!firebaseToken) {
//         return res.status(400).json({ ok: false, message: 'Token no proporcionado' });
//     }
//     try {
      
//         console.log('Token recibido:', firebaseToken);

//         res.status(200).json({ ok: true, message: 'Login exitoso' });
//     } catch (error) {
//         console.error('Error al autenticar:', error);
//         res.status(500).json({ ok: false, message: 'Error interno del servidor' });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { firebaseToken } = req.body;

    if (!firebaseToken) {
        return res.status(400).json({ ok: false, message: 'Token no proporcionado' });
    }

    try {
        console.log('Token recibido:', firebaseToken);
        res.status(200).json({ ok: true, message: 'Login exitoso' });
    } catch (error) {
        console.error('Error al autenticar:', error);
        res.status(500).json({ ok: false, message: 'Error interno del servidor' });
    }
});

module.exports = router;
