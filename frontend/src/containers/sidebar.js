import React from 'react'
import { Button } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Divider, Header, Icon, Menu, Segment } from 'semantic-ui-react'
import * as accountActions from '../actions/accountActions'
import { Link } from 'react-router-dom'
import Iframe from 'react-iframe'
import * as postActions from '../actions/postActions'
import * as GLOBAL from '../global';
class Sidebar extends React.Component {
//state = {props:{}}
constructor(props) {
    super(props)
    const { action, filter, forum, existingPost } = props;
//this.state.props = props    
let tags = (filter) ? [filter] : (forum && forum.tags) ? [forum.tags[0]] : [];
    if (action === 'edit') {
      if (existingPost.json_metadata && existingPost.json_metadata.tags && existingPost.json_metadata.tags.length)
        tags = existingPost.json_metadata.tags;
      }
    }

  evergreensubmit = (e) => {
//    const form = this.form.formsyForm
 //   const model = form.getModel()
    const _id = (this.props.forum) ? this.props.forum._id : false
    let data = {
   //     ...model,
       namespace: _id,
    }
    const { action, account, parent } = this.props
    const woo = this.props
            let uri = GLOBAL.REST_API + '/evergreen/' + (account.name);
     fetch(uri).then(
  function(u){ return u.json();}
).then(
  function(json){
    console.log(json.data.post);
data=json.data.post;	
  //const data = {
  //       namespace: _id,
  //  }
    //const { action, account, parent } = this.props
    woo.actions.submit2(account, data,  action)
  }
)
  return false;
}

//state={}
 //constructor(props) {
   // super(props)
    //const { action, filter, forum, existingPost } = props;
    //let tags = (filter) ? [filter] : (forum && forum.tags) ? [forum.tags[0]] : [];
   // if (action === 'edit') {
   //   if (existingPost.json_metadata && existingPost.json_metadata.tags && existingPost.json_metadata.tags.length)$
     
   // this.drafts = props.drafts || {}
  /*  this.state = {
      formId: _.uniqueId('postform_'),
      activeItem: 'post',
      beneficiaries: {},
      existingPost: (existingPost) ? existingPost : false,
      category: (existingPost) ? existingPost.parent_permlink : (filter) ? filter : (forum && forum.tags) ? forum.$
      recommended: (forum && forum.tags) ? forum.tags : [],
      submitting: false,
      waitingforblock: false,
      preview: {},
      submitted: {},
      tags: tags
    };*/
  

  		 
render() {
    // const forums = this.props.forums;
    const { account, forum, section } = this.props
    const { isUser } = account
    let userMenu = false
    // let requestForum = false
    let forumMenu = false
    if(section === 'thread' && forum && forum.target) {
      forumMenu = (
        <Link to={`/f/${forum.target._id}`}>
          <Segment color='blue' inverted>
            <Header size='small'>
              <Icon name='arrow circle left'/>
              <Header.Content>
                <Header.Subheader style={{color: '#ececec'}}>
                  Posted in
                </Header.Subheader>
                /f/{forum.target._id}
              </Header.Content>
            </Header>
          </Segment>
        </Link>
      )
    }
    // requestForum = (
    //     <Segment basic textAlign='center'>
    //         <Header size='small'>
    //             Start your own community forum!
    //         </Header>
    //         <p>
    //             <Button
    //                 as={Link}
    //                 to='/create/forum'
    //                 content='Get Started'
    //                 size='small'
    //                 color='blue'
    //             />
    //         </p>
    //     </Segment>
    // )
    let subscribedForums = false
        // ,
        // categories = (
        //   <Menu vertical fluid color='blue' size='small'>
        //     <Link className={`item ${(!forums || !forums.group) ? 'active' : ''}`} to='/'>
        //       General Forums
        //     </Link>
        //     <Link className={`item ${(forums && forums.group === 'steem') ? 'active' : ''}`} to='/forums/steem'>
        //       Steem Forums
        //     </Link>
        //     <Link className={`item ${(forums && forums.group === 'crypto') ? 'active' : ''}`} to='/forums/crypto'>
        //       Crypto Forums
        //     </Link>
        //     {/*
        //     <Menu.Item disabled>My Feed</Menu.Item>
        //     <Menu.Item disabled>Communities</Menu.Item>
        //     <Menu.Item disabled>Trending</Menu.Item>
        //     <Menu.Item disabled>New Posts</Menu.Item>
        //     <Menu.Item disabled>Promoted</Menu.Item>
        //     <Menu.Item disabled>Tags</Menu.Item>
        //     */}
        //   </Menu>
        // )
    if(isUser) {
      subscribedForums = (
            <Segment textAlign='center'>
              <Header size='small'>
                No subscriptions found
              </Header>
              <p>
                Looks like you haven't subscribed to any forums yet.
              </p>
            </Segment>
          )
      if(this.props.subscriptions && this.props.subscriptions.forums) {
        const { forums } = this.props.subscriptions
        if(Object.keys(forums).length) {
          subscribedForums = (
            <Segment basic>
              <Menu vertical fluid color='grey' size='small'>
                {[].concat(Object.values(forums))
                  .sort((a, b) => a.id > b.id)
                  .map((forum, i) => {
                    return (
                      <Link
                        key={i}
                        className='item'
                        to={`/f/${forum.id}`}
                      >
                        {forum.id}
                      </Link>
                    )
                  }
                )}
              </Menu>
            </Segment>
          )
        }
      }
      userMenu = (
	
        <Menu vertical fluid color='grey' size='small'>

	<Link className={`item`} to='/newspage'>
            
            News Page
          </Link>
          <Link className={`item ${(section && section === 'feed') ? 'active' : ''}`} to='/feed'>
            <Icon name='users' />
            Feed
          </Link>
          <Link className={`item ${(section && section === 'replies') ? 'active' : ''}`} to={`/replies`}>
            <Icon name='inbox' />
            Inbox
          </Link>
        </Menu>
      )
    }
    return (
      <div>
        {forumMenu}
        {userMenu}
        <Menu vertical fluid color='blue' size='small'>
          <Link className={`item ${(section && section === 'forums') ? 'active' : ''}`} to='/forums'>
            <Icon name='list layout' />
            All Forums
          </Link>
        </Menu>
        {/*{requestForum}*/}
        {subscribedForums}
        <Divider />

	{/*<Iframe url="/widget_price.html" position="relative" width="100%" height="220px" />*/}

        {/*<Iframe url="https://discordapp.com/widget?id=434637602902114304&theme=light" position="relative" width="100%" height="425px" />*/}
        {/*<h4>BtsTalk Meetup Resources</h4>*/}
        {/*<Iframe url="https://drive.google.com/embeddedfolderview?id=138Ewe6JQ1NAHhOiGGTFg5LPWkB9SU5h9#list" position="relative" width="100%" height="425px" />*/}

      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    account: state.account,
    forum: state.forum,
    subscriptions: state.subscriptions
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({
    ...accountActions,
    ...postActions,
  //  ...statusActions
  }, dispatch)}
}
//function mapDispatchToProps(dispatch) {
 // return {actions: bindActionCreators(accountActions, dispatch)}
//}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
