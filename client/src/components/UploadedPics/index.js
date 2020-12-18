/* eslint-disable no-unused-vars */
import React from 'react'
import { Grid, Container } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Image, Button, Card } from 'semantic-ui-react'
import { connect, useDispatch } from 'react-redux';
import axios from 'axios'
import { getPics } from '../actions'


const UpoadedPics = ({ pics, token }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [images, setImages] = React.useState([]);



  React.useEffect(() => {
    const getImages = async () => {
      const config = {
        headers: { 'x-access-token': token }
      }
      axios.get('http://localhost:5000/images', config)
        .then(res => setImages(res.data.images));
    };
    getImages();
  }, [token]);

  return (
    <Container>
      <Button primary content="Back" onClick={() => history.push('/')} style={{ marginBottom: 20 }} />
      <Grid item container spacing={2}>
        {images.map(pic => (
          <Grid item xs={12} sm={6} md={4}>
            <Image src={pic.image_string} size='medium' bordered />

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
