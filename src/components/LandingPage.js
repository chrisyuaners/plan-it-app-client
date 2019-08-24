import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'

function LandingPage(props) {
  return (
    <div style={{ backgroundColor: '#5d9cec', minHeight: '100vh', paddingBottom: '2%'  }}>
      <LoginForm setUser={props.setUser} loginProps={props.loginProps} />
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
