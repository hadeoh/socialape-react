import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Redux Stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions'

const styles = {
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator:{
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
    },
    button: {
        marginTop: '20px',
        position: 'relative'
    }
}

class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ 
                body: '',
                errors: {}
            })
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.submitComment(this.props.screamId, { body: this.state.body })
    }
    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors

        const CommentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign : 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name='body'
                        type='text'
                        label='Comment on scream'
                        error={errors.message ? true : false }
                        helperText={errors.message}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField} />
                    <Button type='submit' variant='contained' color='primary'
                        className={classes.button}>Submit</Button> 
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>
        ) : null;
        return CommentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.number.isRequired,
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm))
