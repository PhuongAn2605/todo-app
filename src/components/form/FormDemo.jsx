import React, {useState} from "react";
import { connect } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

import { FormStyles } from "./FormDemo.styles.jsx";
import { addUser } from "../../redux/user/user.actions.js";

const FormDemo = ({ addUser }) => {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');


  const handleOnSubmit = (event) => {
    event.preventDefault();

    const info = {
      username,
      email
    }

    addUser(info);
    setUsername('');
    setEmail('');
  }

    return (
      <div className="form-demo">
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <FormStyles>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">Username</InputLabel>
              <Input
                id="component-simple-username"
                name="username"
                value={username}
                type="text"
                required
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">Email</InputLabel>
              <Input
                id="component-simple-email"
                name="email"
                value={email}
                type="email"
                required
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              style={{
                margin: "2rem auto",
                width: " 40%",
                textTransform: "capitalize",
                border: "none",
              }}
            >
              Show Information
            </Button>
          </FormStyles>
        </form>
        
      </div>
    );
  }


  const mapDispatchToProps = dispatch => ({
    addUser: user => dispatch(addUser(user))
  })

export default connect(null, mapDispatchToProps)(FormDemo);
