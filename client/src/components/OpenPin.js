import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  Avatar,
  IconButton,
} from '@material-ui/core';

import {
  Favorite,
  OpenInBrowserRounded,
  ExpandMore,
  CloseRounded,
} from '@material-ui/icons';

import Cursor from './Cursor';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 450,
    borderRadius: '24px',
    overflow: 'scroll',
  },
  media: {
    minWidth: 450,
    minHeight: 200,
    paddingTop: '56.25%',
    overflow: 'scroll',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    overflow: 'scroll',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    overflow: 'scroll',
  },
  avatar: {
    backgroundColor: '#222',
  },
  iconContainer: {
    '&:hover $icon': {
      color: '#1db954',
    },
  },
  icon: {
    color: 'default',
  },
}));

export default function OpenPin({ pin, show, setShow }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Modal
      open={show}
      onBackdropClick={() => setShow(!show)}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8%',
      }}
    >
      <Card className={classes.root}>
        <Cursor />;
        <CardHeader
          avatar={
            <Avatar aria-label="pin" className={classes.avatar}>
              {pin.pinner.full_name[0]}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              classes={{
                root: classes.iconContainer,
              }}
              onClick={() => setShow(!show)}
            >
              <CloseRounded className={classes.icon} />
            </IconButton>
          }
          title={pin.pinner.full_name}
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={pin.images.orig.url}
          title={pin.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {pin.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="like"
            classes={{
              root: classes.iconContainer,
            }}
          >
            <Favorite className={classes.icon} />
          </IconButton>
          <Typography>{pin.like_count}</Typography>

          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show comments"
            disabled={pin.comment_count === 0}
            classes={{
              root: classes.iconContainer,
            }}
          >
            <ExpandMore className={classes.icon} />
          </IconButton>
          <Typography>{pin.comment_count} Comments </Typography>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {pin.comments.data.map((comment) => (
              <Typography paragraph key={comment.id}>
                {comment.text}
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </Modal>
  );
}
