import { ReactComponent as Sun } from '../../icons/sun.svg';
import { ReactComponent as Moon } from '../../icons/moon.svg';
import React from 'react';
import ThemeController from '../../controllers/ThemeController';

export default class DayNightButton extends React.Component<any, { darkTheme: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      darkTheme: ThemeController.instance().isDark()
    }
  }

  switchTheme() {
    this.setState({
      darkTheme: ThemeController.instance().switchTheme()
    });
  }

  render() {
    const Icon = this.state.darkTheme ? Sun : Moon;

    return (
      <a className="theme-switch" onClick={this.switchTheme.bind(this)}>
        <Icon className='icon'></Icon>
      </a>
    )
  }
}