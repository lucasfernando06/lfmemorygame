import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '../Avatar';

const useStyles = makeStyles((theme) => ({
  menu: {
    marginTop: 10,
    padding: 20,
    fontSize: 12,
  },
  topMenu: {
    borderRadius: 70,
    width: 70,
    height: 70,
    background: theme.palette.dark.main,
    marginTop: -35,
    marginRight: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuScore: {
    borderRadius: 20,
    background: theme.palette.dark.main,
    color: '#fff',
    padding: 20,
    marginTop: 15,
  },
  avatarContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 25,
  },
  button: {
    height: 40,
    color: '#fff',
    marginTop: 20,
    width: '100%',
    background: theme.palette.secondary.main,
    fontWeight: 'bold',
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
}));

function Menu({
  resetGame,
  renderLinePoints,
  renderAttemptsLine,
  cards,
  isFinished,
}) {
  const classes = useStyles();

  const returnDistinct = (array) => {
    return array.filter(
      (thing, index, self) =>
        self.findIndex((t) => t.icon === thing.icon) === index,
    );
  };

  return (
    <div className={classes.menu}>
      <div style={{ display: 'flex' }}>
        <div className={classes.topMenu}>
          <img style={{ width: 55 }} alt="Logo" src="/lflogo.png" />
        </div>
        <Typography
          style={{
            fontWeight: 700,
          }}
        >
          MEMORY GAME
        </Typography>
      </div>
      <div className={classes.menuScore}>
        {renderLinePoints()}
        {renderAttemptsLine()}
        <Button className={classes.button} onClick={() => resetGame()}>
          Play again
        </Button>
      </div>
      <div className={classes.avatarContainer}>
        {cards &&
          returnDistinct(cards).map((card) => (
            <Avatar
              key={card.id}
              isFinished={() => isFinished(card.id)}
              card={card}
            />
          ))}
      </div>
    </div>
  );
}

export default Menu;
