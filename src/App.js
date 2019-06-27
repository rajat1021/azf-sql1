import React from 'react';
import reactdom from 'react-dom';


export class App extends React.Component {
 constructor(props) {
   super(props);
   this.state = { users: [] };
  //  this.loadFromServer = this.loadFromServer.bind(this);
  }
//  loadFromServer() {  
//    fetch('http://jsonplaceholder.typicode.com/users')
//    .then(res => res.json())
//    .then((data) => {
//        this.setState({ users: data })
//    })
//    .catch(console.log)
//  }
//  componentDidMount() {
//    this.loadFromServer();
  
//  }

 searchClick = () => {
   var opts={"name":this.state.SearchBox};
    fetch('https://prt-azf.azurewebsites.net/api/GetDataFromSQL', {
      method: 'post',
      body: JSON.stringify(opts)
      }).then(res => res.json())
       .then((data) => {
           this.setState({ users: data })
      }).catch(console.log);
}
handleChange(event) {
  this.setState({SearchBox: event.target.value})
}

 render() {
   const { users } = this.state;
   return (
     <div className="mainDiv">
      <div style={{'text-align': 'center','border-top':' 1px solid','border-bottom': '1px solid'}}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Miami_Hurricanes_logo.svg" style={{height: '110px',width: '110px'}}/>
      </div>  
      <h3>
        Search users
      </h3>
       <input type="text" name="SearchBox" value={this.state.SearchBox} 
    onChange={this.handleChange.bind(this)} />
       <input type="button" value="Search" onClick={this.searchClick}/>
       <table id="example" className="table table-striped table-bordered dt-responsive nowrap" style={{ width: '50%' }}>
         <thead>
           <tr>
             <th>S.No.</th>
             <th>Name</th>
             <th>Phone Number</th>
           </tr>
         </thead>
         <tbody>
           {
             users.map((p, index) => {
              return  <tr key={index}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.phone}</td>
              </tr>;
             })
           }
         </tbody>
       </table>
     </div>
   );
 }
}
