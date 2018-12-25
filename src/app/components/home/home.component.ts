import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[UserService]
})

export class HomeComponent implements OnInit {
   public userList:any[]=[];
   public shortlistedUserList:any[]=[];
   public searchList:any[]=[];
   public userData:any={};
  constructor(private _userService:UserService) {
    
   }

  ngOnInit() {
    $('#landingpage').show();
    $('#detailedpage').hide();
    this.getUserList();
  }
  getUserList(){
   // console.log('getdata');
    this._userService.readUserList().subscribe(response => {
    //  console.log(response);
      this.userList=response;
      this.searchList=response;
     // console.log('response dta'+JSON.stringify(this.userList));
  },
  error => {
      console.log(error);
  });
  }
  checkSiteAdmin(adminOrNot:boolean){
    if(adminOrNot===true){
      return 'Site Admin';
    }else{
      return 'Not Site Admin';
    }
  }
  searchResult(searchValue:string){
   console.log('value'+searchValue);
   searchValue=searchValue.trim();
   this.userList = this.searchList;
   if(searchValue!=""){
       console.log("search value"+searchValue);
        this.userList = this.userList.filter(function (obj) {
                       var patternsearch = new RegExp("^.*" + searchValue + ".*", "gi");
                       try {
                           return  obj.login.match(patternsearch) ;
                       } catch (e) {
                           console.log(e);
                       }
                   });
     }else{
       console.log('listt');
       this.userList = this.searchList;
     }   
  }
  addUser(user:any){
  
    var id = this.shortlistedUserList.length + 1;
    var found = this.shortlistedUserList.some(function (el) {
      return el.id === user.id;
    });
    if (!found) {
      this.shortlistedUserList.push(user);
    }else{
      alert('This user - '+user.login+' already shortlisted');
    }
      
  }
  
  cancelUser(user:any){
  //  console.log("user dta"+JSON.stringify(user));
    this.userList = this.userList.filter(function( obj ) {
      return obj.id !== user.id;
    });  
    $('#searchkey').val('');     
   // this.searchResult('');
  /*  this.userList = this.userList.filter(function( obj ) {
      return obj.id !== user.id;
    });*/
  }

  removeShortlisted(user:any){
    this.shortlistedUserList = this.shortlistedUserList.filter(function( obj ) {
      return obj.id !== user.id;
    });
  }

  getDetailedInfo(login:string){
    console.log('name'+login);
    $('#landingpage').hide();
    $('#detailedpage').show();
    this._userService.readUserDetailedInfo(login).subscribe(response => {
      //  console.log(response);
        this.userData=response;       
        console.log('response dta'+JSON.stringify(this.userData));
    },
    error => {
        console.log(error);
    });

  }
  goToLandingPage(){
    $('#landingpage').show();
    $('#detailedpage').hide();
  }

}
