import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'

function LandingPage(props) {
  return (
    <div style={{ backgroundColor: '#5d9cec', minHeight: '100vh', paddingBottom: '2%'  }}>
      <LoginForm setUser={props.setUser} loginProps={props.loginProps} />
      <div style={{ float: 'left', padding: '1%' }}>
        <h3>Demo:</h3>
        <p>Username: clees</p>
        <p>Password: 123</p>
      </div>
      <img src="./plan-it.jpg" alt=""/>
      <div>
        <Link to={"/signup"}>
          <Button>
            Get Started <span role="img" aria-label="Close">🏄</span>‍
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
