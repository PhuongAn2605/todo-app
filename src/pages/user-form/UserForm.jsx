import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import FormDemo from "../../components/form/FormDemo";
import { FormStyles } from "../../components/form/FormDemo.styles";

import { LinkStyles, TitleStyles } from "../utils/styles";


const UserForm = ({ users }) => {
  return (
    <div>
        <TitleStyles>User Form</TitleStyles>
      <FormDemo />
      {users.length > 0 ? (
        users.map((user) => (
          <FormStyles style={{ flexDirection: "row" }}>
            <span>{user.username}</span> - <span>{user.email}</span>
          </FormStyles>
        ))
      ) : (
        <FormStyles>No existing user!</FormStyles>
      )}
      <LinkStyles>
        <NavLink to="/" className="nav-link">Todo App</NavLink>
      </LinkStyles>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users.userList,
});

export default connect(mapStateToProps)(UserForm);
