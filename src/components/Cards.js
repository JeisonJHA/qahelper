import React, { useState, useEffect } from 'react';
import { Icon, Card, Row, Col } from 'antd';

import CardItem from './CardItem';

const Cards = props => {
  const [cards, setCards] = useState(null);

  const { cards: cardss } = props;
  useEffect(() => {
    setCards(cardss);
  }, props);

  const remove = folder => {
    const filteredCards = cards.filter(card => {
      return card.folder !== folder;
    });
    setCards(filteredCards);
  };

  return (
    <div>
      {cards && (
        <Row gutter={16}>
          {cards.map(card => (
            <CardItem key={card.folder} card={card} remove={remove} />
          ))}
        </Row>
      )}
    </div>
  );
};

export default Cards;
