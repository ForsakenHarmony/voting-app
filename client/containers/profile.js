import { Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

import { Card, CardText, List } from 'preact-mdl';

import { polls as pollsService } from '../feathers';

@connect(({ polls, auth }) => ({ polls, auth }))
export default class Profile extends Component {
  componentWillUnmount() {
    console.log('profile unmount');
    this.props.dispatch(pollsService.reset());
  }
  
  go = (e) => {
    e.preventDefault();
    route(e.target.pathname);
  };
  
  render({ polls, auth, dispatch }, {}, {}) {
    const { queryResult, isFinished } = polls;
    const { isSignedIn }              = auth;
    
    if (!queryResult && isSignedIn) dispatch(pollsService.find());
    
    const { Item } = List;
    
    return (
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
                  </Item>
                )
              )
              : <div>Loading...</div>}
          </List>
        </CardText>
      </Card>
    );
  }
}
