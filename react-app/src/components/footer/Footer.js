import React from 'react';
import Disclaimer from './Disclaimer';
import Product from './Product';
import Support from './Support';
import { FaGithub, FaAngellist, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  footer: {
    height: '20px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.8rem',
    marginTop: '1rem',
    paddingBottom: '40px',
    background: '#202225',
  },
  text: {
    color: 'lightgray',
    textAlign: 'center',
    margin: '0 15px 0 15px',
  },
  icons: {
    color: 'white',
    margin: '7px 10px 0 10px',
    marginBottom: '10px',
  },
  mainContainer: {
    display: 'grid',
    gridTemplateAreas: `
        "contributor product community"
        "contributor product community"
        "contributor product community"
        "contributor . ."
        "contributor . ."`,
    justifyContent: 'space-evenly',
    // borderTop: '1px solid #c9cccb',
    paddingTop: '14px',
    position: 'sticky',
    bottom: 0,
    background: '#202225',
    // boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    color: 'white',
    paddingBottom: '10px',
  },
});

function Footer() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainContainer}>
        <Disclaimer />
        <Product />
        <Support />
      </div>
      <div className="footer__bottom-container">
        {/* <a
                                    className="footer-github"
                                    href="https://github.com/corbinHA/Duke-and-Duke"
                                >
                                </a> */}
        <a href="https://github.com/corbinHA/Duke-and-Duke">
          <FaGithub className={classes.icons} />
        </a>
        <a href="https://www.linkedin.com/in/corbin-armendariz-88a111164/">
          <FaLinkedin className={classes.icons} />
        </a>
        <span className={classes.text}>Created by Corbin Armendariz ©2021</span>
        <a href="https://angel.co/u/corbin-hughes-armendariz">
          <FaAngellist className={classes.icons} />
        </a>
        <a href="mailto:corbinarmendariz@gmail.com">
          <FaEnvelope className={classes.icons} />
        </a>
      </div>
    </>
  );
}

export default Footer;
