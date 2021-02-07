import React, { useState, useEffect,Component } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import axios from "axios";


const classes = makeStyles(() => ({
  root: {}
}));


class ProfileDetails extends Component{

  constructor(props) {
      super(props);
      
      this.state = {
        id : "",
        name : "",
        email : "",   
        password : "",
        password_confirm : "",

        isLoading : true,
      };
      this.refreshData = this.refreshData.bind(this);
      this.handleSubmit =this.handleSubmit.bind(this);
      this.handleChange =this.handleChange.bind(this);
  }

  componentDidMount(){
    this.refreshData();
  }


  refreshData(){
    let self =this;

    self.setState({
      isLoading:true,
    })

    axios.get(location.origin+"/user").then((data)=>{
      let {id,name,email} = data.data;
      self.setState({
        id : id,
        name : name,
        email : email,
        isLoading:false,
      })

    })
  }

  handleSubmit(e){
    e.preventDefault();

    let self =this;
    self.setState({
      isLoading:true,
    })

    axios.patch(location.origin+"/user/"+this.state.id,this.state).then((data)=>{
      console.log(data);
      self.setState({
        isLoading:false,
      });
      if(data.data){
        self.refreshData();
      }else{
        alert("gagal !");
      }
    });
  }

  handleChange (event){
    let self= this;

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render(){

    if(this.state.isLoading){
      return (<CircularProgress />)
    }
    
    return (
        <form
          autoComplete="off"
          noValidate
          onSubmit={this.handleSubmit}
          className={clsx(classes.root)}
        >
          <Card>
            <CardHeader
              subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
             
                <TextField
                  fullWidth
                  label="First name"
                  name="name"
                  onChange={this.handleChange}
                  required
                  value={this.state.name}
                  variant="outlined"
                  margin="normal"
                />
        
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={this.handleChange}
                  required
                  value={this.state.email}
                  variant="outlined"
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                  value={this.state.password}
                  variant="outlined"
                  margin="normal"
                />
          
              <TextField
                  fullWidth
                  label="Password Confirmation"
                  name="password_confirm"
                  onChange={this.handleChange}
                  type="password"
                  value={this.state.password_confirm}
                  variant="outlined"
                  margin="normal"
                />
                
            </CardContent>
            <Divider />
            <Box
              display="flex"
              justifyContent="flex-end"
              p={2}
            >
              <Button
                color="primary"
                variant="contained"
                type="submit"
              >
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      );
  }
}


export default ProfileDetails;
