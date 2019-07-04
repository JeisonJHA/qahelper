import React from 'react';
import { Icon, Card, Col } from 'antd';

import styles from './CardItem.css';

const CardItem = props => {
  const { card, remove } = props;
  return (
    <Col span={3}>
      <Card
        extra={
          <div>
            {/* style={{ minWidth: 200, marginTop: 16 }}*/}
            <button
              className={styles.card_button}
              type="button"
              title="Baixar versão"
            >
              <Icon type="download" />
            </button>
            <button
              className={styles.card_button}
              type="button"
              title="Remover item"
              onClick={() => remove(card.folder)}
            >
              <Icon type="close-circle" />
            </button>
          </div>
        }
        title={card.folder}
      >
        {new Date(Date.parse(card.birthtime)).toLocaleString()}
      </Card>
    </Col>
  );
};

export default CardItem;
