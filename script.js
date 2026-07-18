// =====================
// EINSTELLUNGEN
// =====================

const API_URL = "https://script.google.com/macros/s/AKfycbwOAshkRev1wU_-KG4WwTSSYNQxc_I3xk9OaJO0INZ-6bXPSPRxEuZtUr9g49SSQ-cP/exec";

const AKTUALISIERUNG = 5000;



// =====================
// DATEN LADEN
// =====================

async function ladeTabelle() {

    try {

        const antwort = await fetch(
            API_URL + "?t=" + Date.now()
        );


        const daten = await antwort.json();


        zeigeTabelle(
            daten.gruppeA,
            "gruppeA"
        );


        zeigeTabelle(
            daten.gruppeB,
            "gruppeB"
        );


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
// GRUPPENTABELLE
// =====================

function zeigeTabelle(daten, zielID) {


    let html = "";


    daten.forEach(zeile => {


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

            <td>${zeile[6] ?? ""} : ${zeile[7] ?? ""}</td>

            <td>${zeile[8] ?? ""}</td>

            <td>${zeile[10] ?? ""}</td>

        </tr>

        `;


    });



    document
        .getElementById(zielID)
        .innerHTML = html;

}




// =====================
// ERGEBNIS FORMATIEREN
// =====================

function erstelleErgebnis(heim, gast) {


    if (
        heim === "" ||
        gast === "" ||
        heim == null ||
        gast == null
    ) {

        return "";

    }



    if(Number(heim) > Number(gast)) {


        return `
        <b>${heim}</b> : ${gast}
        `;


    }


    if(Number(gast) > Number(heim)) {


        return `
        ${heim} : <b>${gast}</b>
        `;


    }


    return `${heim} : ${gast}`;

}




// =====================
// SPIELPLAN
// =====================

function zeigeSpielplan(daten, zielID) {


    let html = "";


    daten.forEach(zeile => {


        if(!zeile[0]) return;



        let ergebnis =
            erstelleErgebnis(
                zeile[5],
                zeile[6]
            );



        html += `

        <tr>

            <td>${zeile[0]}</td>

            <td>${zeile[1]}</td>

            <td>${zeile[2]}</td>

            <td>${zeile[3]}</td>

            <td>${zeile[4]}</td>

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
// K.O.-RUNDE
// =====================

function zeigeKORunde(daten, zielID) {


    let html = "";



    function koErgebnis(zeile) {


        let ergebnis =
            erstelleErgebnis(
                zeile[8],
                zeile[9]
            );



        if(
            zeile[10] &&
            zeile[10].toString().trim() !== ""
        ) {

            ergebnis += 
            `<br><small>${zeile[10]}</small>`;

        }


        return ergebnis;

    }





    function zeigeSpiel(zeile) {


        return `

        <tr>

            <td>${zeile[0] ?? ""}</td>

            <td>${zeile[4] ?? ""}</td>

            <td>${zeile[5] ?? ""}</td>

            <td>${zeile[6] ?? ""}</td>

            <td>${zeile[7] ?? ""}</td>

            <td>${koErgebnis(zeile)}</td>

        </tr>

        `;

    }




    // =====================
    // HALBFINALE
    // =====================

    html += `

    <tr class="runde-titel">

        <td colspan="6">
            Halbfinale
        </td>

    </tr>

    `;



    if(daten[0]) {

        html += zeigeSpiel(daten[0]);

    }


    if(daten[1]) {

        html += zeigeSpiel(daten[1]);

    }





    // =====================
    // SPIEL UM PLATZ 3
    // =====================

    html += `

    <tr class="runde-titel">

        <td colspan="6">
            Spiel um Platz 3
        </td>

    </tr>

    `;



    if(daten[2]) {

        html += zeigeSpiel(daten[2]);

    }





    // =====================
    // FINALE
    // =====================

    html += `

    <tr class="runde-titel">

        <td colspan="6">
            Finale
        </td>

    </tr>

    `;



    if(daten[3]) {

        html += zeigeSpiel(daten[3]);

    }





    document
        .getElementById(zielID)
        .innerHTML = html;

}





// =====================
// START
// =====================

ladeTabelle();


setInterval(
    ladeTabelle,
    AKTUALISIERUNG
);