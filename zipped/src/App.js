import React, {useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import './firebase';
import { auth, db } from './firebase';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';


function getModalStyle() {
  //const top = '50%';
  //const left = '50%';

  return {
    //top: '${top}%',
   // left: '${left}%',
   // transform: 'translate(-${top}%, -${left}%)',
  };
}
  const useStyles = makeStyles((theme) => ({
    paper:{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width:400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    
  },
  }));

function App() 
{
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);   
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(null);


  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id, 
        post: doc.data()
      })))
    })
  },[]);

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password).then((authUser) => {
       return authUser.user.updateProfile({
        displayName : username
      }) 
    }).catch((error) => alert(error.message))

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message));
    setOpenSignIn(false);
  }

  return (
    <div className="app">

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app_signUp">
                <img
                  className="app_headerImage"
                  src="data:image/png;base64,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"
                  alt=""
                />
                <Input
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              <Button type="submit" onClick={signIn}>Sign In</Button>
            </form>
          </div>
      </Modal>

      <Modal
        open={open}
        onClose={() => setOpenSignIn(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app_signUp">
                <img
                  className="app_headerImage"
                  src="data:image/png;base64,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"
                  alt=""
                />
                 <Input
                    placeholder="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  /> 
                <Input
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </form>
          </div>
      </Modal>

      <div className ="app_header">
        <img
          className="app_headerImage"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEX///9mtjFktS1jtStbshphtCdesyFfsyRZsRT1+vL5/Pdcshzv9+rI47n+//1YsRCLxmjc7dLj8dvo8+F4vkx0vEbU6ciHxGKSyXK/3q1wuj+02Z+BwlqOx2yYzHrt9ueo04+dzoHE4bS426V+wFbQ58O12qGi0IjR58XZ686u1peczn9suTpEqgAkIe1+AAAK80lEQVR4nO1d2XayOhRuBgKIivM8tdVah/P+r3dIQkICQe1q/Ulc+a6q5SLbnT0PvL15eHh4eHh4eHh4eHh4eHh4eHh4vBBap6ZP8Gys0k3TR3gyAMAfTZ/hqegmAAbtpk/xTLRTAIJe06d4Jk4YABAdmj7GE/GRZBRC0G36HM/DJcgoBOTc9DmehxGkFILkZZVNGzMCQTBr+iTPQodwCkHUb/ooT0IP5RSifdNHeQ5ipmcYlfg1Lcac2go0pRTCa9OHeQquVJOSzi4EL+qefjNNGg2o6/aaTNwj5tC03tboNZk4iZieyfzuCWUmXLyc7zZm/gz5fMsF8uWYuEyYJUyH2d9fhDGx6SP9LYbcnYEj+mHLPuBO04f6U+y5O0OW7NMUSWpfBTt+R0HKo4oO+4hfKPH2neb+6JR/zv23abOn+kMMCY8LAZ7k38yQVDuvgNYijyngWHx1YNc0PDZ5rD/EKsiDpkJ7tngsHLaaPNefoSfiXqQoT+a5gWTe3LH+DhtBIIgmxbcs6/YaBuOIBYHBWvm6zbUrdj+dURAIIi3DtmDqNXC+UPNeEIi/tP+cQ85Yx3XNLJEElpNPfU574rZzKrUoZVYpC9xC7JqiVTNH+xO0VgqB1XLMirsBadzE2f4E7XFYEIh3lf9/cfqJsyZxGKCCwHBdfSAXRGfd70kEFRk0GfY4/wUiN6/pHCsEooXRJORBsZva9BgBhcCrmUtHLqfIxULUNFEJBDXVwk7+1NW5tGJ7oShRENRw8O1tkDM6GvzT4/0efagoURCOat2yVs5DlkJ1CJ1E0TGATG/4nXnN2zF7sUwV+gC+GTrMkIOCuMEKfTBd3nx4l8srdichpXmiAJHv249/5ILojkXUlWg4vseaSc7w0JX+Gs0TBXhW1jGtRcksCHPhiqo5qUoUplUTMExLQXBbaqV/dMTfoZMqBIZXgxUf4Kh0bwWFxAVlOlc90ahyQylOOCkVRYVeSrb/5Iy/gkogxOagtpOEO/2bq6DQfr9trth54w1lD5Fy7nAsCjbWZ01VAtNNnVCdQ1QK9XO3DSR3DGfj6BRXFN3oP3gPyjyUFFpu8ieFpxYublj5PSrLoaTQ7raMrZLWnt1Q+92okldbOEFh6yo8GZOVV3DCRQk4h7CgdlM4Fb4oIrc1YhZJkFI+Q8iv1XK4FCmZcHyneXsBy9XCWKjgxOJu04EgkKzuFJH6UaVsLzxvq+3hOBfCxJDU1rEJQFTqn5FKGNvr03yJZNLdnGccAljOVsylX2ptkB9HjxL4diagbA0zF0BccWsT++9cj4b3Z7XiAIK0HEGsRJtN8Jzj/R75gAiqT4lK7AjrndXQFSy0tyOD58pgeH/Gh9qFyhSJVKXB5Tnn+zVakPkk6QMdhlNkKGdLRWNt0ptXVsjugScjk81bC3ev7MxZAzbj80gvcxuZhrlaQLilZWfOFrQCesLogd+fdu5VqTgJe29twzerw1cUpAG0Pzj5qnx9FC67tX1Rn1RRPFD7o0KIDPYACBBbIwvqkTzQ79OnNsHQDDyRdWJsqRgyj+R+6Dqk0mq4o4UmNfHXDtBU4N2Gpi21mYGB0zI2tLgus4D33a0tLdZAYPgddrJMZW87e8bD4E4nOu/RNw39tkJhDO11SqnBD2/XePucQJNPtpSlVGtdNp5Zutl1x3sWyLvhX7lLyy6ptbEhHZm4+fufmS4JjfZkJ1lo82h+bIjaFcxwfey4Lcr9FqdoMhqC+vJ0e8SIqGlpk3P5lrcIDzCIaqL7CWI0QGQsfR6U/n1bAyeOI6kRxDOP3mG5qs3BgxIHWJhhTwLDLYxX3OWExCxjvUCyMLU4FczQXaVVSZxATgEMzAR+FnfUZkUqsKxkaXZ5dzBCZgL7Su9pZGtUoaKkanIdSgk091fEoGhKIbddIivRwbkdCK417BkXfVNobH7EYnRnIgMa7mvMSE+dwbDZ2BsxuIrjJ+uaavdF6V3Ezt3RTzmAEJmcbYp3RcsEjrTrSbTWMjlY2ze7UQiEyN6YwogBKsr5dY6YOskGUseEcC5ngGo7avT+4cjWDKIZ3YtsikrqevOHi0AhEFubfTIiHhXT2ruaZw5E6x+uU0V2oi8PD2v3sezU9lqAba0XmvEhE5/BtUYEhyN1DurOEIZ1OEsRrB2P+dRuqGtXtJhGrxPB4V4dMsmec0vJrMX1gzXqv7uLNAbC1K2x36lQonUi+EFCjYH3uvssQ1cSWCOCh7E2x5Y9N3Ih5C0gCcTG8sVhhHX6YHR0Ya6iwJqIg5uKiJ0R1gQwu8nE4h5LE0SggAwZte78WuJf9jv0HNvxcRZzZ6NKFNQ+k5L8ZRIIHGOgHECoRvPD95CUyAMI7xxj4NsgZ1JFxwzWOKzS17O2zFuHbp4SLEfzk1WKyvTBaO+UDeSY8liv5MccFlGVPjyyu/ZiBs/LQz1d0RmX1Wf2SLJwK5bPMeSLyDQH7GCgDxA0d8vEC/B9wOqI+WkfVekLk7NrCjQHu6OQFAQOe1X9AlD67li6UKLNNuQGksDWzkRfNHXOQEhsqL0rPLXDtWLfsxs8dlGB5hjQtIwcfonXBgUTurvcioJuAE6FCTiEQYU+lF5cFUCGU6oUjS5p1QLivWPp+jIyFpI8GdgeVSUwDJy+oG9sCASNuBXvhwYXbeZWlsKAWSCWyXSqNj5ErsWAVWS2ME9ZzNMyfTcG8R3CmeSdbNoWDM5A6D4DM2TOGhO0ToVAvHbaRAicMH/bVr9MIMSyv607nHQ+PjrfAye97veQvTGtDUtKJgS5DeyfVzjCCQVOF5eOc3xN2FoWuWFd3lCeJ4y/UKRaEBgkac8t4TxFjIW9Uqop3dF/tnbVFBtNQi2sXpdQwpEVxuZ6sSx/mUoHGujjIjp25x0PI/pyiljXMjxZ05pVlKvySLpxROu0UtrQe9HuKAypjhmCSo5UQwjd8Mb7dHXJVvNleKh/0HL4ZUXL2eiENB5oG9NO5RYMKYFyjRlEBNOAmESk4pRHLrTpddLMnl/VrXMsnyj8G5QE63m/HWcYzKekrHhcIPEwLnkzLNT/5t8E6fRb1SftZbl+EdkfOcaZrViqDbCUKwOWp0HppdLz3D2W4qtH5vabx1TpYaZRRsz0CjanDk9QF8fQBSduUbAloeelJRpUm1rbAo2Lwd0dNs1DabRnb4ih/k1wrV96uNVzjQ68zLktk4dsPLmd0O1JtyL7iebrWLtaoEBbKhq2ymIdAHLn5r1rGtX+FwJKHjIW9jEI77Wjx0jzd6yfsJByyJRLD6H776E860y03kEVupS+sWGbAPP0nYa2Jon2zt4L5PaQvRXniySPjGFPVaNo/xtkxSuMaBPsPnhIquaah5raHirmO+TY6Gj62Fs2B1pOwHpBzF9hRDc5xulj6/C7WkRp/bZZWrgAfJNj/N+DLy8EGoXWd5+cImksTg860iPVItq9qZSBrW/+0bsn96oytXmPZ44O2w71k8k6jYc27/EUYGOuyQ+UviaHFu/5kGC7AH8gTpoutd/iUyxx9VV/N9BX7aH9XhvDjPxkEaCa2rHf4OeYJj+Ig1RFY/0aDIljGlTWrdZAi/LLi4QtRn/26HanscLC0K2xvMegDuAbt5q5jos23eyImvkBBmpfGLJ+F82P0dqorbXJwoF3yfwQStsUDJPzCzRMVbCJSIAgCgi+7pzv6DNj+Dnbj1aXz8Er8s/Dw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8Ni/A/8R3a6ROcPeAAAAABJRU5ErkJggg=="
          alt=""

        />
      </div>

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        
      <div className='app_loginContainer'>

      <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      </div>
      )}
      <h1>🍀ZIPPED🍀</h1>

      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>        
          ))
      } 
      
    </div>
  );
}

export default App;
