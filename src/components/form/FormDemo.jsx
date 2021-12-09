import React from "react";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

import { ButtonStyles, FormStyles, InputStyles } from "./FormDemo.styles.jsx";

export default class FormDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        username: "",
        email: "",
      },
    };
  }

  handleInputChange(event) {
    //   console.log(event.currentTarget)
    this.setState({
      info: {
        ...this.state.info,
        [event.currentTarget.name]: event.currentTarget.value,
      },
    });
    // console.log(this.state.info);
  }

  handleOnSubmit(event) {
    //   console.log(event)
    event.preventDefault();
    // const newInfo= {
    //   [event.currentTarget.name]: event.currentTarget.value,
    // };

    // console.log(newInfo);

    console.log(this.state.info)
    this.props.changeInfo(this.state.info);
    this.setState({
      info: { email: "", username: "" },
    });
  }

  render() {
    const { username, email } = this.state.info;
    const { info } = this.state;
    return (
      <div className="form-demo">
        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <FormStyles>
            <FormControl variant="standard">
              <InputLabel htmlFor="component-simple">Username</InputLabel>
              <Input
                id="component-simple-username"
                name="username"
                value={username}
                type="text"
                required
                onChange={(event) => this.handleInputChange(event)}
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
                onChange={(event) => this.handleInputChange(event)}
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
}
