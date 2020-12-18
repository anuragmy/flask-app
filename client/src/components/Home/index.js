/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Header, Segment } from "semantic-ui-react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { firebaseStorage } from "../../firebase";
import { Uploader, Icon, Button, Message } from "rsuite";
import { notification } from 'antd'
import { Grid, Container } from "@material-ui/core";
import "rsuite/dist/styles/rsuite-default.css";
import { upload, getPics } from "../actions";
import UploadedPics from '../UploadedPics'

// import "./homepage.styles.scss";

const Home = ({ token, pics }) => {
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [file, setFile] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    dispatch(getPics(token))
  }, [])


  const handleChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setFile(file);
    setShow(true);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const fileToUpload = file;
    const storage = firebaseStorage.ref();
    const fileRef = storage.child(fileToUpload.name);
    fileRef.put(file).then(() => {
      console.log("uploaded");
      fileRef.getDownloadURL().then((url) => {
        const arr = [...imageUrl, url];
        setImageUrl(arr);
        setLoading(false);
        setShowSuccess(true);
        setShow(false);
        dispatch(upload(url, token))
        notification.success({
          message: 'Image Uploaded',
          description:
            'Image has been successfully uploaded',
          duration: 2,
        })
      });
    });
    setFile();
  };


  const history = useHistory();


  return (
    <Container>
      {token && (
        <Header as="h2">
          Welcome,
          <br />
          <Header.Subheader style={{
            marginTop: 7,
            margineft: 10,
          }}>Upload your pics here!</Header.Subheader>
        </Header>

      )}

      <div className="homepage">
        <Segment
          raised
          placeholder
          style={{
            background: "white",
            marginTop: "5%",
            maxWidth: "80%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Header icon>
            <Icon icon="file-image-o" size="5x" />
            {!token ? (
              <p>Please Sign in to upload Images</p>
            ) : (
                <p>Click to upload Images</p>
              )}
          </Header>
          {token ? (
            <>
              {/* <Uploader
                appearance="primary"
                listType="picture-text"
                defaultFileList={[]}
                onChange={handleChange}
                action="//jsonplaceholder.typicode.com/posts/"
              /> */}

              <input type="file" onChange={handleChange} accept="image/*" />
              {show && (
                <Button
                  appearance="primary"
                  loading={loading}
                  disabled={loading}
                  onClick={handleSubmit}
                  style={{
                    width: "fit-content",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 20,
                  }}
                >
                  Submit
                </Button>
              )}

            </>
          ) : (
              <Button
                appearance="primary"
                style={{
                  width: "fit-content",
                  marginTop: 20,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={() => history.push("/signin")}
              >
                Sign In
              </Button>
            )}
        </Segment>
        {token && (

          <Button appearance="primary" onClick={() => history.push('/images')}>See your images</Button>)}
      </div>
    </Container>
  );
};

const mstp = (state) => ({
  token: state.auth.token,
  email: state.auth.email,
});

export default connect(mstp)(Home);
