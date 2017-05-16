import { Component } from 'preact';
import { connect } from 'react-redux';
import { route } from 'preact-router';

import { Button, Card, CardText, TextField, List, Icon } from 'preact-mdl';

import { polls } from '../feathers';

import Spacer from '../components/spacer';

@connect(state => state)
class CreatePoll extends Component {
  state = {
    title  : 'New Poll',
    options: ['Option 1', 'Option 2'],
  };
  
  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.form.checkValidity()) return;
    
    const { title, options } = this.state;
    const { dispatch }       = this.props;
    
    try {
      const poll = await dispatch(polls.create({ title, options }));
      console.log(poll);
      route(`/p/${poll.value.id}`);
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
  
  updateItem = (e) => {
    const { name, value } = e.target;
    const options         = this.state.options;
    
    const index    = parseInt(name.split('-')[1], 10);
    options[index] = value;
    
    this.setState({ options });
  };
  
  addItem = () => {
    const options = this.state.options;
    options.push('New Item');
    this.setState({ options });
  };
  
  removeItem = (i) => {
    const options = this.state.options;
    if (options.length > 2) options.splice(i, 1);
    this.setState({ options });
  };
  
  render({ polls }, { title, options }, {}) {
    const { Item } = List;
    
    const { isError, isLoading } = polls;
    
    return (
      <Card shadow={4} class="centered" id="create">
        <Card.Title>
          <Card.TitleText>
            Create Poll
            {isError && isError.name}
          </Card.TitleText>
        </Card.Title>
        <CardText>
          <form ref={this.formRef} onSubmit={this.handleSubmit}>
            <TextField floating-label
                       required
                       type="text"
                       name="title"
                       label="Title"
                       value={title}
                       onInput={this.update}/>
            <List>
              {Array.from(options.entries()).map(o => (
                <Item key={o[0]}>
                  <TextField name={'o-' + o[0]}
                             value={o[1]}
                             onInput={this.updateItem}/>
                  <Spacer/>
                  <Button icon
                          type="button"
                          onClick={this.removeItem.bind(null, o[0])}>
                    <Icon>delete</Icon>
                  </Button>
                </Item>
              ))}
              <button-bar>
                <Button icon raised type="button" onClick={this.addItem}><Icon>add</Icon></Button>
              </button-bar>
            </List>
            <Button primary raised type="submit" disabled={isLoading}>Create{isLoading && '...'}</Button>
          </form>
        </CardText>
      </Card>
    );
  }
}

export default CreatePoll;
