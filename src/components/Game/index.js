import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, Hidden } from '@material-ui/core';
import Card from './Card';
import Menu from './Menu';
import cards from './cards';
import shuffle from '../../utils/shuffle';

function MemoryGame() {
  const successAudio = new Audio('/sounds/success.mp3');
  const flipAudio = new Audio('/sounds/woosh.mp3');
  const matchAudio = new Audio('/sounds/glass.mp3');

  const [cardsShuffle, setCardsShuffle] = useState(() => shuffle(cards));
  const [activeCards, setActiveCards] = useState([]);
  const [activeTemporary, setActiveTemporary] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [endGame, setEndGame] = useState(false);

  const resetGame = () => {
    setActiveCards([]);
    setActiveTemporary([]);
    setAttempts(0);
    setEndGame(false);
    setTimeout(() => {
      setCardsShuffle(shuffle(cards));
    }, 1500);
  };

  const renderAttemptsLine = () => {
    return (
      <Typography style={{ marginTop: 10 }}>
        <strong>Attempts: </strong>
        {attempts}
      </Typography>
    );
  };

  const renderLinePoints = () => {
    return (
      <Typography>
        <strong>Points: </strong>
        {`${activeCards?.length / 2} / ${cards?.length / 2}`}
      </Typography>
    );
  };

  const isFinished = (id) => {
    return activeCards.findIndex((c) => c.id === id) !== -1;
  };

  const findIndexActiveTemporary = (id) => {
    return activeTemporary.findIndex((c) => c.id === id);
  };

  const isActiveTemporary = (id) => {
    return findIndexActiveTemporary(id) !== -1;
  };

  const isActive = (id) => {
    return isFinished(id) || isActiveTemporary(id);
  };

  const setActive = (card) => {
    if (isActive(card?.id) || activeTemporary?.length === 2) return;

    flipAudio.play();

    const list = Object.assign([], activeTemporary);
    list.push(card);

    setActiveTemporary(list);
  };

  const match = () => {
    setAttempts(attempts + 1);

    const list = Object.assign([], activeCards);

    const card1 = activeTemporary[0];
    const card2 = activeTemporary[1];

    if (card1?.icon === card2?.icon) {
      list.push(card1);
      list.push(card2);
      matchAudio.play();
      setActiveCards(list);
      setActiveTemporary([]);
    } else {
      setActiveCards(list);
      setTimeout(() => {
        setActiveTemporary([]);
      }, 1000);
    }
  };

  useEffect(() => {
    if (activeTemporary?.length === 2) match();
  }, [activeTemporary]);

  useEffect(() => {
    if (activeCards.length === cards.length) {
      successAudio.play();
      setEndGame(true);
    }
  }, [activeCards]);

  const renderCards = () => {
    return (
      <Grid spacing={2} container item md={8}>
        {cardsShuffle?.map((card) => (
          <Grid key={card.id} item xs={4} sm={3} md={3} lg={2}>
            <Card
              endGame={endGame}
              isActive={() => isActive(card?.id)}
              setActive={() => setActive(card)}
              card={card}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderMenu = () => {
    return (
      <Grid item sm={8} md={4}>
        <Menu
          resetGame={resetGame}
          isFinished={isFinished}
          renderAttemptsLine={renderAttemptsLine}
          renderLinePoints={renderLinePoints}
          cards={cards}
        />
      </Grid>
    );
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        <Container
          style={{
            padding: '15px 30px',
          }}
          maxWidth="lg"
        >
          <Grid justify="center" spacing={5} container>
            <Hidden smDown>
              {renderCards()}
              {renderMenu()}
            </Hidden>
            <Hidden mdUp>
              {renderMenu()}
              {renderCards()}
            </Hidden>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default MemoryGame;
