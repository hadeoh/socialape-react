import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton'

// Redux Stuff
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions'

// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close'

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
        marginTop: '20px',
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        margingTop: 10
    },
    progress: {
        position: 'absolute'
    },
    submitButton: {
        position: 'relative',
        marginTop: '15px',
        float: 'right'
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '5%'
    }
}

class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: '', open: false, errors: {} });
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.postScream({ body: this.state.body })
    }
    render() {
        const { errors } = this.state;
        const { classes, UI: {loading}} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Post a Scream!'>
                    <AddIcon color='secondary'/>
                </MyButton>
                <Dialog
                open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton onClick={this.handleClose} tip='Close' tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>Post a new scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name='body' type='text' label='SCREAM!!'
                            multiline row='3' placeholder='Scream at your fellow apes'
                            error={errors.message ? true : false } helperText={errors.message}
                            className={classes.TextField} onChange={this.handleChange} fullWidth/>
                            <Button type='submit' variant='contained' color='primary'
                            className={classes.submitButton} disabled={loading}>
                                Submit 
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner}/>
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}
PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream))
