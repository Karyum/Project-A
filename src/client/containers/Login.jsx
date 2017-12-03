import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth_actions';

const Label = styled.label`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const NameMessage = styled.span`
  margin-top: 1rem;
  color: red;
  font-size: 1rem;
`;

const Input = styled.input`
  display: inline-block;
`;
const Wrapper = styled.form`
  width: 50%;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  margin-top: 1rem;
`;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      nameMessage: '',
      loginMessage: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    console.log(this.props.user.error);
    if (this.props.user.error) {
      return this.setState({ loginMessage: 'Something went wrong' });
    }
    return 1;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const englishChar = /[a-zA-Z]/;
    const { username, password } = event.target.elements;
    const postData = {
      username: username.value,
      password: password.value,
    };

    if (!englishChar.test(postData.username)) {
      this.setState({
        nameMessage: 'English characters only',
      });
    } else {
      this.props.loginUser(postData);
    }
  }

  render() {
    console.log('FETCHED', this.props.user.dataFetched);
    if (this.props.user.dataFetched) {
      console.log(12);
      return <Redirect to="/" />;
    }
    return (
      <Wrapper onSubmit={this.handleSubmit}>
        <Label>
          Name:
          <Input type="text" name="username" required />
        </Label>
        <NameMessage>{this.state.nameMessage}</NameMessage>
        <Label>
          Password:
          <Input type="password" name="password" required />
        </Label>
        <Button type="Submit">Login</Button>
        {this.state.loginMessage}
        <Link href="a" to="/signup">
          Signup
        </Link>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  loginUser,
};
const mapStateToProps = state => ({
  user: state.loggedinUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
