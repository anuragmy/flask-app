import React from 'react'
import { Grid, Container } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Image, Button } from 'semantic-ui-react'
import { connect, useDispatch } from 'react-redux';
import { getPics } from '../actions'


const UpoadedPics = ({ pics, token }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    dispatch(getPics(token))
  }, [])

  return (
    <Container>
      <Grid item spacing={2}>
        {pics.pics.images.length > 0 && pics.pics.images.map(pic => (
          <Grid item xs={12} sm={6} md={4}>
            <Image src={pic.image_string} size='medium' bordered rounded />
          </Grid>
        ))}
      </Grid>
      <Button primary content="Back" onClick={() => history.push('/')} />
    </Container>
  )
}

const mstp = state => ({
  pics: state.pics,
  token: state.auth.token
});

export default connect(mstp)(UpoadedPics);
