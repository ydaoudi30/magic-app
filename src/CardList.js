import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import './styles.css';

const rarities = [
    { value: 'Common', className: 'rarity-common' },
    { value: 'Uncommon', className: 'rarity-uncommon' },
    { value: 'Rare', className: 'rarity-rare' },
    { value: 'Mythic Rare', className: 'rarity-mythic-rare' },
    { value: 'Special', className: 'rarity-special' },
    { value: 'Basic Land', className: 'rarity-basic-land' },
  ];
  
function CardList({ cards }) {
    function getRarityClass(rarity) {
        const selectedRarity = rarities.find((item) => item.value === rarity);
        return selectedRarity ? selectedRarity.value.toLowerCase().replace(' ', '-') : '';
      }

  return (
    <div className="card-list">
        {cards.map((card) => (
          <Card key={card.id} className={`item-card ${getRarityClass(card.rarity)}`}>
          <CardMedia
            component="img"
            src={card.imageUrl}
            alt={card.name}
            sx={{ maxWidth: '100%', maxHeight: '200px' }}
          />
          <CardContent>
            <Typography variant="h5" component="h2" color="text.secondary">
              {card.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className={getRarityClass(card.rarity)}>
              <span className="rarity">{card.rarity}</span>
            </Typography>
            <Typography variant="body2" component="h2" color="text.secondary">
              {card.type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {card.text}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CardList;
