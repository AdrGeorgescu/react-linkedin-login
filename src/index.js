import React from 'react'
import autobind from 'autobind-decorator'
import getURL from './getURL'
import getQueryParameter from './getQueryParameter'
import reset from './reset'
/* global localStorage */

export default class LinkedIn extends React.Component {

  static propTypes = {
    clientId: React.PropTypes.string,
    callback: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    text: React.PropTypes.node,
    scope: React.PropTypes.arrayOf(React.PropTypes.string),
    icon: React.prototype.any
  }

  componentDidMount () {
    this.restart()
  }

  @autobind
  start () {
    const state = Math.random().toString(36).substring(7)
    const clientId = this.props.clientId
    const scope = this.props.scope
    localStorage.linkedInReactLogin = state
    localStorage.linkedInReactLoginRedirectUri = window.location.href
    window.location.href = getURL({ clientId, state, scope })
  }

  @autobind
  restart () {
    const state = localStorage.linkedInReactLogin
    const redirectUri = localStorage.linkedInReactLoginRedirectUri
    if (!redirectUri) return
    if (!state) return
    if (state !== getQueryParameter('state')) return
    if (!getQueryParameter('code')) return
    const code = getQueryParameter('code')
    reset()
    this.props.callback({code, redirectUri})
  }

  render () {
    const {icon} = this.props;
    const isIconString = typeof icon === 'string';
    return (
      <span>
          {isIconString && (
              <link
                  rel="stylesheet"
                  href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
              />
          )}
          <button className={this.props.className} onTouchTap={this.start}>
              {icon && isIconString && (
                  <i className={`fa ${icon}`}></i>
              )}
              {icon && !isIconString && icon}
            {this.props.text}
          </button>
      </span>
    )
  }

}
