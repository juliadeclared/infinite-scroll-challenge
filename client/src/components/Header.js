import { useRef } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';

import { InputBase, Toolbar } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const logoVariants = {
  hidden: {
    opacity: 0,
    y: '-100vh',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
    },
  },
};

const searchVariants = {
  hidden: {
    opacity: 0,
    x: '100vh',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      delay: 1
    },
  },
};

export default function Header({ setSearchTerm }) {
  const classes = useStyles();
  const searchRef = useRef();

  return (
    <div className="header">
      <Toolbar>
        <div>
          <motion.img
            src={process.env.PUBLIC_URL + '/logo.png'}
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            alt="logo"
            className="logo"
            onClick={() => window.location.reload()}
          />
        </div>

        <motion.div
          variants={searchVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>

            <InputBase
              placeholder="Search…"
              inputRef={searchRef}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={() => setSearchTerm(searchRef.current.value)}
            />
          </div>
        </motion.div>
      </Toolbar>
    </div>
  );
}
