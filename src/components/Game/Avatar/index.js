import React from 'react';
import Close from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  absoluteX: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 15,
    background: theme.palette.dark.main,
    top: 0,
    right: -4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function FAvatar({ card, isFinished }) {
  const final = isFinished();
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div style={{ padding: 5 }}>
      <div
        className={classes.avatar}
        style={{
          background: card?.color,
          border: final
            ? `3px solid ${theme.palette.dark.main}`
            : '3px solid transparent',
        }}
      >
        <card.icon style={{ color: '#fff', fontSize: 15 }} />
        {final && (
          <div className={classes.absoluteX}>
            <Close style={{ color: '#fff', fontSize: 10 }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FAvatar;
