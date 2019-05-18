import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

const url = 'http://localhost:3005';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    }
  });

  function getModalStyle() {
    const top = 50
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modalOpen: true,
            answer: '',
            response: ''
        }
    };

    handleModalClick(e) {
        e.preventDefault();
            axios.get(`${url}/api/pineapples?answer=${this.state.answer}`)
            .then(data => {
                this.setState({
                    response: data.data
                })
            })
            .catch(err => {
                console.log('this didnt work')
            })
    };

    handleRefresh(e) {
        e.preventDefault();
        this.setState({
            response: ''
        })
    }


    render() {
        const { classes } = this.props;
        let tab = <div>
            <Typography variant = 'body2'>
                Do YOU think pineapple belongs on pizza?
            </Typography>
                    <RadioGroup>
                        <FormControlLabel value="yes" control={<Radio />} label="yes" onClick ={() => {this.setState({answer:'true'})}}/>
                        <FormControlLabel value="no" control={<Radio />} label="no" onClick ={() => {this.setState({answer:'false'})}}/>
                    </RadioGroup>
            <Button id = 'pineappleEnter' variant = 'contained' onClick= {(e) => {this.handleModalClick(e)}}>
                Submit
            </Button>
        </div>
        if (this.state.response.length > 0) {
            tab = <div>
                <Typography variant = 'body2'>
                    {this.state.response}
                    <Button style = {{marginLeft: '2vw'}} id = 'pineappleRefresh' variant = 'contained' onClick= {(e) => {this.handleRefresh(e)}}>
                        Retry?
                    </Button>
                </Typography>
            </div>
        }
        return (
            <div>
                <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.modalOpen}
                >      
                    <div style = {getModalStyle()} className = {classes.paper}>
                        {tab}
                    </div>
                </Modal>
                
            </div>
        )
    }
}

export default withStyles(styles)(App);