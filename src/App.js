import React, { useState, useEffect } from 'react'
import Blog from './components/blog'
import LoginForm from './components/LoginForm'

import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

import Container from '@material-ui/core/Container'


const App = () => {
  const [blogs, setBlogs] = useState([])
  
  //User app component states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //Error app component state
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService
    .getAll()
    .then(blogs => {
      setBlogs( blogs )
    })  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])  

  //START loginFx(s)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  //END loginFx(s)

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <div>
        <h2>blogs</h2>

        <Notification message={errorMessage} />

        {user === null ?
          loginForm() :
          <div>
            <p>{user.name} logged in</p>
          </div>
        }

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </Container>
  )
}

export default App