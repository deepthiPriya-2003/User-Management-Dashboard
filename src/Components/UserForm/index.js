import {Component} from "react";  
import { v4 as uuid} from "uuid" 
import {Navigate} from "react-router-dom"
import UserList from "../UserList"
import "./index.css"
class UserForm extends Component{
    state={newUserDetails:"", name:"", email:"", userName:"", phone:"", website:"", id:"", error:false, addedUserDetails:false}


    
    creatingNewUser=()=>{ 
        const {name, email, userName, phone, website }=this.state
        const id = uuid() 
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
              name:name, 
              email:email, 
              userName:userName, 
              phone:phone, 
              website:website, 
              id:id
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json());
           // .then((json) => );
           

    } 


    onSubmitForm=(event)=>{ 
        event.preventDefault()
        const {name, email, userName, phone, website} = this.state
        const isInputsValid = name.length>0 && userName.length>0 && email.length>0 && phone.length>0 && website.length>0 
        const id = uuid() 
        if (isInputsValid === true){
            this.creatingNewUser() 
            const newUser = {name:name, 
                email:email, 
                userName:userName, 
                phone:phone, 
                website:website, 
                id:id}
            this.setState({newUserDetails:newUser, addedUserDetails:true})
            
            

        }
        else{
            this.setState({error:true, addedUserDetails:true})
        }

    }

    onChangeUsername=(event)=>{
        this.setState({name:event.target.value})
        
    }
    onChangeName=(event)=>{
        this.setState({userName:event.target.value})
        
    }
    onChangeEmail=(event)=>{
        this.setState({email:event.target.value})
        
    }
    onChangePhone=(event)=>{
        this.setState({phone:event.target.value})
        
    }
    onChangeWebsite=(event)=>{
        this.setState({website:event.target.value})
        
    }


    render(){
        const {newUserDetails, addedUserDetails} = this.state
       // console.log(usersDataList)
        if (addedUserDetails === true){ 
            <UserList newUserData={newUserDetails} key={newUserDetails.id}/>
            return <Navigate to="/" />
        }
        return(
            <div className="form-bg-container">
            <h1>Add user</h1>
           <form onSubmit={this.onSubmitForm} className="form-container"> 
            <div className="margin input-container">
            <label htmlFor="username">UserName </label>
            <input type="text" onChange={this.onChangeUsername} placeholder="Enter Username" id="username"></input>
            </div>
            <div className="margin input-container" >
            <label htmlFor="name">Name </label>
            <input type="text" onChange={this.onChangeName} placeholder="Enter Name" className="margin" id="name"></input>
            </div>
            <div className="margin input-container">
            <label htmlFor="email">Email </label>
            <input type="email" onChange={this.onChangeEmail} placeholder="Enter Email" className="margin" id="email"></input>
            </div>
            <div className="margin input-container">
            <label htmlFor="website">Website </label>
            <input type="text" onChange={this.onChangeWebsite} placeholder="Enter Website" className="margin" id="website"></input>
            </div><div className="margin input-container">
            <label htmlFor="phone">Phone </label>
            <input type="text" onChange={this.onChangePhone} placeholder="Enter Phone Number" className="margin" id="phone"></input>
            </div>
            <button type="submit">submit</button>
           </form>
           </div>
        )
    }
}

export default UserForm