import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button, Container, Dropdown, Grid, Header, Icon, Menu, Popup } from 'semantic-ui-react'

import * as accountActions from '../../actions/accountActions'
import LoginButton from '../elements/login/button'
import LogoutItem from '../elements/login/logout'

import AccountAvatar from '../elements/account/avatar'
import * as statusActions from '../../actions/statusActions'

class HeaderMenu extends Component {
  state = {
    isClaiming: false,
    hasBalance: false
  }
  componentDidMount() {
    if (!this.props.account) {
      this.props.actions.fetchAccount()
    }
    this.interval = setInterval(() => this.props.actions.fetchAccount(), 60000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.account && nextProps.account.data) {
      const { data } = nextProps.account
      const fields = [
        'reward_steem_balance',
        'reward_vesting_balance'
      ];
      const hasBalance = fields.filter((field) => {
        return (parseFloat(data[field].split(" ")[0]) > 0)
      })
      this.setState({hasBalance, isClaiming: false});
    }
  }
  handleClaim = () => {
    const account = this.props.account
    const data = account.data
    const reward_steem = data.reward_steem_balance;
    const reward_vests = data.reward_vesting_balance;
    this.setState({isClaiming: true})
    this.props.actions.claimRewards({ account, reward_steem, reward_vests });
  }
  vests_to_sp(vests){
      return Math.round(vests / 1e6 * this.props.status.network.steem_per_mvests * 1000) / 1000
  }
  render() {
    const { data, loading, name } = this.props.account
    const { height } = this.props.status.network
    const { isClaiming, hasBalance } = this.state
    let avatar = false
    let pendingBalance = false
    let userItem = (
      <Menu.Item>
        <LoginButton {... this.props}/>
      </Menu.Item>
    )
    const indicator = (!loading) ? (
      <Popup
        trigger={
          <Icon name='checkmark' />
        }
        position='bottom center'
        inverted
        content={`Current Blockchain Height: #${height}`}
        basic
      />
    ) : (
      <Popup
        trigger={
          <Icon loading name='asterisk' />
        }
        position='bottom center'
        inverted
        content={`Connecting to the Steem blockchain`}
        basic
      />
    )
    if (name) {
      avatar = (
        <span>
          <AccountAvatar
              className="ui avatar image"
              noLink={true}
              size={35}
              style={{margin: 0}}
              username={name}
            /> {name}
        </span>
      )
      userItem = (
        <Dropdown style={{padding: '0 1.1em'}} item trigger={avatar} pointing='top right' icon={null} className='icon'>
          <Dropdown.Menu>
            <Dropdown.Item as="a" href={`/@${name}`} icon="user" content={name} />
            <LogoutItem {...this.props} />
          </Dropdown.Menu>
        </Dropdown>
      )
      if(data) {
        if(hasBalance.length > 0) {
          pendingBalance = (
            <Popup
              trigger={
                <Menu.Item style={{padding: '0 1.1em'}}>
                  <Icon name='gift' size='big' style={{margin: 0}} />
                </Menu.Item>
              }
              hoverable
            >
                <Grid>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Header>
                              Pending Rewards
                              <Header.Subheader>
                                Rewards from your posting and voting activity.
                              </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        {hasBalance.map((field) => {
                          const kind = field.split("_")[1]
                          const amount = data[field].split(" ")[0]
                          const value = (kind === 'vesting') ? this.vests_to_sp(amount) : amount
                          const symbol = (kind === 'vesting') ? 'SP' : 'WLS'
                          return (
                              <Grid.Column key={symbol} textAlign='center'>
                                    <Header color='green'>
                                        +{value}{' '}<small>{symbol}</small>
                                    </Header>
                              </Grid.Column>
                          )
                        })}
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Button color='purple' fluid size='small' onClick={this.handleClaim} loading={isClaiming}>
                              Claim Rewards
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Popup>
          )
        }
      }
    }
    return (
      <Menu size='large' inverted style={{ backgroundColor: '#061d32', borderBottom: '3px solid #767676'}}>
        <Container>
          <Link to='/' className='item'>
            <img alt="logo" src="/logo.png" />
          </Link>
          <Link to='/' className='title active item'>
            <strong>whalesharestalk.io/</strong>
          </Link>
	<Link to='/' className='item'>
            <img alt="logo" src="/logo.png" />
          </Link>
          <Container className='item'>
            Need an account? Sign up on:  <strong><a href='https://whaleshares.io/newsignup.html'>WhaleShares.io</a></strong>
          
          {/*
          <Link to='/' className='title item'>General</Link>
        /*  
	<Link to='/forums/steem' className='title item'>Steem</Link>
          <Link to='/forums/crypto' className='title item'>Crypto</Link>
          */}
         
            {pendingBalance}
            {userItem}
            <Menu.Item>
              {indicator}
            </Menu.Item>
          </Container>
        </Container>
      </Menu>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    account: state.account,
    preferences: state.preferences,
    status: state.status
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({
    ...accountActions,
    ...statusActions
  }, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
