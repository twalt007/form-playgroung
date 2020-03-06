import React, {Component} from 'react'
import BlogHeader from '../general/header'
import BlogFooter from '../general/footer'
import NavButton from '../../general/navButton'
import {formatDate} from '../../general/helpers'
import './postContent.scss'


class PostContent extends Component {
    constructor (props){
        super(props);
        
        this.state={
            history: props.history,

            // postId: props.history.location.state.id,
            contentType: props.history.location.state.contentType,
            postTitle: props.history.location.state.postTitle,
            postContent: props.history.location.state.postContent,
            postQuote: props.history.location.state.postQuote,
            updatedAt: props.history.location.state.updatedAt
        }
        
        this.history = props.history;
    }
    // formatContent(content){
    //     content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
    //     return content;
    // }
    render(){
        const formattedDate = formatDate(this.state.updatedAt);
        // let postContent = this.formatContent(this.state.postContent);
        console.log ("name: ", name);
        return (            
            <div className="post-container">
                <BlogHeader mainHistory={this.history} />                
                <div className="dark-green-space">                    
                    <h3 className='text italicized post-quote'>{this.state.postQuote}</h3>
                </div>
                <div className="post-body">
                    <h1 className="text post-title top-space">{this.state.postTitle}</h1>
                    <h5 className="text italicized last-edit-date">{formattedDate}</h5>
                    <div className='text post-content top-space'>{this.state.postContent}</div>
                </div>
                <div className="xlrg-flx-container center-margins flex-right">
                    <NavButton buttonClasses='small-button left' text='Return' url='/home' mainHistory={this.history}/>
                </div>
                <BlogFooter mainHistory={this.history}/>
            </div>
        )
    }
}

export default PostContent;