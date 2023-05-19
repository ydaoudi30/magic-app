import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import defaultImage from '../assets/magic.jpeg'
import noresults from '../assets/noresults.jpg'

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
    <>
      <div className="card-list">
        {cards.map((card) => (
          <Card key={card.id} className={`item-card ${getRarityClass(card.rarity)}`}>
          <CardMedia
            component="img"
            src={card.imageUrl || defaultImage}
            sx={{ maxWidth: '100%', maxHeight: '160px' }}
          />
          <CardContent>
            <Typography variant="h5" component="h2" color="text.secondary">
              <span className="name">{card.name}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary" className={getRarityClass(card.rarity)}>
              <span className="rarity">{card.rarity}</span>
            </Typography>
            <Typography variant="body2" component="h2" color="text.secondary">
              <span className="type">{card.type}</span>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <span className="description">{card.text}</span>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
      {cards.length ==0 && 
      <div className="card-list">
        <Card className="item-card">
        <CardMedia
          component="img"
          src={noresults}
          sx={{ maxWidth: '100%', maxHeight: '160px' }}
        />
        <CardContent>
          <Typography variant="h5" component="h2" color="text.secondary">
            <span className="name">No results</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" >
            <span className="joke">Ultra rare</span>
          </Typography>
          <Typography variant="body2" component="h2" color="text.secondary">
            <span className="type">Joke</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span className="description">Aucun resultat ne correspond à votre recherche ...</span>
          </Typography>
        </CardContent>
      </Card>
      </div>
        
      }
    </>
    
  );
}

export default CardList;
