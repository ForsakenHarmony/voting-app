import { Component } from 'preact';
import { connect } from 'preact-redux';
import { route } from 'preact-router';

import { Card, CardText, List, Radio, Button } from 'preact-mdl';

import { polls, votes } from '../feathers';

@connect(state => state)
class Poll extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.form.checkValidity()) return;
    
    const option           = parseInt(e.target.elements.option.value, 10);
    const { dispatch, id } = this.props;
    
    console.log(option, id);
    
    try {
      const poll = await dispatch(votes.create({ pollId: id, option }));
      console.log(poll);
    } catch (e) {
      console.error(e);
    }
  };
  
  formRef = (el) => {
    this.form = el;
  };
  
  update = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ valid: this.form.checkValidity() });
  };
  
  componentWillMount() {
    console.log('poll mount');
  }
  
  componentDidMount() {
    const { dispatch, id } = this.props;
    
    dispatch(polls.get(id));
    dispatch(votes.find({ query: { pollId: id, count: true } }));
  }
  
  componentWillUnmount() {
    this.props.dispatch(polls.reset());
    this.props.dispatch(votes.reset());
  }
  
  render({ id, polls, res }, {}, {}) {
    const { data, isLoading, isFinished, isError } = polls;
    
    const { Item } = List;
    
    console.log('poll render');
    
    return (
      <Card shadow={4} class="centered">
        <Card.Title>
          <Card.TitleText>
            {isLoading && <div>loading...</div>}
            {isFinished && (isError ? isError.name : (data && data.title))}
          </Card.TitleText>
        </Card.Title>
        <CardText>
          <form ref={this.formRef} onSubmit={this.handleSubmit}>
            <List>
              {
                isFinished && !isError && data
                && Array.from(data.options.entries())
                        .map(
                          o => (
                            <Item>
                              <Radio required
                                     name="option"
                                     value={o[0]}
                                     onInput={this.update}>{o[1]}</Radio>
                            </Item>
                          )
                        )
              }
            </List>
            {!res && <Button raised primary type="submit">Submit</Button>}
            <Button type="button"
                    onClick={route.bind(null, `/p/${id}/res`)}>Results</Button>
          </form>
        </CardText>
      </Card>
    );
  }
}

export default Poll;
