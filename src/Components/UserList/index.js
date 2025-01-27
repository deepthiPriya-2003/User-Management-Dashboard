import {Component} from "react"; 
import {Navigate, Link} from "react-router-dom"
import { CgProfile } from "react-icons/cg"; 
import { MdDelete } from "react-icons/md";
//import UserForm from "./Components/UserForm"
//import UserEdit  from "../Components/UserDetailsEdit"
import "./index.css"
class UserList extends Component{ 
      
    state={usersDataList:[], newUsersData:[], userName:"", name:"", email:"", website:"", phone:"", userEditId:0, userEditDetails:""}
    

    
    componentDidMount(){
        this.getUserData()
        this.newUserDataList()

    } 

    getUserData=async()=>{ 
        // fetching data from api 
        const response = await fetch("https://jsonplaceholder.typicode.com/users") 
        const data = await response.json() 

       // updating data to the state 
           
       
       this.setState({usersDataList:data}) 
       



    } 

    addNewUser=()=>{
        <Navigate to="/" />

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

    onSubmitEditForm=(event)=>{
        event.preventDefault()
        const {usersDataList, userEditId, name, website,phone, email, userName}=this.state 
        const editedUserDetails = usersDataList.filter((each) => each.id === userEditId)
        const info = editedUserDetails.map((each => {
            return(
                
                {id:userEditId,
                name:name,
                phone:phone,
                website:website,
                username:userName,
                email:email}
            )

            

        }))

        this.setState(prevState=>({usersDataList:[... prevState.usersDataList]}))
        this.setState({userEditId:0})
        this.displayUserDetails()
    }

    editingUserDetails=()=>{
        const {editingUserDetails, userEditId}=this.state 
        if (userEditId === 0){
            

        }
        return(
            <div className="form-bg-container">
            <h1>Edit User Details</h1>
           <form onSubmit={this.onSubmitEditForm} className="form-container"> 
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

    onClickEdit=(id)=>{
        const {usersDataList}= this.state
       const userDetails = usersDataList.filter(each=> (each.id === id)) 
       const details = userDetails[0] 
       console.log(details)

       this.setState({userEditId:id, userEditDetails:details})


    }

    onClickDelete=(id)=>{
       // console.log(id)
       const {usersDataList}= this.state
       const updatedList = usersDataList.filter(each=> each.id!== id)
       // console.log(updatedList)
       this.setState({usersDataList:updatedList})


    }

    newUserDataList=()=>{
        const newUserData = this.props 
        const {name, email, website, id, phone}=newUserData
        if (newUserData.length === undefined){
             console.log("ok")
        }else{ 
            //console.log(newUserData)
            const newData = {
                name:name,
                email:email,
                website:website,
                 id:id,
                 phone:phone
                
            }
            this.setState({newUsersData:newData})
        }

    }

     
    
    
    displayUserDetails=(props)=>{
        const {usersDataList, newUsersData, userEditId} = this.state 
        if(userEditId > 0){
            return this.editingUserDetails()
        }
       
        return(
            <div className="dashboard-bg-container"> 
               <h1 className="heading">User Management Dashboard</h1> 
               
               <button onClick={this.addNewUser()}>
               <Link to="/addUser">
                Add new user
                </Link>
                </button>
               
               <div className="user-details-bg-container">
               {usersDataList.map(eachUser =>( 
                <div key={eachUser.id} className="user-details-container"> 
                <div className="details-container">
                <CgProfile className="image" />
                <h1 className="user-name">{eachUser.username}</h1>
                </div>
                <div className="details-container">
                <p>Name: {eachUser.name}</p>
                <p>Email: {eachUser.email}</p>
                <p>Website: {eachUser.website}</p>
                <p>Phone: {eachUser.phone}</p>
                
                </div>
                <div className="buttons-bg-container">
                    <button className="margin" onClick={()=>this.onClickEdit(eachUser.id)}>edit</button>
                    <MdDelete className="margin" onClick={()=>this.onClickDelete(eachUser.id)} />
                </div>
                </div>
            
                ))}
                </div> 
            </div>
        )

    }


    render(){ 
        const {usersDataList} = this.state 
        console.log(usersDataList)
        return(
            <div>
               {this.displayUserDetails()} 
            </div>
            
        )
    }
} 


export default UserList