import { Component } from 'preact';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

import { Card, CardText, List, Radio, Button } from 'preact-mdl';

import feathers, { polls, votes } from '../feathers';

@connect(state => state)
class Poll extends Component {
  state = {
    results: false,
  };
  
  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.form.checkValidity()) return;
    
    const option           = parseInt(e.target.elements.option.value, 10);
    const { dispatch, id } = this.props;
    
    console.log(option, id);
    
    try {
      await dispatch(votes.create({ pollId: id, option }));
      dispatch(polls.get(id));
      this.setState({ results: true });
    } catch (e) {
      console.error(e);
    }
  };
  
  formRef = (el) => {
    this.form = el;
  };
  
  chartRef = (el) => {
    this.chart = el;
  };
  
  update = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ valid: this.form.checkValidity() });
  };
  
  switchResults = () => {
    this.setState({ results: !this.state.results });
  };
  
  componentDidMount() {
    const { dispatch, id } = this.props;
    
    dispatch(polls.get(id));
    dispatch(votes.find({ query: { pollId: id, count: true } }));
    
    const service = feathers.service('api/votes');
    
    service.on('created', this.updateVotes);
    service.on('updated', this.updateVotes);
    service.on('removed', this.updateVotes);
  }
  
  updateVotes = async () => {
    const { id, dispatch } = this.props;
    const votes            = await feathers.service('api/votes')
                                           .find({ query: { pollId: id, count: true } });
    dispatch({ type: 'SERVICES_API/VOTES_FIND_FULFILLED', payload: votes });
  };
  
  componentWillUnmount() {
    this.props.dispatch(polls.reset());
    this.props.dispatch(votes.reset());
    
    const service = feathers.service('api/votes');
    
    service.removeListener('created', this.updateVotes);
    service.removeListener('updated', this.updateVotes);
    service.removeListener('removed', this.updateVotes);
  }
  
  generateChart(poll, votes) {
    const chartData = ((poll && votes) ? new Array(poll.options.length) : []);
    
    if (poll && votes) {
      for (let i = 0; i < chartData.length; i++) {
        chartData[i] = votes[i] || 0;
      }
    }
    
    const colours = [
      '#FF6384',
      '#4BC0C0',
      '#FFCE56',
      '#E7E9ED',
      '#36A2EB',
      '#8203c5',
    ];
    
    return {
      labels  : poll && poll.options,
      datasets: [
        {
          data           : chartData,
          backgroundColor: chartData.map((e, i) => colours[i % colours.length]),
        },
      ],
    };
  }
  
  render({ id, polls, votes }, { results }, {}) {
    const { data } = polls;
    
    if (!results && data && data.hasVoted) {
      this.setState({ results: true });
      results = true;
    }
    
    const isLoading  = polls.isLoading || votes.isLoading;
    const isFinished = polls.isFinished && votes.isFinished;
    const isError    = polls.isError || votes.isError;
    
    const { queryResult } = votes;
    
    const { Item } = List;
    
    const content = !isLoading && isFinished && (results ? (
        <div>
          <Doughnut ref={this.chartRef}
                    data={this.generateChart(data, queryResult)}/>
          {data && !data.hasVoted
           && <Button type="button" onClick={this.switchResults}>Vote</Button>
          }
        </div>
      ) : (
        <form ref={this.formRef} onSubmit={this.handleSubmit}>
          <List>
            {
              !isError && data && Array.from(data.options.entries()).map(o => (
                <Item>
                  <Radio required
                         name="option"
                         value={o[0]}
                         onInput={this.update}>{o[1]}</Radio>
                </Item>
              ))
            }
          </List>
          {!isError && <Button raised primary type="submit">Submit</Button>}
          <Button type="button"
                  onClick={this.switchResults}>Results</Button>
        </form>
      ));
    
    return (
      <Card shadow={2} class="centered">
        <Card.Title>
          <Card.TitleText>
            {isLoading && <div>loading...</div>}
            {isFinished && data && data.title}
          </Card.TitleText>
        </Card.Title>
        <CardText>
          {isFinished && isError && isError.message}
          {content}
        </CardText>
      </Card>
    );
  }
}

export default Poll;
