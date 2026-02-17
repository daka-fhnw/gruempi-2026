import { Link } from "wouter";

export default function Datenschutz() {
  return (
    <>
      <h1>Datenschutzerklärung</h1>
      <h2>Datenschutz</h2>
      <p>
        Die Betreiber dieser Webseite nehmen den Schutz Ihrer persönlichen Daten
        sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und
        entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
        Datenschutzerklärung.
      </p>
      <p>
        Die Nutzung dieser Webseite ist ohne Angabe personenbezogener Daten
        möglich. Soweit auf unseren Seiten personenbezogene Daten (z.B. Name
        oder E-Mail-Adresse) erhoben werden, erfolgt dies auf freiwilliger
        Basis. Die erhobenen Daten werden ausschliesslich im direkten
        Zusammenhang mit dem Grümpelturnier verwendet und somit niemandem
        ausserhalb zur Verfügung gestellt oder verkauft. Nach Durchführung des
        Grümpelturniers werden diese Daten vollständig gelöscht.
      </p>
      <h2>Cookies</h2>
      <p>Diese Webseite verwendet keine Cookies.</p>
      <h2>Hosting Provider & Server-Logfiles</h2>
      <p>
        Der Provider dieser Webseite erhebt und speichert automatisch
        Informationen in so genannten Server-Logfiles, die Ihr Browser
        automatisch übermittelt. Dies sind:
      </p>
      <ul>
        <li>IP-Adresse</li>
        <li>Browsertyp und Browserversion</li>
        <li>Verwendetes Betriebssystem</li>
        <li>Referrer-URL</li>
        <li>Hostname des zugreifenden Rechners</li>
        <li>Uhrzeit der Serveranfrage</li>
      </ul>
      <p>
        Diese Daten sind nicht direkt bestimmten Personen zuordenbar. Eine
        Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
        vorgenommen.
      </p>
      <h2>SSL-Verschlüsselung</h2>
      <p>
        Diese Webseite nutzt aus Gründen der Sicherheit und zum Schutz der
        Übertragung vertraulicher Inhalte, wie zum Beispiel Daten von Ihnen, die
        Sie an uns senden, eine SSL-Verschlüsselung. Eine verschlüsselte
        Verbindung erkennen Sie daran, dass die Adresszeile des Browsers mit
        "https://" beginnt und am Schloss-Symbol in Ihrer Browserzeile. Dank der
        SSL-Verschlüsselung können die Daten, die Sie an uns übermitteln, nicht
        von Dritten mitgelesen werden.
      </p>
      <h2>Recht auf Auskunft und Löschung</h2>
      <p>
        Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre
        gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und
        den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder
        Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
        personenbezogene Daten können Sie sich jederzeit über die im{" "}
        <Link to="/impressum">Impressum</Link> angegebene Email-Adresse an uns
        wenden.
      </p>
    </>
  );
}
