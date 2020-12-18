import React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Grid, Container } from "@material-ui/core";
// import "./homepage.styles.scss";

const Home = ({ token }) => {
  const history = useHistory();
  return (
    <Container>
      <div className="homepage">
        <Segment
          raised
          placeholder
          style={{
            background: 'white',
            marginTop: "10%",
            maxWidth: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Header icon>
            <Icon name="file image outline" size="massive" />
            {!token ? (
              <p>Please Sign in to upload Images</p>
            ) : (
                <p>Click to upload Images</p>
              )}
          </Header>
          {token ? <Button primary>Add Document</Button> : <Button primary onClick={() => history.push('/signin')}>Sign In</Button>}

        </Segment>
      </div>
    </Container>
  );
};

const mstp = (state) => ({
  token: state.auth.token,
});

export default connect(mstp)(Home);
