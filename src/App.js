import "./App.css";
import { useState, useEffect } from "react";

function App() {
  /**
   * PRATIQUE 2
   */
  const [tirage, setTirage] = useState(0);
  const [historiqueTirage, setHistorique] = useState([]);
  function generateNumber(max) {
    const newTirage = Math.floor(Math.random() * max + 1);
    if (historiqueTirage.includes(newTirage)) {
      generateNumber(max);
    } else {
      setTirage(newTirage);
      setHistorique([...historiqueTirage, newTirage]);
    }
  }

  /**
   * PRATIQUE 3
   */
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);

  function getText(e) {
    setMessage(e.target.value);
  }

  function addToList() {
    setList([...list, message]);
    setMessage("");
  }
  // Effet de bord au premier rendu du composant, pour charger la liste locale
  useEffect(() => {
    // Récupération de la liste locale
    const localList = JSON.parse(localStorage.getItem("@localList"));
    if (localList) {
      // Injetcter la liste locale dans la liste de travail
      setList(localList);
    }
  }, []);

  // Effet de bord lors de la modification de la liste
  useEffect(() => {
    //   console.log("La valeur de list a changé");
    if (list.length > 0) {
      localStorage.setItem("@localList", JSON.stringify(list));
    }
  }, [list]);

  //
  return (
    <div className="App">
      <section className="pratique2">
        <hr />
        <h2>PRATIQUE 2</h2>
        <button onClick={() => generateNumber(90)}>Tirer au sort</button>
        <h2>{tirage}</h2>
        <hr />
        <h3>HISTORIQUE DES TIRAGES</h3>
        <div className="displayHistory">
          {historiqueTirage.map((value, index) => (
            <div>
              <span>
                Tirage {index + 1} : numéro {value} !
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="pratique3">
        <hr />
        <h2>PRATIQUE 3</h2>
        <input type="text" onChange={getText} value={message}></input>
        <button onClick={addToList}>Add to list</button>
        <hr />
        <h3>AFFICHAGE DU TABLEAU</h3>
        <div className="displayList">
          {list.map((mot, key) => (
            <div>{mot}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
