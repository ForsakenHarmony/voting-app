import { Component } from 'preact';
import { connect } from 'preact-redux';

import { polls } from '../feathers';

@connect(state => state)
class Poll extends Component {
  componentWillMount() {
    const { dispatch, id } = this.props;
    
    dispatch(polls.get(id));
  }
  
  render({ id, polls }, {}, {}) {
    const { data, isLoading, isFinished, isError } = polls;
    
    return (
      <div className="card is-centered">
        <div className="card-content">
          {isLoading && <div>loading...</div>}
          {isFinished
           && <div>
             {isError ? isError.name : JSON.stringify(data)}
           </div>}
        </div>
      </div>
    );
  }
}

export default Poll;
