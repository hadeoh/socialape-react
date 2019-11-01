import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles'

// Redux Stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';
import MyButton from '../../util/MyButton'

// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import EditIcon from '@material-ui/icons/Edit';


const styles = {
    form: {
        textAlign: 'center'
    }, 
    image: {
        margin: '20px auto 20px auto',
        height: '40px'
    },
    pageTitle: {
        fontSize: '40px',
        fontFamily: 'Segoe UI',
        margin: '10px auto 10px auto',
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        float: 'right'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        margingTop: 10
    },
    progress: {
        position: 'absolute'
    },
}

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.userCredentials);
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    componentDidMount(){
        const { userCredentials } = this.props;
        this.mapUserDetailsToState(userCredentials);
    }
    mapUserDetailsToState = (userCredentials) => {
        this.setState({
            bio: userCredentials.bio ? userCredentials.bio : '',
            location: userCredentials.location ? userCredentials.location : '',
            website: userCredentials.website ? userCredentials.website : '',
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip='Edit details' onClick={this.handleOpen}
                    btnClassName={classes.button}>
                    <EditIcon color='primary'/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.state.handleClose}
                fullWidth maxWidth='sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name='bio' type='text' label='Bio' multiline
                            rows='3' placeholder='A short bio about yourself' className={classes.textField}
                            value={this.state.bio} onChange={this.handleChange} fullWidth/>
                            <TextField name='website' type='text' label='Website' placeholder='A link to your website' className={classes.textField}
                            value={this.state.website} onChange={this.handleChange} fullWidth/>
                            <TextField name='location' type='text' label='Location' placeholder='Where you live' className={classes.textField}
                            value={this.state.location} onChange={this.handleChange} fullWidth/>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                        <Button onClick={this.handleSubmit} color='primary'>Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    userCredentials: state.user.userCredentials
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
