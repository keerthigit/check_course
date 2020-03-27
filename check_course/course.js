
function validateTextField(str){
    var numchar = /^[0-9a-zA-Z :-]+$/;
	if(!numchar.test(str)) {
      	return false;
    }
    var scount = str.split(' ').length-1;
    if( scount > 3 || scount == 0 ){
        return false;
    }
    return true;
}


function getSearchParameters() {

  var str = document.forms["myForm"]["scourse"].value.trim();

  if(!validateTextField(str)){
     document.getElementById("errorMsg").innerHTML = "Error Message: Invalid Input Search String [1]";
     return false;
  }
 
  var str = str+'.';
  
  var dept = '';
  var course = ''
  var semester = '';
  var year = ''; 
  var temp ='';
  var errorMsg = '';

  var strlen = str.length;
  for (var i = 0; i < strlen; i++) {
   	 var c = str[i];
      
     temp = temp + c;
     
     if(isSpecialChar(c)){
      	dept= temp.slice(0, -1);
      	temp ='';
      	continue;
     }
       
    if( isSpace(c) || c =='.'){
    	temp = temp.slice(0, -1);
        if(isAlphabetic(temp)){
        	if(dept==''){
       		  dept = temp;
          	  temp ='';
          	  continue;
            }
        }
        if(isNumeric(temp)){
        	if(course==''){
          	  course = temp;
          	  temp = '';
          	  continue;
            }
        }
        if(isAlphaNumericChar(temp)){
        	if(dept=='' || course=='') {
	            var x = splitNumText(temp);
	            if(x.length==2){
	               dept = x[0];
	               course = x[1];
	               temp ='';
	               continue;
	               if(isNumeric(dep)){
	               	  errorMsg = "Error Message:  Invalid Input Search String [2]";
	               }
	            }
	            else{
	                  errorMsg = "Error Message:  Invalid Input Search String [3]";
	               }
	            }
	        }
        
        if(dept.length != 0 && course.length != 0) {
	        if(isNumeric(temp)){
	           if(temp.length==2){
		    	  year = formatYear(temp);
	           }else{
	           	  year=temp;
	           }
	           if(!validateYear(year)){
	        	  errorMsg = "Error Message:  Invalid Input Search String[3.2]";
	            }
	            temp='';
	        	continue;
	        }
            if(isAlphaNumericChar(temp)){
            	var y = splitNumText(temp);
	            if(y.length==2){
	               semester  = y[0];
	               semester = formatSemester(semester.toString());
	               
	               year = y[1];	               
	               year = formatYear(year.toString());
                   
	               if(!validateSemester(semester)){
                  	  errorMsg = "Error Message:  Invalid Input Search String[4]";
	        		}

	        		if(!validateYear(year)){
	        			errorMsg = "Error Message:  Invalid Input Search String[4.1]";
	        		}

	               temp ='';
	               continue;
	               if(!isNumeric(year)){
	               	  errorMsg = "Error Message:  Invalid Input Search String[5]";
	               }
	            }
	            else{
	                  errorMsg = "Error Message:  Invalid Input Search String[6]";
	               }
	         }
	        else{
	        	semester = formatSemester(temp);
	        	if(!validateSemester(semester)){
                   errorMsg = "Error Message:  Invalid Input Search String[7]";
	        	}
	        	temp='';
	            continue;
	        }
	    }
      } 
    }
  
  if(dept=='' || course =='' || year== '' || semester=='') {
    errorMsg = "Error Message: Invalid Input Search String[8]";
  }

  if(errorMsg!=''){
    document.getElementById("errorMsg").innerHTML = errorMsg;
  }
  else{
    document.getElementById("department").innerHTML = dept;
    document.getElementById("courseNumber").innerHTML = course;
    document.getElementById("year").innerHTML = year;
    document.getElementById("semester").innerHTML = semester;
    document.getElementById("errorMsg").innerHTML = '';
  }

  return false;
}

function formatSemester(strsemester){
  var semester = '';
  switch(strsemester) {
	  case 'F':
	    semester ='FALL';
	    break;
	  case 'W':
	    semester ='WINTER';
	    break;
	  case 'S':
	    semester ='SPRING';
	    break;
	  case 'Su':
	    semester ='SUMMER';
	    break;
	  default: 
	    semester =strsemester;
	} 
	return semester.toUpperCase();
}


function formatYear(stryear){
    var strleng = stryear.length;
    if(strleng == 2){
    	stryear = '20'+stryear;
	    return stryear 
	}
	else{
		return stryear;
	}
}

function validateSemester(strsemester) {
  if(strsemester=='FALL' || strsemester=="SUMMER" || strsemester=='SPRING' || strsemester=="WINTER"){
  	return true;
  }
  return false;
}

function validateYear(year){
	if(year>=2000 && year<=2099){
  	return true;
  }
  return false;
}

function isAlphabetic(stg) { 
	var format = /^[a-zA-Z]+$/;
    if(format.test(stg)) {
      	return true;
    }
    else{
        return false;
    }
}

function isNumeric(ch) { 
     var numeric = /^[0-9]+$/;
     if(numeric.test(ch)) {
       return true;
    }
    else{
       return false;
    }
}

function isSpace(stg){
	var letters = /\s/;
    if(letters.test(stg)) {
      	return true;
    }
    else{
        return false;
    }
}

function isSpecialChar(stg){
	var spchar = /^[:-]+$/;
    if(spchar.test(stg)) {
      	return true;
    }
    else{
        return false;
    }
}

function isAlphaNumericChar(stg){
    if(stg.match("[a-zA-Z]+") && stg.match("[0-9]+")) {
       return true;
    }else{
       return false;
    }
}

function splitNumText(stg) { 
    var num = stg.match(/\d+/g);
    var letr= stg.match(/[a-zA-Z]+/g);
   
    var myArray = new Array();
    if (num == null && num == undefined) {
       return myArray;
    }
    if (letr == null && letr == undefined) {
       return myArray;
    }
    if (stg != letr + num){
       return myArray;
    }
    myArray[0] = letr;
    myArray[1] = num;
    return myArray;
} 

function clearForm(){
	document.forms["myForm"]["scourse"].value = "";
    document.getElementById("department").innerHTML = "";
    document.getElementById("courseNumber").innerHTML = "";
    document.getElementById("semester").innerHTML = "";
    document.getElementById("year").innerHTML = "";
	document.getElementById("errorMsg").innerHTML = "";
}
