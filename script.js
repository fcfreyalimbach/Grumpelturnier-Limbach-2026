// =====================
// EINSTELLUNGEN
// =====================

const API_URL = "https://script.google.com/macros/s/AKfycbwOAshkRev1wU_-KG4WwTSSYNQxc_I3xk9OaJO0INZ-6bXPSPRxEuZtUr9g49SSQ-cP/exec";

const AKTUALISIERUNG = 5000; 
// 5000 = 5 Sekunden



// =====================
// DATEN LADEN
// =====================

async function ladeTabelle() {

    try {

        const antwort = await fetch(
            API_URL + "?t=" + Date.now()
        );


        const daten = await antwort.json();



        // Gruppe A

        zeigeTabelle(
            daten.gruppeA,
            "gruppeA"
        );



        // Gruppe B

        zeigeTabelle(
            daten.gruppeB,
            "gruppeB"
        );



        // Spielplan

        zeigeSpielplan(
            daten.spielplan,
            "spielplan"
        );

        zeigeKORunde(
            daten.koRunde,
            "koRunde"
        );


    } catch (fehler) {

        console.error(
            "Fehler beim Laden:",
            fehler
        );

    }

}



// =====================
// LIVE TABELLE
// =====================

function zeigeTabelle(daten, zielID) {

    let html = "";


    daten.forEach(zeile => {


        // leere Mannschaften entfernen

        if (
            !zeile[1] ||
            zeile[1].toString().trim() === ""
        ) {
            return;
        }



        html += `

        <tr>

            <td>${zeile[0] ?? ""}</td>

            <td>${zeile[1] ?? ""}</td>

            <td>${zeile[2] ?? ""}</td>

            <td>${zeile[3] ?? ""}</td>

            <td>${zeile[4] ?? ""}</td>

            <td>${zeile[5] ?? ""}</td>

            <td>${zeile[6] ?? ""}</td>

            <td>${zeile[7] ?? ""}</td>

            <td>${zeile[8] ?? ""}</td>

            <td>${zeile[9] ?? ""}</td>

            <td>${zeile[10] ?? ""}</td>

        </tr>

        `;

    });



    document
        .getElementById(zielID)
        .innerHTML = html;

}



// =====================
// SPIELPLAN
// =====================

function zeigeSpielplan(daten, zielID) {

    let html = "";


    daten.forEach(zeile => {


        // leere Spiele ausblenden

        if (
            !zeile[0] ||
            zeile[0].toString().trim() === ""
        ) {
            return;
        }



        let ergebnis = "";



        // Ergebnis aus Tore Heim : Tore Gast

        if (
            zeile[5] !== "" &&
            zeile[6] !== ""
        ) {

            ergebnis =
                zeile[5] +
                " : " +
                zeile[6];

        }



        html += `

        <tr>

            <td>${zeile[0] ?? ""}</td>

            <td>${zeile[1] ?? ""}</td>

            <td>${zeile[2] ?? ""}</td>

            <td>${zeile[3] ?? ""}</td>

            <td>${zeile[4] ?? ""}</td>

            <td>${ergebnis}</td>

            <td>${zeile[7] ?? ""}</td>

        </tr>

        `;


    });



    document
        .getElementById(zielID)
        .innerHTML = html;

}


// =====================
// Ko Runde
// =====================


function zeigeKORunde(daten, zielID) {

    let html = "";


    // Überschrift Halbfinale

    html += `
    <tr class="runde-titel">
        <td colspan="7">
            Halbfinale
        </td>
    </tr>
    `;



    daten.forEach((zeile, index) => {


        if (!zeile[0]) {
            return;
        }



        // Nach den beiden Halbfinalen
        // Überschrift Finale einfügen

        if (index === 2) {

            html += `
            <tr class="runde-titel">
                <td colspan="7">
                    Finale
                </td>
            </tr>
            `;

        }



        let ergebnis = "";


        if (
            zeile[8] !== "" &&
            zeile[9] !== ""
        ) {

            ergebnis =
                zeile[8] +
                " : " +
                zeile[9];

        }



        html += `

        <tr>

            <td>${zeile[0]}</td>

            <td>${zeile[4]}</td>

            <td>${zeile[5]}</td>

            <td>${zeile[6]}</td>

            <td>${zeile[7]}</td>

            <td>${ergebnis}</td>

            <td>${zeile[10] ?? ""}</td>

        </tr>

        `;


    });



    document
        .getElementById(zielID)
        .innerHTML = html;

}

// =====================
// START
// =====================


// sofort laden

ladeTabelle();


// automatisch aktualisieren

setInterval(
    ladeTabelle,
    AKTUALISIERUNG
);