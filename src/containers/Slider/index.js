import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // changement du comparateur < en > pour trier dans l'ordre décroissant
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  
  const nextCard = () => {
    setTimeout(
       // gére l'arrivée au bout du tableau
      () => setIndex(index < (byDateDesc?.length || 0)-1? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // modif de place de key
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
  
      {/* Afficher les Btn radio une seule fois */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={event.title}
              type="radio"
              name="radio-button"
               // index à la place de idx pour associer l'index au radioIdx
              checked={index === radioIdx}
               // ajout readOnly pour gérer erreur console : checked without onChange
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default Slider;