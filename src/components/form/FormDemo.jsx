import React, {useState} from "react";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

import { ButtonStyles, FormStyles, InputStyles } from "./FormDemo.styles.jsx";

const FormDemo = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     info: {
  //       username: "",
  //       email: "",
  //     },
  //   };
  // }

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // const handleInputChange = (event) => {
  //     console.log(event.currentTarget.name)
  //   setInfo({
  //     info: {
  //       ...info,
  //       [event.currentTarget.name]: event.currentTarget.value,
  //     },
  //   });
  //   // console.log(info);
  // }

  const handleOnSubmit = (event) => {
    //   console.log(event)
    event.preventDefault();

    const info = {
      username,
      email
    }

    props.changeInfo(info);
    setUsername('');
    setEmail('');
  }

    // const { username, email } = info;

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

export default FormDemo;
