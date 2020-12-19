/* eslint-disable no-unused-vars */
import React from 'react'
import { Grid, Container } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Image, Button, Card } from 'semantic-ui-react'
import { firebaseDB } from '../../firebase'
import { connect, useDispatch } from 'react-redux';
import axios from 'axios'
import { getPics } from '../actions'


const UpoadedPics = ({ pics, token }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [images, setImages] = React.useState([]);



  React.useEffect(() => {
    const getImages = async () => {
      const firebaseDBRef = firebaseDB.ref('users')
      firebaseDBRef.on('value', snapshot => {
        const list = [];
        const imagesList = snapshot.val();
        for (let id in imagesList) {
          let data = {
            id: imagesList[id]['id'],
            url: imagesList[id]['url'],
          }
          list.push(data);
        }
        setImages(list)
      })
    };
    getImages();
  }, []);

  return (
    <Container>
      <Button primary content="Back" onClick={() => history.push('/')} style={{ marginBottom: 20 }} />
      <Grid item container spacing={2}>
        {images.map((pic, i) => (
          <Grid item xs={12} sm={6} md={4} key={i.toString()}>
            <Image src={pic.url} size='medium' bordered />

          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

const mstp = state => ({
  pics: state.pics,
  token: state.auth.token
});

export default connect(mstp)(UpoadedPics);
