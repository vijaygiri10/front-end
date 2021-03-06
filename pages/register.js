import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import fetch from 'isomorphic-fetch'
import createBlogPost from './sendRegisterData'

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  status: {
    danger: 'red'
  },
  typography: {
    useNextVariants: true
  }

})

const styles = {
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,

    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }

  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.main
  },
  form: {

    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
}

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    let err = new Error(res.statusText)
    err.response = res
    throw err
  }
}
// function Registor (props) {
class Registor extends React.Component {
  // const { classes } = props

  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  handleChange (e) {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handleSubmit (event) {
    event.preventDefault()
    const form = {
      name: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
    fetch('http://127.0.0.1:8000/login', {
      body: JSON.stringify(form),
      form: form,
      method: 'post',
      timeout: 5000,
      headers: {
        'Accept': 'application/json'
      }
    }
    ).then(checkStatus)
  }

  render () {
    return (

      <main className={styles.main}>
        <CssBaseline />
        <Paper className={styles.paper}>
          <Avatar className={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
          Register
          </Typography>
          <form className={styles.form} onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='firstName'>First Name</InputLabel>
              <Input id='firstName' name='firstName' autoComplete='firstName' autoFocus />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='lastName'>Last Name</InputLabel>
              <Input id='lastName' name='lastName' autoComplete='lastName' autoFocus />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='email'>Email Address</InputLabel>
              <Input id='email' name='email' autoComplete='email' autoFocus />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <Input name='password' type='password' id='password' autoComplete='current-password' />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={styles.submit}
            >
            Submit
            </Button>
          </form>
        </Paper>
      </main>

    )
  }
}
/*
Registor.propTypes = {
  classes: PropTypes.object.isRequired
}
*/
export default withStyles(styles)(Registor)
// export default Registor
