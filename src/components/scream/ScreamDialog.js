import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm'
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

// Redux Stuff
import { connect } from 'react-redux';
import { getScream } from '../../redux/actions/dataActions';

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
    profileImage:{
        width: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        top: '3.5%',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '92%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
}

class ScreamDialog extends Component{
    state = {
        open: false
    }
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen(); 
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.props.getScream(this.props.id)
    }
    handleClose = () => {
        this.setState({ open: false })
    }

    render(){
        const { classes, scream: { id, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, UI: { loading } } = this.props;
        
const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2}/>
    </div>
) : (
    <Grid container spacing={16}>
        <Grid item sm={5}>
            <img src={`http://localhost:5000/upload/${userImage}`} alt='Profile' className={classes.profileImage}/>
        </Grid>
        <Grid item sm={7}>
            <Typography component={Link} color='primary' variant='h5'
                to={`user/details/${userHandle}`}>
                    @{userHandle}
                </Typography>
                <hr className={classes.invisibleSeparator}/>
                <Typography variant='body2' color='textSecondary'>
                    {dayjs(createdAt).format(`h:mm a, MMMM DD YYYY`)}
                </Typography>
                <hr className={classes.invisibleSeparator}/>
                <Typography variant='body1'>
                    {body}
                </Typography>
                <LikeButton id={id}/>
                <span>{likeCount} Likes</span>
                <MyButton tip='Comments'>
                    <ChatIcon color='primary'/>
                </MyButton>
                <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeparator}/>
        <CommentForm screamId={id}/>
        <Comments comments={comments}/>
    </Grid>
)

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Expand scream' tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary' />
                </MyButton>
                <Dialog 
                open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                <MyButton onClick={this.handleClose} tip='Close' tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
    
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {
    getScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))