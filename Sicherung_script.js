  

// Globale Variable für den Laufbalken
  let laufbalken = null;

  // Funktion zum Aufrufen der Monatsansicht beim Laden der Seite
window.onload = function() {
    createZeitansicht(0); // Übergeben Sie 0 als anfängliche Gesamtlaufzeit
  }

function calculateGesamtlaenge() {
    let totalAmount = +gesamtmenge.value;
    let length = +laenge.value;
    let result = totalAmount * length / 1000;
    gesamtlaenge.value = roundToTwo(result) + '  Gesamtmenge in meter';
    return result;
  }
  
  function calculateLeistungProStunde() {

    let items = +kavität.value;
    let speed = +laufgeschwindigkeit.value.replace(",", ".");
    let result = items * speed * 60;
    leistungProStunde.value = roundToTwo(result) + ' m/h Leistung';
    return result;
  }
  
  function calculateGesamtlaufzeit() {
        let gesamtlaengeValue = calculateGesamtlaenge();
    let leistungValue = calculateLeistungProStunde();
    let result = gesamtlaengeValue / leistungValue;
    gesamtlafzeit.value = roundToTwo(result) + ' Stunden Gesamtlaufzeit';
    let laufzeitInTagen = result / 24;
    gesamtlafzeitInTagen.value = roundToTwo(laufzeitInTagen) + ' Laufzeit in Tagen';
    createZeitansicht(result);
  }
  
 let laufbalkenListe = []; // Array für die gespeicherten Laufbalken

function resetData() {
    gesamtmenge.value = "";
    laenge.value = "";
    kavität.value = "";
    laufgeschwindigkeit.value = "";
    leistungProStunde.value = "";
    gesamtlafzeit.value = "";
    gesamtlaenge.value = "";
    gesamtlafzeitInTagen.value = "";
  
    // Alle gespeicherten Laufbalken aus dem DOM entfernen
    laufbalkenListe.forEach((laufbalken) => {
      const zeitansicht = document.querySelector('.zeitansicht');
      zeitansicht.removeChild(laufbalken);
    });
  
    // Liste der Laufbalken zurücksetzen
    laufbalkenListe = [];
  }
    
  
  // Funktion zum Abrunden von Dezimalstellen 
  function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
  }
  


  // Funktion zur Formatierung des Datums (z.B. "13.05.")
  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.`;
  }
  




  function createZeitansicht(gesamtlaufzeit) {
    const zeitansicht = document.querySelector('.zeitansicht');
    const kopfbereich = document.querySelector('.kopfbereich');
    const tageContainer = document.querySelector('.tage-container');
    
    // Entferne vorhandene Elemente aus Kopfbereich und Tage-Container
    kopfbereich.innerHTML = "";
    tageContainer.innerHTML = "";
    
    const startDate = new Date(); // Heutiges Datum
    const endDate = new Date();
    
    if (gesamtlaufzeit <= 48) {
      endDate.setDate(startDate.getDate() + 3); // 1 Tage von heute
      }
      if (gesamtlaufzeit > 48 & gesamtlaufzeit <= 168) {
      endDate.setDate(startDate.getDate() + 7); // 7 Tage von heute
      } if (gesamtlaufzeit > 168 & gesamtlaufzeit < 336) {
        endDate.setDate(startDate.getDate() + 14); // 14 Tage von heute
      } if (gesamtlaufzeit > 336){
        endDate.setDate(startDate.getDate() + 31); // 31 Tage von heute
      } 
    
    const totalDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)); // Gesamtzahl der Tage
    
    for (let i = 0; i < totalDays; i++) {
      const tag = document.createElement('div');
      tag.classList.add('tag');
      tag.innerHTML = formatDate(startDate);
      kopfbereich.appendChild(tag);
    
      const tagesContainer = document.createElement('div');
      tagesContainer.classList.add('tag-container');
      tageContainer.appendChild(tagesContainer);
    
      startDate.setDate(startDate.getDate() + 1);
    }
    
    
    if (gesamtmenge.value !== "") {
      // Erstelle den Laufbalken mit dem Wert der Gesamtmenge
      const laufbalken = document.createElement('div');
      laufbalken.classList.add('laufbalken');
      if (gesamtlaufzeit <= 48) {
        laufbalken.style.width = `${(gesamtlaufzeit / 72) * 100}%`; // Annahme: Gesamtlaufzeit in Tagen ( 24 * 3 Tag)
      } if (gesamtlaufzeit > 48 & gesamtlaufzeit <= 168) {
        laufbalken.style.width = `${(gesamtlaufzeit / 168) * 100}%`; // Annahme: Gesamtlaufzeit in Tagen ( 24 * 7  Tage)
      } if (gesamtlaufzeit > 168 & gesamtlaufzeit < 336) {
         laufbalken.style.width = `${(gesamtlaufzeit / 336) * 100}%`; // Annahme: Gesamtlaufzeit in Tagen ( 24 * 14  Tage)
      } if (gesamtlaufzeit > 336) {
        laufbalken.style.width = `${(gesamtlaufzeit / 744) * 100}%`; // Annahme: Gesamtlaufzeit in Tagen ( 24 * 31 Tage)
      } 
     
    
      const gesamtmengeInfo = document.createElement('div');
      gesamtmengeInfo.classList.add('gesamtmenge-info');
      gesamtmengeInfo.innerText = `${gesamtmenge.value} Stück`;
      
      if (gesamtlaufzeit > 3 && gesamtlaufzeit < 6) {
        gesamtmengeInfo.classList.add('mittlere-schrift'); // Klasse für mittlere Schriftgröße hinzufügen
      }
      if (gesamtlaufzeit < 3) {
        gesamtmengeInfo.classList.add('kleine-schrift'); // Klasse für kleinere Schriftgröße hinzufügen
      }
      laufbalken.appendChild(gesamtmengeInfo);
    
      // Füge den Laufbalken dem DOM hinzu
      zeitansicht.appendChild(laufbalken);
    
    // Füge den Laufbalken zur Liste der gespeicherten Laufbalken hinzu
    laufbalkenListe.push(laufbalken);
    }
    }
    