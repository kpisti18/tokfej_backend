const express = require('express')
const mysql = require('mysql2')

const host = '127.0.0.1'
const port = 5500

const app = express()

app.use(express.json())

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'tokfej',
    timezone: 'Z',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ----- VÉGPONTOK -----

// új játék indítása
app.post('/api/start/:nev', (req, res) => {
    const { nev } = req.params
    //res.json(nev)

    const valasz = {
        azon: null,
        nev: null,
        pont: null,
        esemenyek: []
    }

    db.query('SELECT * FROM users WHERE nev = ?', [nev], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Adatbázis hiba', err })
        }

        if (result.length > 0) {
            valasz.azon = result[0].azon
            valasz.nev = result[0].nev
            valasz.pont = result[0].pont

            valasz.esemenyek = jatek()

            return res.status(200).json(valasz)
        }

        db.query('INSERT INTO users (azon, nev, pont) VALUES (NULL, ?, "0")', [nev], (err1, result1) => {
            if (err1) {
                return res.status(500).json({ error: 'Adatbázis hiba', err1 })
            }

            valasz.azon = result1.insertId
            valasz.nev = nev
            valasz.pont = 0

            valasz.esemenyek = jatek()

            return res.status(200).json(valasz)
        })
    })
})

function jatek() {
    let jatek_hossz = 60
    let osszes_nyitas = 12

    const esemenyek = []

    for (let i = 1; i <= osszes_nyitas; i++) {
        // Véletlen időpont 0–60 mp között
        let nyitas = Math.random() * jatek_hossz

        // Véletlen zárás 1–2 mp-vel később
        let zaras = nyitas + (Math.random() + 1)
        zaras = Math.min(jatek_hossz, zaras)

        // Véletlen tok azonosító és pont
        let tok = Math.ceil(Math.random() * 5)
        let pont = Math.floor(Math.random() * 3)

        esemenyek.push({
            tok_azon: tok,
            nyitas: nyitas,
            zaras: zaras,
            pont: pont
        })
    }

    // (opcionális) rendezés idő szerint
    esemenyek.sort((a, b) => a.nyitas - b.nyitas)

    return esemenyek
}

// pontszám mentése
app.post('/api/score/:azon', (req, res) => {
    const { azon } = req.params
    const { pont } = req.body
    //console.log(azon, pont);

    db.query('SELECT pont FROM users WHERE azon = ?', [azon], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Adatbázis hiba', err })
        }

        //console.log(result);
        if (pont > result[0].pont) {
            db.query('UPDATE users SET pont = ? WHERE azon = ?', [pont, azon], (err2, result2) => {
                if (err2) {
                    return res.status(500).json({ error: 'Adatbázis hiba2', err2 })
                }

                return res.status(200).json({ message: 'Pont frissítve' })
            })
        } else {
            return res.status(200).json({ message: 'Pont nem változott' })
        }
    })
})

// scoreboard lekérése
app.get('/api/leaderboard', (req, res) => {
    db.query('SELECT * FROM users ORDER BY pont DESC', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Adatbázis hiba', err })
        }

        return res.status(200).json(result)
    })
})

// cheat naplózása
app.post('/api/cheat/:azon', (req, res) => {
    const { azon } = req.params

    db.query('INSERT INTO cheat (azon, idopont) VALUES (?, CURRENT_TIMESTAMP())', [azon], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Adatbázis hiba', err })
        }

        return res.status(201).end()
    })
})

app.listen(port, host, () => {
    console.log(`IP: http://${host}:${port}`)
})