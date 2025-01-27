
const UserEdit=()=>{
    const {userDetails, userEditId}=this.state 
    const {name, website,phone, email, userName}=userDetails



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
            {
            id:userEditId,
            name:name,
            phone:phone,
            website:website,
            username:userName,
            email:email,}
        )

        

    }))

    this.setState(prevState=>({usersDataList:[... prevState.usersDataList , info ]}))
    this.displayUserDetails()
}

editingUserDetails=()=>{
    const {editingUserDetails}=this.state 
    return(
        <form onSubmit={this.onSubmitEditForm}>
        <input type="text" onChange={this.onChangeUsername} placeholder="Enter Username" ></input>
        <input type="text" onChange={this.onChangeName} placeholder="Enter Name"></input>
        <input type="email" onChange={this.onChangeEmail} placeholder="Enter Email"></input>
        <input type="text" onChange={this.onChangeWebsite} placeholder="Enter Website"></input>
        <input type="text" onChange={this.onChangePhone} placeholder="Enter Phone"></input>
        <button type="submit">submit</button>
       </form>
       )

}


}

export default UserEdit