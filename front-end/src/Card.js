import './main-styles.css';
export default function Card(props) {
    let card = props.cardData
    const CardContent = () => {
        if(card.isSelected) {
            return (
                <div className="card-description">
                    <div className="card-description-item">
                        <img src={card.src}></img>
                    </div>
                    <div className="card-description-item">
                        <p>{card.description}</p>
                    </div>
                </div>       
            )
        } else {
            return (
                <div className="flip-button" onClick={props.handleCardSelected}>
                    <div></div>
                </div>
            )
           
        }
    }


  return (
    <div className={`card ${card.isSelected ? "selected-card" : ""}`}>
        <div className="card-content">
            <CardContent/>
      </div>
    </div>
  );
}

