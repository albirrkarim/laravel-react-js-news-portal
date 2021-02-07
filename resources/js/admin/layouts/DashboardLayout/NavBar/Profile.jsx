import React, { Component } from 'react';

import axios from 'axios';
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography,
    makeStyles
  } from '@material-ui/core';

  import red from '@material-ui/core/colors/red';

  const primary = red[500]; // #f44336

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : "Loading ...",
        email: "Loading ...",
    };
    this.refreshData =this.refreshData.bind(this);
  }

  componentDidMount(){
    this.refreshData();
  }
  

  refreshData() {
    let self = this;
    axios
      .get(location.origin + '/user')
      .then(resp => {
        let {name,email} = resp.data;
        self.setState({
            name:name,
            email:email,
        });
      });
  }

  render() {
    return (
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Typography className={this.props.classes.name} color="textPrimary" variant="h5">
          {this.state.name}
        </Typography>
        <Typography style={{maxWidth:"150px"}} color="textSecondary" variant="body2">
          {this.state.email}
        </Typography>
        <a className="text-decoration-none" style={{color:primary}} href={location.origin + '/logout'}>logout</a>
      </Box>
    );
  }
}

export default Profile;
