import React, { Component } from 'react';
import Remarkable from 'remarkable';

class Note extends Component {
    getRawMarkup () {
        const md = new Remarkable();
        return { __html: md.render(this.props.text) };
    }

    render () {
        const formatedDate = (new Date(this.props.date)).toLocaleString();
        return (
            <div>
                <hr className="Note-hr" />
                <div className="Note-row row">
                <div className="nine columns">
                        <p dangerouslySetInnerHTML={ this.getRawMarkup() } />
                    </div>
                    <div className="three columns">
                        <button onClick={ () => this.props.handleDeleteNote(this.props.date) }>Delete</button>
                    </div>
                </div>
                <p className="Note-foot">Created {formatedDate}</p>
            </div>
        )
    }
}

export default Note;
