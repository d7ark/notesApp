import React, { Component } from 'react';

class NoteForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            value: 'Add a note in **markdown**',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit (event) {
        this.props.handleAddNote({ text: this.state.value, date: Date.now() });
        this.setState({ value: '' });
        event.preventDefault();
    }

    handleChange (event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <textarea className="NoteForm-textArea" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Add note" />
            </form>
        );
    }
}

export default NoteForm;
