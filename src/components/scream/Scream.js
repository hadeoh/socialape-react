import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton'

// Redux Stuff
import { connect } from 'react-redux';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image:{
        minWidth: 200
    },
    content:{
        padding: 25,
        objectFit: 'cover'
    }
}

class Scream extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, scream : { body, createdAt, userImage, userHandle, id, likeCount, commentCount },
                user: { authenticated, userCredentials: { handle } }
    } = this.props;
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream id={id}/>
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia image={`http://localhost:5000/upload/${userImage}`} title='Profile Image' className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/user/details/${userHandle}`} color='primary'>{userHandle}</Typography>
                    {deleteButton}
                    <Typography variant="body2" color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton id={id}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip='Comments'>
                        <ChatIcon color='primary'/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <ScreamDialog id={id} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Scream))
