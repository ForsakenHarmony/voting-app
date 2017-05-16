import { Component } from 'preact';
import { connect } from 'react-redux';
import { route } from 'preact-router';

import { Button, Icon, Card, CardText, List } from 'preact-mdl';

import { polls as pollsService, users, auth as authService } from '../feathers';

import Spacer from '../components/spacer';

@connect(({ polls, auth }) => ({ polls, auth }))
export default class Profile extends Component {
  componentWillUnmount() {
    this.props.dispatch(pollsService.reset());
  }
  
  go = (e) => {
    e.preventDefault();
    route(e.target.pathname);
  };
  
  removePoll = (id) => {
    const { dispatch } = this.props;
    
    dispatch(pollsService.remove(id))
      .then(() => dispatch(pollsService.find()));
  };
  
  deleteAccount = async () => {
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure you want to delete your account?')) {
      const { dispatch, auth } = this.props;
      await dispatch(users.remove(auth.user.id));
      dispatch(authService.logout());
      route('/');
    }
  };
  
  render({ polls, auth, dispatch }, {}, {}) {
    const { queryResult, isFinished, isLoading, isError } = polls;
    
    const { isSignedIn } = auth;
    
    if (!queryResult && isSignedIn && !isLoading && !isError) {
      dispatch(pollsService.find());
    }
    
    const { Item } = List;
    
    return (
      <div>
        <Card shadow={2} class="centered">
          <Card.Title>
            <Card.TitleText>
              Your Polls
            </Card.TitleText>
          </Card.Title>
          <CardText>
            <List>
              { isFinished
                ? queryResult && queryResult.data
                  && queryResult.data.map(poll =>
                  (
                    <Item>
                      <a href={`p/${poll.id}`} onClick={this.go}>
                        {poll.title}
                      </a>
                      <Spacer/>
                      <Button icon
                              type="button"
                              onClick={this.removePoll.bind(null, poll.id)}>
                        <Icon>delete</Icon>
                      </Button>
                    </Item>
                  )
                )
                : <div>Loading...</div>}
            </List>
            <Button raised primary onClick={this.deleteAccount}>Delete Account</Button>
          </CardText>
        </Card>
      </div>
    );
  }
}
