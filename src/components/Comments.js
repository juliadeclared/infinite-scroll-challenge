import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Comments({ comments }) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {comments.map((comment) => (
        <>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={comment.commenter.full_name}
                src={comment.commenter.image_small_url}
              />
            </ListItemAvatar>
            <ListItemText
              primary={comment.text}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {`@${comment.commenter.username}`}
                  </Typography>
                  {`—${comment.created_at.slice(0, -7)}`}
                </>
              }
            />
          </ListItem>
        </>
      ))}
    </List>
  );
}
