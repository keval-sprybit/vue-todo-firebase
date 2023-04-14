/* Custom Code */

var messageList = {
	commonFail : 'Something went wrong please try again'
}

var sessionExpiredTimeRedirection = BASE_URL+'dashboard';

// Common Variables
var ajaxLoader = true;
var DEALER_ID = '';
var BRANCH_ID = '';
var VEHICLE_ID = '';

var commonFunction = {
	ResponseHandleFail: function (response) {
		if(!response.status)
		{
			if(response.status_code == 412)
			{
				location.reload();
			}
			else
			{
				commonFunction.regularAlert('error', response.message);
			}
		}
	},
	cutString:function(string, limit){
			var out = strlen(string) > limit ? substring(string, 0, limit)+"..." : string;
			return out;
	},
	ValidateEmail: function (inputText) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(inputText) == false) {
            return false;
        }
        return true;
    },
    ValidateOtp: function (inputText) {
        var reg = /^\d{6}$/;
        if (reg.test(inputText) == false) {
            return false;
        }
        return true;
    },
    ValidateDateTime : function (start_date,start_time,end_date,end_time) {
       if(
			start_date !='' &&
			start_time!='' &&
			end_date !='' &&
			end_time !='' 
		)
		{
			
			var startDate = new Date(start_date+' 00:00:00');
			var endDate = new Date(end_date+' 00:00:00');
			var startTime = new Date('1875-01-01 '+start_time);
			var endTime = new Date('1875-01-01 '+end_time);
			var timeObj = jQuery('#en_time');
			var st_date_timeObj = jQuery('#st_time');
			var dateObj = jQuery('#en_date');
			var startDateTime = new Date(start_date+" "+start_time+":00");
			var endDateTime = new Date(end_date+" "+end_time+':00');
			// var today = new Date(); 
			var today = new Date(new Date().toLocaleString('en', {timeZone: APP_TIMEZONE})); //'Africa/Johannesburg'  
			// console.log("today",today);
			timeObj.removeClass('is-invalid'); // Remove Class
			dateObj.removeClass('is-invalid'); // Remove Class
			if (startDate > endDate) {
				dateObj.after('<div class="invalid-feedback error-msg">End date must be after start date </div>');
				dateObj.addClass('is-invalid');
				// errorCount++;
        		return false;
			}
			else if(startDateTime.toDateString() == today.toDateString() || endDateTime.toDateString()==today.toDateString())
			{
				//check time
				if(today.getTime()>startDateTime.getTime())
				{
					st_date_timeObj.after('<div class="invalid-feedback error-msg">Start time must be after current time</div>');
					st_date_timeObj.addClass('is-invalid');
					// errorCount++;
        			return false;
				}
				else if(today.getTime()>endDateTime.getTime())
				{
					timeObj.after('<div class="invalid-feedback error-msg">End time must be after current time</div>');
					timeObj.addClass('is-invalid');
					// errorCount++;
        			return false;
				}
				else if(startDate.toDateString() == endDate.toDateString())
				{
					if(startTime >= endTime)
					{
						timeObj.after('<div class="invalid-feedback error-msg">End time must be after start time </div>');
						timeObj.addClass('is-invalid');
						// errorCount++;
						return false;
					}
				}
			}
			else if(startDate.toDateString() == endDate.toDateString())
			{
				if(startTime >= endTime)
				{
					timeObj.after('<div class="invalid-feedback error-msg">End time must be after start time </div>');
					timeObj.addClass('is-invalid');
					// errorCount++;
        			return false;
				}
			}
			
			return true;
		}
    },
    regularAlert: function (type, title) {
        const Toast = Swal.mixin({
		  toast: true,
		  position: 'top-end',
		  showConfirmButton: false,
		  timer: 3000,
		  timerProgressBar: true,
		  didOpen: (toast) => {
		    toast.addEventListener('mouseenter', Swal.stopTimer)
		    toast.addEventListener('mouseleave', Swal.resumeTimer)
		  }
		})

		Toast.fire({
		  icon: type,
		  title: title
		})
    },
    confirmAlert: function (title, text, callback) {

    	if(title == '')
	  	{
	  		title = 'Are you sure?';
	  	}
	  	if(text == '')
	  	{
	  		text = "You won't be able to revert this!";
	  	}

      	Swal.fire({
		  title: title,
		  text: text,
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) 
			{
			    callback({
			    	"status": true
			    });
			}
			else
			{
			  	callback({
			    	"status": false
			    });
			}
		})
		
    },
    confirmCustomAlert: function (icon, title, text, confirmBtnText, callback) {

    	if(title == '')
	  	{
	  		title = 'Are you sure?';
	  	}
	  	if(text == '')
	  	{
	  		text = "You won't be able to revert this!";
	  	}
	  	if(confirmBtnText == '')
	  	{
	  		confirmBtnText = 'Yes, delete it!';
	  	}

      	Swal.fire({
		  title: title,
		  text: text,
		  icon: icon, // 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: confirmBtnText
		}).then((result) => {
			if (result.value) 
			{
			    callback({
			    	"status": true
			    });
			}
			else
			{
			  	callback({
			    	"status": false
			    });
			}
		})
		
    },
    displayMessage: function (errorData, mainTitle, secondTitle) {
    	Swal.fire({
		  type: errorData,
		  title: mainTitle,
		  text: secondTitle
		})
    },
    alphanumericAllow: function(e) {
    	var keyCode = e.keyCode;
    	if(keyCode != 8 && keyCode != 37 && keyCode != 39)
    	{
	    	var regex = new RegExp("^[a-zA-Z]+$");
		    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		    if (regex.test(str)) {
		        return true;
		    }

		    e.preventDefault();
		    return false;
	    }
    },
    onlyLetters: function(str) 
    {
	    var reg = new RegExp("[^a-zA-Z]");
	    return reg.test(str)
    },
    onlyLettersNumber: function(str) 
    {
	    var reg = new RegExp("[^a-zA-Z0-9]");
	    return reg.test(str)
    },
    onlyLettersNumberWithSpace: function(str) 
    {
	    var reg = new RegExp("[^a-zA-Z0-9 ]");
	    return reg.test(str)
    },
    onlyNumber: function(str) 
    {
	    var reg = new RegExp("[^0-9]");
	    return reg.test(str)
    },
    onlyNumberWithDot: function(str) 
    {
	    var reg = new RegExp("[^0-9.]");
	    return reg.test(str)
    },
    secondsToDhms: function(seconds) 
    {
	    seconds = Number(seconds);
		var d = Math.floor(seconds / (3600*24));
		var h = Math.floor(seconds % (3600*24) / 3600);
		var m = Math.floor(seconds % 3600 / 60);
		var s = Math.floor(seconds % 3600 % 60);

		var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
		var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
		var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
		var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
		return dDisplay + hDisplay + mDisplay + sDisplay;
    },
    readAndSetURLFromImage: function(input, targetId)
    {
    	if (input.files && input.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            jQuery(targetId).attr('src', e.target.result);
	        }
	        reader.readAsDataURL(input.files[0]);
	    }
    },
    getWeekOfMonth(date) // Get week number of month
    {
		/*var temp_month = date.getMonth(); //current month
		var temp_year = date.getFullYear(); //current year

	    var firstDay = new Date(temp_year, temp_month, 1);
	    var lastDay = new Date(temp_year, temp_year+1, 0);*/

		var day = date.getDate()
		  
		day -=( date.getDay() == 0 ? 1: date.getDay()  ); // Get monday of this week

 	    day+=7;

		prefixes = ['0', '1', '2', '3', '4', '5'];
		return prefixes[0 | (day) / 7];
	},
	cutString: function (string, count) {
		if(string != '' && string != null)
		{
			var n = string.length;
			if(n > count)
			{
				return string.slice(0, count)+'...';
			}
			else
			{
				return string.slice(0, count);	
			}
		}
		else
		{
			return string;
		}
	},
	twoDigitAfterDot: function(numberString)
	{
		numberString = parseFloat(numberString);
		if(numberString != '')
		{
			return numberString.toFixed(2);
		}
		else
		{
			return '00.00';
		}
		
	}
}

	// Obj
	var processFunctionObj = {

	upload_picture_process: function(that_defined, callback)
	{
		ajaxLoader = true;
		if(that_defined[0].files[0] != '' && that_defined[0].files[0] !== undefined)
		{
			var formData = new FormData();
      		// formData.append('picture', that_defined[0].files[0]);
			for (var i = 0; i < that_defined[0].files.length; ++i)
			{
				formData.append('picture', that_defined[0].files[i]);
			}
			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/common/image/upload",
				data: formData,
				datatype: "json",
		        contentType: false,
		        processData: false,
				success: function (data) {
					if(data.status)
					{
						var response_data =  {
							status: true,
							data:  data.data
						}
						callback(response_data);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
			
		}
	},
	upload_document_process: function(that_defined, callback)
	{
		ajaxLoader = true;

		if(that_defined[0].files[0] != '' && that_defined[0].files[0] !== undefined)
		{
			var formData = new FormData();
      		formData.append('document', that_defined[0].files[0]);
			
			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/common/document/upload",
				data: formData,
				datatype: "json",
		        contentType: false,
		        processData: false,
				success: function (data) {
					if(data.status)
					{
						var response_data =  {
							status: true,
							data:  data.data
						}
						callback(response_data);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	login_process: function()
	{
		var errorCount = 0;
		jQuery('#form-login .error-msg').remove(); // Remove Error Message
		jQuery('#form-login').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			else if(inputId == 'id-email')
			{
				if(!commonFunction.ValidateEmail(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid email!</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
			}
		})

		if(errorCount == 0)
		{
			var username = jQuery('#id-email').val();
			var password = jQuery('#id-password').val();
			var userinfo = { username: username, password: password };
			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/login",
				data: JSON.stringify(userinfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						location.href = BASE_URL+'dashboard';
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	profile_update: function()
	{
		var errorCount = 0;
		jQuery('#form-profile-update .error-msg').remove(); // Remove Error Message
		jQuery('#form-profile-update').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			else if(inputId == 'id-email')
			{
				if(!commonFunction.ValidateEmail(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid email!</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
			}
		})

		jQuery('#id-repassword, #id-password').removeClass('is-invalid');
		var password_change_value = jQuery('#id-password-change').is(':checked');
		if(password_change_value)
		{
			var password_text = jQuery('#id-password').val();
			var repassword_text = jQuery('#id-repassword').val();

			if(password_text == '')
			{
				jQuery('#id-password').after('<div class="invalid-feedback error-msg">Please enter password!</div>');
				jQuery('#id-password').addClass('is-invalid');
				errorCount++;
			}
			if(repassword_text == '')
			{
				jQuery('#id-repassword').after('<div class="invalid-feedback error-msg">Please enter password!</div>');
				jQuery('#id-repassword').addClass('is-invalid');
				errorCount++;
			}
			if(password_text != '' && repassword_text != '' && password_text != repassword_text)
			{
				jQuery('#id-repassword').after('<div class="invalid-feedback error-msg">Password & Re-enter password must match</div>');
				jQuery('#id-repassword').addClass('is-invalid');
				errorCount++;
			}
		}

		if(errorCount == 0)
		{
			var name = jQuery('#id-name').val();
			var email = jQuery('#id-email').val();
			var password = jQuery('#id-password').val();
			var image_name_attr = jQuery('#id-profile-pic').attr('new_image_name');
			if(typeof image_name_attr == 'undefined')
			{
				var image_name_attr = '';
			}

			if(password_change_value)
			{
				var password_update_status = '1';
			}
			else
			{
				var password_update_status = '2';
			}

			var datainfo = { 
								name: name, 
								email: email, 
								password_update_status: password_update_status,
								password: password,
								image_name: image_name_attr
							};


			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/profile/update",
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	
	dealer_status_update: function(dealer_status, dealer_id, callback)
	{
		var datainfo = { 
				status: dealer_status
			};
		jQuery.ajax({
			type: "POST",
			url: BASE_URL+"portal-api/dealer/status/update/"+dealer_id,
			data: JSON.stringify(datainfo),
			contentType: "application/json",
			datatype: "html",
			success: function (data) {
				if(data.status)
				{
					commonFunction.regularAlert('success', data.message);
					callback({
						status: true
					})
				}
				else if(!data.status)
				{
					commonFunction.ResponseHandleFail(data);
					callback({
						status: false
					})
				}
				else
				{
					commonFunction.regularAlert('error', messageList.commonFail);
					callback({
						status: false
					})
				}
			},
			error: function (data) {
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		});
	},
	dealer_update: function()
	{
		var errorCount = 0;
		jQuery('#form-dealer-update .error-msg').remove(); // Remove Error Message
		jQuery('#form-dealer-update').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			else if(inputId == 'id-email')
			{
				if(!commonFunction.ValidateEmail(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter password!</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
				
			}
			else if(inputId == 'id-contact_no')
			{
				if(commonFunction.onlyNumberWithDot(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid number</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
				
			}
		})

		jQuery('#id-repassword, #id-password').removeClass('is-invalid');
		var password_change_value = jQuery('#id-password-change').is(':checked');
		if(password_change_value)
		{
			var password_text = jQuery('#id-password').val();
			var repassword_text = jQuery('#id-repassword').val();

			if(password_text == '')
			{
				jQuery('#id-password').after('<div class="invalid-feedback error-msg">Please enter password!</div>');
				jQuery('#id-password').addClass('is-invalid');
				errorCount++;
			}
			else if(password_text.length<6)
			{
				jQuery('#id-password').after('<div class="invalid-feedback error-msg">Password must have 6 length!</div>');
				jQuery('#id-password').addClass('is-invalid');
				errorCount++;
			}
			if(repassword_text == '')
			{
				jQuery('#id-repassword').after('<div class="invalid-feedback error-msg">Please enter re-enter password!</div>');
				jQuery('#id-repassword').addClass('is-invalid');
				errorCount++;
			}
			else if(repassword_text.length<6)
			{
				jQuery('#id-repassword').after('<div class="invalid-feedback error-msg">Password must have 6 length!</div>');
				jQuery('#id-repassword').addClass('is-invalid');
				errorCount++;
			}
			if(password_text != '' && repassword_text != '' && password_text != repassword_text && password_text.length >5 && repassword_text.length>5)
			{
				jQuery('#id-repassword').after('<div class="invalid-feedback error-msg">Password & Re-enter password must match</div>');
				jQuery('#id-repassword').addClass('is-invalid');
				errorCount++;
			}
		}

		if(errorCount == 0)
		{
			var first_name = jQuery('#id-first_name').val();
			var surname = jQuery('#id-surname').val();
			var email = jQuery('#id-email').val();
			var company_name = jQuery('#id-company_name').val();
			var ck_number = jQuery('#id-ck_number').val();
			var vat_number = jQuery('#id-vat_number').val();
			var contact_no = jQuery('#id-contact_no').val();
			var password = jQuery('#id-password').val();
			var image_name_attr = jQuery('#id-dealer-profile-pic').attr('new_image_name');
			if(typeof image_name_attr == 'undefined')
			{
				var image_name_attr = '';
			}

			if(!password_change_value)
			{
				var password = '';
			}

			var datainfo = { 
								first_name: first_name, 
								surname: surname, 
								company_name: company_name,
								ck_number: ck_number,
								email: email,
								password: password,
								picture: image_name_attr,
								vat_number: vat_number,
								contact_no: contact_no
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/dealer/update/"+DEALER_ID,
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	branch_status_update: function(branch_status, branch_id, callback)
	{
		var datainfo = { 
				status: branch_status
			};
		jQuery.ajax({
			type: "POST",
			url: BASE_URL+"portal-api/branch/status/update/"+branch_id,
			data: JSON.stringify(datainfo),
			contentType: "application/json",
			datatype: "html",
			success: function (data) {
				if(data.status)
				{
					commonFunction.regularAlert('success', data.message);
					callback({
						status: true
					})
				}
				else if(!data.status)
				{
					commonFunction.ResponseHandleFail(data);
					callback({
						status: false
					})
				}
				else
				{
					commonFunction.regularAlert('error', messageList.commonFail);
					callback({
						status: false
					})
				}
			},
			error: function (data) {
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		});
	},
	branch_add: function()
	{
		var errorCount = 0;
		jQuery('#form-branch-add .error-msg').remove(); // Remove Error Message
		jQuery('#form-branch-add').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			
			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
		})

		if(errorCount == 0)
		{
			var title = jQuery('#id-title').val();
			var province_id = jQuery('#id-province_list').val();

			var datainfo = { 
								title: title,
								province_id:province_id
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/branch/add",
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						location.href = BASE_URL+'branch';
						commonFunction.regularAlert('success', data.message);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	branch_update: function()
	{
		var errorCount = 0;
		jQuery('#form-branch-update .error-msg').remove(); // Remove Error Message
		jQuery('#form-branch-update').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
		})

		if(errorCount == 0)
		{
			var title = jQuery('#id-title').val();
			var province_id = jQuery('#id-province_list').val();

			var datainfo = { 
								title: title,
								province_id:province_id
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/branch/update/"+BRANCH_ID,
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	vehicle_basic_data_update: function()
	{
		var errorCount = 0;
		jQuery('#form-vehicle-basic-data-update .error-msg').remove(); // Remove Error Message
		jQuery('#form-vehicle-basic-data-update').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			else if(inputId == 'id-reserve')
			{
				if(commonFunction.onlyNumberWithDot(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid number</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
				
			}
			else if(inputId == 'id-trade')
			{
				if(commonFunction.onlyNumberWithDot(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid number</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
				
			}
			else if(inputId == 'id-retail')
			{
				if(commonFunction.onlyNumberWithDot(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid number</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
				
			}
			else if(inputId == 'id-recent_selling_price')
			{
				if(commonFunction.onlyNumberWithDot(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid number</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
				
			}
			else if(inputId == 'id-opening_bid')
			{
				if(commonFunction.onlyNumberWithDot(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid number</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
				
			}
		})

		if(errorCount == 0)
		{
			var registration_year = jQuery('#id-registration_year').val();
			var brand = jQuery('#id-brand').val();
			var variant = jQuery('#id-variant').val();
			var model = jQuery('#id-model').val();
			var service_history = jQuery('#id-service_history').val();
			var vehicle_type = jQuery('#id-vehicle_type').val();
			var km_range_id = jQuery('#id-km_range').val();
			var condition_id = jQuery('#id-condition').val();
			var transmission = jQuery('#id-transmission').val();
			var reserve_value = jQuery('#id-reserve').val();
			var trade_value = jQuery('#id-trade').val();
			var retail_value= jQuery('#id-retail').val();
			var recent_selling_price = jQuery('#id-recent_selling_price').val();
			var opening_bid = jQuery('#id-opening_bid').val();
			
			var fuel= jQuery('#id-fuel').val();
			var engine_size_cc= jQuery('#id-engine_size_cc').val();
			var engine_number= jQuery('#id-engine_number').val();
			var colour= jQuery('#id-colour').val();
			var registration_no= jQuery('#id-registration_no').val();
			
			var document_name_attr = jQuery('#id-vehicle-appraisal-document').attr('new_doc_name');
			if(typeof document_name_attr == 'undefined')
			{
				var document_name_attr = '';
			}

			var datainfo = { 
								registration_year: registration_year,
								brand: brand,
								variant: variant,
								model: model,
								service_history: service_history,
								vehicle_type: vehicle_type,
								km_range_id: km_range_id,
								condition_id: condition_id,
								transmission: transmission,
								reserve_value: reserve_value,
								trade_value: trade_value,
								retail_value: retail_value,
								recent_selling_price: recent_selling_price,
								opening_bid: opening_bid,
								fuel:fuel,
								engine_size_cc:engine_size_cc,
								engine_number:engine_number,
								colour:colour,
								registration_no:registration_no,
								appraisal_document: document_name_attr
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/vehicle/vahicle/basic/update/"+VEHICLE_ID,
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
						setTimeout(function(){
							location.reload();
						}, 2000)
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	vehicle_status_update: function(vehicle_status, vehicle_id, callback)
	{
		var datainfo = { 
				status: vehicle_status
			};
		jQuery.ajax({
			type: "POST",
			url: BASE_URL+"portal-api/vehicle/status/update/"+vehicle_id,
			data: JSON.stringify(datainfo),
			contentType: "application/json",
			datatype: "html",
			success: function (data) {
				if(data.status)
				{
					commonFunction.regularAlert('success', data.message);
					callback({
						status: true
					})
				}
				else if(!data.status)
				{
					commonFunction.ResponseHandleFail(data);
					callback({
						status: false
					})
				}
				else
				{
					commonFunction.regularAlert('error', messageList.commonFail);
					callback({
						status: false
					})
				}
			},
			error: function (data) {
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		});
	},
	email_template_add: function()
	{
		var errorCount = 0;
		jQuery('#form-email-template-add .error-msg').remove(); // Remove Error Message
		jQuery('#form-email-template-add').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
		})

		if(errorCount == 0)
		{
			var type = jQuery('#id-type').val();
			var title = jQuery('#id-title').val();
			var key = jQuery('#id-key').val();
			var subject = jQuery('#id-subject').val();
			var body = jQuery('#id-body').val();
			var information = jQuery('#id-information').val();

			var datainfo = { 
								type: type,
								title: title,
								key: key,
								subject: subject,
								body: body,
								information: information
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/email/add",
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						location.href = BASE_URL+'email';
						commonFunction.regularAlert('success', data.message);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	email_template_update: function()
	{
		var errorCount = 0;
		jQuery('#form-email-template-update .error-msg').remove(); // Remove Error Message
		jQuery('#form-email-template-update').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
		})

		if(errorCount == 0)
		{
			var title = jQuery('#id-title').val();
			var subject = jQuery('#id-subject').val();
			var body = jQuery('#id-body').val();
			var information = jQuery('#id-information').val();

			var datainfo = { 
								title: title,
								subject: subject,
								body: body,
								information: information
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/email/update/"+EMAIL_TEMPLATE_ID,
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	contactus_status_update: function(dealer_status, contactus_id, callback)
	{
		var datainfo = { 
				status: dealer_status
			};
		jQuery.ajax({
			type: "POST",
			url: BASE_URL+"portal-api/contactus/status/update/"+contactus_id,
			data: JSON.stringify(datainfo),
			contentType: "application/json",
			datatype: "html",
			success: function (data) {
				if(data.status)
				{
					commonFunction.regularAlert('success', data.message);
					callback({
						status: true
					})
				}
				else if(!data.status)
				{
					commonFunction.ResponseHandleFail(data);
					callback({
						status: false
					})
				}
				else
				{
					commonFunction.regularAlert('error', messageList.commonFail);
					callback({
						status: false
					})
				}
			},
			error: function (data) {
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		});
	},
	auction_add: function()
	{
		var errorCount = 0;
		jQuery('#form-auction-add .error-msg').remove(); // Remove Error Message
		/*require validation*/
		jQuery('#form-auction-add').find('.req').each(function()
		{
			var that = jQuery(this);
			var inputVal = that.val();
			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
		});
		
		/*car list validation*/
		if(jQuery('#form-auction-add .req-one:checked').length == 0)
		{
			var that = jQuery('#form-auction-add .req-one').first();
			var inputVal = that.val();
			inputVal = jQuery.trim(inputVal);
			that.parents('.vehicle-listing-section').find('.card-title').after('<div class="invalid-feedback error-msg"> Please select at least one option</div>');
			errorCount++;
		}
		/* date validations */
		let start_date = jQuery('#st_date').val();
		let start_time = jQuery('#st_time').val();
		let end_date = jQuery('#en_date').val();
		let end_time = jQuery('#en_time').val();
		
		if(!commonFunction.ValidateDateTime(start_date,start_time,end_date,end_time))
		{
			errorCount++;
		}
		if(errorCount == 0)
		{
			var title = jQuery('#id-title').val();
			var description = jQuery('#id-desc').val();
			let start_date = jQuery('#st_date').val();
			let start_time = jQuery('#st_time').val();
			let end_date = jQuery('#en_date').val();
			let end_time = jQuery('#en_time').val();
			var vehicle_list = [];	
			jQuery("input[name^='vehicle_ids']:checked").each(function(index, el) {
				vehicle_list.push($(el).val());
			});
			// var vehicle_list = jQuery("input[name^='vehicle_ids']").map(function(index, elem) {
			// 	return $(elem).val();
			// });
			var datainfo = { 
								title: title,
								description: description,
								start_date: start_date,
								start_time: start_time,
								end_date: end_date,
								end_time: end_time,
								vehicle_list: vehicle_list
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/auction/add",
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					// console.log(data);
					if(data.status)
					{
						location.href = BASE_URL+'auction';
						commonFunction.regularAlert('success', data.message);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	auction_edit: function()
	{
		var errorCount = 0;
		jQuery('#form-auction-edit .error-msg').remove(); // Remove Error Message
		/*require validation*/
		jQuery('#form-auction-edit').find('.req').each(function()
		{
			var that = jQuery(this);
			var inputVal = that.val();
			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;

			}
		});
		
		/*car list validation*/
		if(jQuery('#form-auction-edit .req-one:checked').length == 0)
		{
			var that = jQuery('#form-auction-edit .req-one').first();
			var inputVal = that.val();
			inputVal = jQuery.trim(inputVal);
			that.parents('.vehicle-listing-section').find('.card-title').after('<div class="invalid-feedback error-msg"> Please select at least one option</div>');
			errorCount++;


		}
		/* date validations */
		let start_date = jQuery('#st_date').val();
		let start_time = jQuery('#st_time').val();
		let end_date = jQuery('#en_date').val();
		let end_time = jQuery('#en_time').val();
		if(!commonFunction.ValidateDateTime(start_date,start_time,end_date,end_time))
		{
			errorCount++;

		}
		if(errorCount == 0)
		{
			var auction_id = jQuery('#id-auction-id').val();
			var title = jQuery('#id-title').val();
			var description = jQuery('#id-desc').val();
			let start_date = jQuery('#st_date').val();
			let start_time = jQuery('#st_time').val();
			let end_date = jQuery('#en_date').val();
			let end_time = jQuery('#en_time').val();
			var vehicle_list = [];	
			jQuery("input[name^='vehicle_ids']:checked").each(function(index, el) {
				vehicle_list.push($(el).val());
			});
			var datainfo = {
								title: title,
								description: description,
								start_date: start_date,
								start_time: start_time,
								end_date: end_date,
								end_time: end_time,
								vehicle_list: vehicle_list
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/auction/edit/"+auction_id,
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					
					// console.log(data);
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
						setTimeout(location.href = BASE_URL+'auction/edit/'+auction_id, 5000);
						// location.href = BASE_URL+'auction/edit/'+auction_id;
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	vehicle_basic_data: function(vehicle_id, callback)
	{
		jQuery.ajax({
			type: "POST",
			url: BASE_URL+"portal-api/vehicle/get/"+vehicle_id,
			data: {},
			contentType: "application/json",
			datatype: "html",
			success: function (data) {
				callback(data);
			},
			error: function (data) {
				commonFunction.regularAlert('error', messageList.commonFail);
				callback(false);
			}
		});
	},
	province_add: function()
	{
		  var errorCount = 0;
		  jQuery('#form-province-add .error-msg').remove(); // Remove Error Message
		  jQuery('#form-province-add').find('.req').each(function(){
			  var that = jQuery(this);
			  var inputVal = that.val();
			  var inputId = that.attr('id');
  
			  inputVal = jQuery.trim(inputVal);
			  that.removeClass('is-invalid'); // Remove Class
  
			  if(inputVal == '')
			  {
				  var placeHolderText = that.attr('placeholder');
				  that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				  that.addClass('is-invalid');
				  errorCount++;
			  }
		  });
  
		  if(errorCount == 0)
		  {
			  var title = jQuery('#id-title').val();
  
			  var datainfo = { 
								  title: title
							  };
  
			  jQuery.ajax({
				  type: "POST",
				  url: BASE_URL+"portal-api/province/add",
				  data: JSON.stringify(datainfo),
				  contentType: "application/json",
				  datatype: "html",
				  success: function (data) {
					  if(data.status)
					  {
						  location.href = BASE_URL+'province';
						  commonFunction.regularAlert('success', data.message);
					  }
					  else if(!data.status)
					  {
						  commonFunction.ResponseHandleFail(data);
					  }
					  else
					  {
						  commonFunction.regularAlert('error', messageList.commonFail);
					  }
				  },
				  error: function (data) {
					  commonFunction.regularAlert('error', messageList.commonFail);
				  }
			  });
		  }
	  },
	  province_update: function()
      {
		
		var errorCount = 0;
		jQuery('#form-province-update .error-msg').remove(); // Remove Error Message
		jQuery('#form-province-update').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
		})

		if(errorCount == 0)
		{
			var title = jQuery('#id-title').val();

			var datainfo = { 
								title: title
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/province/update/"+PROVINCE_ID,
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	  },
	 province_status_update: function(province_status, province_id, callback)
		{
		var datainfo = { 
				status: province_status
			};
		jQuery.ajax({
			type: "POST",
			url: BASE_URL+"portal-api/province/status/update/"+province_id,
			data: JSON.stringify(datainfo),
			contentType: "application/json",
			datatype: "html",
			success: function (data) {
				if(data.status)
				{
					commonFunction.regularAlert('success', data.message);
					callback({
						status: true
					})
				}
				else if(!data.status)
				{
					commonFunction.ResponseHandleFail(data);
					callback({
						status: false
					})
				}
				else
				{
					commonFunction.regularAlert('error', messageList.commonFail);
					callback({
						status: false
					})
				}
			},
			error: function (data) {
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		});
	},
	vehicle_image_add: function(vehicle_id,image_name,callback)
	{
		var datainfo = { 
			image_name: image_name,
				vehicle_id: vehicle_id,
			};
			
		jQuery.ajax({
			type: "POST",
			url: BASE_URL+"portal-api/vehicle/image/add",
			data: JSON.stringify(datainfo),
			contentType: "application/json",
			datatype: "html",
			success: function (data) {
				if(data.status)
				{
					// commonFunction.regularAlert('success', data.message);
					callback({
						status: true,
						data: data.data

					})
				}
				else if(!data.status)
				{
					commonFunction.ResponseHandleFail(data);
					callback({
						status: false
					})
				}
				else
				{
					commonFunction.regularAlert('error', messageList.commonFail);
					callback({
						status: false
					})
				}
			},
			error: function (data) {
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		});
	},
	vehicle_image_delete: function(image_id,callback)
	{
		var datainfo = { 
				image_id: image_id,
			};
		jQuery.ajax({
			type: "POST",
			url: BASE_URL+"portal-api/vehicle/image/delete",
			data: JSON.stringify(datainfo),
			contentType: "application/json",
			datatype: "html",
			success: function (data) {
				if(data.status)
				{
					commonFunction.regularAlert('success', data.message);
					callback({
						status: true
					})
				}
				else if(!data.status)
				{
					commonFunction.ResponseHandleFail(data);
					callback({
						status: false
					})
				}
				else
				{
					commonFunction.regularAlert('error', messageList.commonFail);
					callback({
						status: false
					})
				}
			},
			error: function (data) {
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		});
	},
	 
	adminUser_status_update: function(adminUser_status, adminUser_id, callback)
	{
		var datainfo = { 
				status: adminUser_status
			};
		jQuery.ajax({
			type: "POST",
			url: BASE_URL+"portal-api/adminUser/status/update/"+adminUser_id,
			data: JSON.stringify(datainfo),
			contentType: "application/json",
			datatype: "html",
			success: function (data) {
				if(data.status)
				{
					commonFunction.regularAlert('success', data.message);
					callback({
						status: true
					})
				}
				else if(!data.status)
				{
					commonFunction.ResponseHandleFail(data);
					callback({
						status: false
					})
				}
				else
				{
					commonFunction.regularAlert('error', messageList.commonFail);
					callback({
						status: false
					})
				}
			},
			error: function (data) {
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		});
	},
	forget_password_process: function()
	{
		var errorCount = 0;
		jQuery('#form-forget-password .error-msg').remove(); // Remove Error Message
		jQuery('#form-forget-password').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			else if(inputId == 'id-email')
			{
				if(!commonFunction.ValidateEmail(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid email!</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
			}
		})

		if(errorCount == 0)
		{
			var username = jQuery('#id-email').val();
			var userinfo = { email: username };
			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/forget-password",
				data: JSON.stringify(userinfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						if(data.data)
						{
							alert(data.data.otp);
						}
						commonFunction.regularAlert('success', data.message);
						// console.log(data);
						location.href = BASE_URL+'reset-password';
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	reset_password_process: function()
	{
		var errorCount = 0;
		jQuery('#form-reset-password .error-msg').remove(); // Remove Error Message
		jQuery('#form-reset-password').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');
			var type=that.attr('type');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			else if(inputId == 'id-email')
			{
				if(!commonFunction.ValidateEmail(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid email!</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
			}
			else if(inputId == 'id-otp')
			{
				if(!commonFunction.ValidateOtp(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid otp!</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
			}
			else if(type == 'password')
			{
				if(inputVal.length<6)
				{
					that.after('<div class="invalid-feedback error-msg">Password must have 6 length</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
				if(inputId == 'id-retype-password')
				{
					let new_password = jQuery('#id-password').val();
					if(new_password!==inputVal && inputVal.length >5)
					{
						that.after('<div class="invalid-feedback error-msg">Password and Confirm password did not matched</div>');
						that.addClass('is-invalid');
						errorCount++;
					}
				}
				
			}
			/*else if(inputId == 'id-retype-password')
			{
				let new_password = jQuery('#id-password').val();
				if(new_password!==inputVal)
				{
					that.after('<div class="invalid-feedback error-msg">Password and Retype password did not matched!</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
			}*/
		})

		if(errorCount == 0)
		{
			var username = jQuery('#id-email').val();
			var otp = jQuery('#id-otp').val();
			var password = jQuery('#id-password').val();
			var userinfo = { email: username, otp:otp, password:password };
			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/reset-password",
				data: JSON.stringify(userinfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
						// console.log(data);
						location.href = BASE_URL+'login';
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	// Admin user add 
	adminUser_add: function()
	{
		var errorCount = 0;
		jQuery('#form-adminUser .error-msg').remove(); // Remove Error Message
		jQuery('#form-adminUser').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');
			var type=that.attr('type');
			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			else if(inputId == 'id-email')
			{
				if(!commonFunction.ValidateEmail(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid email!</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
			}
			else if(type == 'password')
			{
				if(inputVal.length<6)
				{
					that.after('<div class="invalid-feedback error-msg">Password must have 6 length</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
			
			}

		})
		if(errorCount == 0)
		{
			var name = jQuery('#id-name').val();
			var email = jQuery('#id-email').val();
			var password = jQuery('#id-password').val();
			var designation_id = jQuery('#id-designation_id').val();
			var image_name_attr = jQuery('#id-adminUser-profile-pic').attr('new_image_name');

			if(typeof image_name_attr == 'undefined')
			{
				var image_name_attr = '';
			}


			var datainfo = { 
								name: name, 
								email: email,
								password: password,
								picture: image_name_attr,
								designation_id:designation_id
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/adminUser/add", 
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
						location.href = BASE_URL+'admin-user';
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	// Admin user update 
  
	adminUser_update: function()
	{
		var errorCount = 0;
		jQuery('#form-adminUser-update .error-msg').remove(); // Remove Error Message
		jQuery('#form-adminUser-update').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			else if(inputId == 'id-email')
			{
				if(!commonFunction.ValidateEmail(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid email!</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
			}
		})

		jQuery('#id-repassword, #id-password').removeClass('is-invalid');
		var password_change_value = jQuery('#id-password-change').is(':checked');
		if(password_change_value)
		{
			var password_text = jQuery('#id-password').val();
			var repassword_text = jQuery('#id-repassword').val();

			if(password_text == '')
			{
				jQuery('#id-password').after('<div class="invalid-feedback error-msg">Please enter password!</div>');
				jQuery('#id-password').addClass('is-invalid');
				errorCount++;
			}
			if(password_text.length<6)
			{
				jQuery('#id-password').after('<div class="invalid-feedback error-msg">Password must have 6 length!</div>');
				jQuery('#id-password').addClass('is-invalid');
				errorCount++;
			}
			if(repassword_text == '')
			{
				jQuery('#id-repassword').after('<div class="invalid-feedback error-msg">Please enter password!</div>');
				jQuery('#id-repassword').addClass('is-invalid');
				errorCount++;
			}
			if(repassword_text.length<6)
			{
				jQuery('#id-repassword').after('<div class="invalid-feedback error-msg">Password must have 6 length</div>');
				jQuery('#id-repassword').addClass('is-invalid');
				errorCount++;
			}
			if(password_text != '' && repassword_text != '' && password_text != repassword_text && repassword_text.length>5 && password_text.length>5)
			{
				jQuery('#id-repassword').after('<div class="invalid-feedback error-msg">Password & Re-enter password must match</div>');
				jQuery('#id-repassword').addClass('is-invalid');
				errorCount++;
			}

		}

		if(errorCount == 0)
		{
			var name = jQuery('#id-name').val();
			var email = jQuery('#id-email').val();
			var password = jQuery('#id-password').val();
			var designation_id = jQuery('#id-designation_id').val();
			var image_name_attr = jQuery('#id-adminUser-profile-pic').attr('new_image_name');
			if(typeof image_name_attr == 'undefined')
			{
				var image_name_attr = '';
			}

			if(!password_change_value)
			{
				var password = '';
			}

			var datainfo = { 
								name: name, 
								email: email,
								password: password,
								picture: image_name_attr,
								designation_id:designation_id
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/adminUser/update/"+AdminUserID,
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	// Designation add
	designation_add: function()
	{
		var errorCount = 0;
		jQuery('#form-designation-add .error-msg').remove(); // Remove Error Message
		jQuery('#form-designation-add').find('.req').each(function()
		{
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			
		
		})
		// for checkbox
		if(jQuery('#form-designation-add .req-one:checked').length == 0)
		{
			var that = jQuery('#form-designation-add .req-one').first();
			var inputVal = that.val();
			inputVal = jQuery.trim(inputVal);
			that.parents('.form-group').after('<div class="invalid-feedback error-msg"> Please select at least one role</div>');
			errorCount++;
		} 

		if(errorCount == 0)
		{
			var title = jQuery('#id-title').val();
			var note = jQuery('#id-note').val();
			var role_list = [];	
			
			jQuery(".req-one:checked").each(function(index, el) 
			{
				role_list.push(jQuery(this).val());
			});
		
			var datainfo = { 
								title: title, 
								note: note,
								role_list: role_list
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/designation/add", 
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
						location.href = BASE_URL+'designation';
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	// Designation add
	designation_update: function()
	{
		var errorCount = 0;
		jQuery('#form-designation-update .error-msg').remove(); // Remove Error Message
		jQuery('#form-designation-update').find('.req').each(function()
		{
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			
		
		})
		// for checkbox
		if(jQuery('#form-designation-update .req-one:checked').length == 0)
		{
			var that = jQuery('#form-designation-update .req-one').first();
			var inputVal = that.val();
			inputVal = jQuery.trim(inputVal);
			that.parents('.form-group').after('<div class="invalid-feedback error-msg"> Please select at least one role</div>');
			errorCount++;
		} 

		if(errorCount == 0)
		{
			var title = jQuery('#id-title').val();
			var note = jQuery('#id-note').val();
			var role_list = [];	
			
			jQuery(".req-one:checked").each(function(index, el) 
			{
				role_list.push(jQuery(this).val());
			});
		
			var datainfo = { 
								title: title, 
								note: note,
								role_list: role_list
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/designation/update/"+DESIGNATION_ID, 
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
						
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	// Designation delete
  
	designation_delete: function(designation_id, callback)
	{
	var datainfo = { 
			
		};
	jQuery.ajax({
		type: "POST",
		url: BASE_URL+"portal-api/designation/delete/"+designation_id,
		data: JSON.stringify(datainfo),
		contentType: "application/json",
		datatype: "html",
		success: function (data) {
			if(data.status)
			{
				commonFunction.regularAlert('success', data.message);
				callback({
					status: true
				})
			}
			else if(!data.status)
			{
				commonFunction.ResponseHandleFail(data);
				callback({
					status: false
				})
			}
			else
			{
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		},
		error: function (data) {
			commonFunction.regularAlert('error', messageList.commonFail);
			callback({
				status: false
			})
		}
	});
},
	// AdminUser delete
  
	adminUser_delete: function(adminUser_id, callback)
	{
	var datainfo = { 
			
		};
	jQuery.ajax({
		type: "POST",
		url: BASE_URL+"portal-api/adminUser/delete/"+adminUser_id,
		data: JSON.stringify(datainfo),
		contentType: "application/json",
		datatype: "html",
		success: function (data) {
			if(data.status)
			{
				commonFunction.regularAlert('success', data.message);
				callback({
					status: true
				})
			}
			else if(!data.status)
			{
				commonFunction.ResponseHandleFail(data);
				callback({
					status: false
				})
			}
			else
			{
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		},
		error: function (data) {
			commonFunction.regularAlert('error', messageList.commonFail);
			callback({
				status: false
			})
		}
		});
	},
	faq_add: function()
	{
		  var errorCount = 0;
		  jQuery('#form-faq-add .error-msg').remove(); // Remove Error Message
		  jQuery('#form-faq-add').find('.req').each(function(){
			  var that = jQuery(this);
			  var inputVal = that.val();
			  var inputId = that.attr('id');
  
			  inputVal = jQuery.trim(inputVal);
			  that.removeClass('is-invalid'); // Remove Class
  
			  if(inputVal == '')
			  {
				  var placeHolderText = that.attr('placeholder');
				  that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				  that.addClass('is-invalid');
				  errorCount++;
			  }
		  });
  
		  if(errorCount == 0)
		  {
			  var question = jQuery('#id-question').val();
			  var answer = jQuery('#id-answer').val();
  
			  var datainfo = { 
							question: question,
							answer: answer
							  };
  
			  jQuery.ajax({
				  type: "POST",
				  url: BASE_URL+"portal-api/faq/add",
				  data: JSON.stringify(datainfo),
				  contentType: "application/json",
				  datatype: "html",
				  success: function (data) {
					  if(data.status)
					  {
						  location.href = BASE_URL+'faq';
						  commonFunction.regularAlert('success', data.message);
					  }
					  else if(!data.status)
					  {
						  commonFunction.ResponseHandleFail(data);
					  }
					  else
					  {
						  commonFunction.regularAlert('error', messageList.commonFail);
					  }
				  },
				  error: function (data) {
					  commonFunction.regularAlert('error', messageList.commonFail);
				  }
			  });
		  }
	  },
	 // FAQ delete
	faq_delete: function(faq_id, callback)
	{
		var datainfo = { 
			
		};
		jQuery.ajax({
		type: "POST",
		url: BASE_URL+"portal-api/faq/delete/"+faq_id,
		data: JSON.stringify(datainfo),
		contentType: "application/json",
		datatype: "html",
		success: function (data) {
			if(data.status)
			{
				commonFunction.regularAlert('success', data.message);
				callback({
					status: true
				})
			}
			else if(!data.status)
			{
				commonFunction.ResponseHandleFail(data);
				callback({
					status: false
				})
			}
			else
			{
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		},
		error: function (data) {
			commonFunction.regularAlert('error', messageList.commonFail);
			callback({
				status: false
			})
		}
		});
	},
	// FAQ update
	faq_update: function()
	{
		var errorCount = 0;
		jQuery('#form-faq-update .error-msg').remove(); // Remove Error Message
		jQuery('#form-faq-update').find('.req').each(function()
		{
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			
		
		})

		if(errorCount == 0)
		{
			var question = jQuery('#id-question').val();
			var answer = jQuery('#id-answer').val();
			var datainfo = { 
								question: question, 
								answer: answer
							};
			jQuery.ajax({
				type: "POST", 
				url: BASE_URL+"portal-api/faq/update/"+FAQ_ID, 
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
						
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	// Multiple images upload
	upload_picture_multiple_process: function(that_defined, callback)
	{
		ajaxLoader = true;
		if(that_defined[0].files[0] != '' && that_defined[0].files[0] !== undefined)
		{
			var formData = new FormData();
			for (var i = 0; i < that_defined[0].files.length; ++i) {
				formData.append('picture'+i, that_defined[0].files[i]);
			}
      		
			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/common/image/upload_multiple", //upload_multiple //upload
				data: formData,
				datatype: "json",
		        contentType: false,
		        processData: false,
				success: function (data) {
					if(data.status)
					{
						$.each(data.data, function(index) 
						{
							if(data.data[index].status)
							{
								var response_data =  {
									status: true,
									data:  data.data[index]
								}
								callback(response_data);
								commonFunction.regularAlert('success', data.message);

							}
							else if(!data.data[index].status)
							{
								
								commonFunction.ResponseHandleFail(data.data[index]);
							}
							else
							{
								commonFunction.regularAlert('error', messageList.commonFail);
							}
						});
						
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
			
		}
	},
	// page slug update
	page_slug_update: function()
	{
		var errorCount = 0;
		jQuery('#form-page-slug-update .error-msg').remove(); // Remove Error Message
		jQuery('#form-page-slug-update').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			else if(inputId == 'id-body')
			{
					if(inputVal == '<br>')
					{
							var placeHolderText = that.attr('placeholder');
							that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
							that.addClass('is-invalid');
							errorCount++;
					}
			}
			
		})

		if(errorCount == 0)
		{
			var title = jQuery('#id-title').val();
			
			var body = jQuery('#id-body').val();
			

			var datainfo = { 
								title: title,
								body: body
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/page_slug/update/"+PAGE_SLUG_ID,
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},

	dealer_user_update: function(user_id)
	{
		var errorCount = 0;
		jQuery('#form-dealer-user-update .error-msg').remove(); // Remove Error Message
		jQuery('#form-dealer-user-update').find('.req').each(function(){
			var that = jQuery(this);
			var inputVal = that.val();
			var inputId = that.attr('id');

			inputVal = jQuery.trim(inputVal);
			that.removeClass('is-invalid'); // Remove Class

			if(inputVal == '')
			{
				var placeHolderText = that.attr('placeholder');
				that.after('<div class="invalid-feedback error-msg">'+placeHolderText+' is required</div>');
				that.addClass('is-invalid');
				errorCount++;
			}
			else if(inputId == 'id-email')
			{
				if(!commonFunction.ValidateEmail(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter password!</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
				
			}
			else if(inputId == 'id-contact_no')
			{
				if(commonFunction.onlyNumberWithDot(inputVal))
				{
					that.after('<div class="invalid-feedback error-msg">Please enter valid number</div>');
					that.addClass('is-invalid');
					errorCount++;
				}
				
			}
		})

		jQuery('#id-repassword, #id-password').removeClass('is-invalid');
		var password_change_value = jQuery('#id-password-change').is(':checked');
		if(password_change_value)
		{
			var password_text = jQuery('#id-password').val();
			var repassword_text = jQuery('#id-repassword').val();

			if(password_text == '')
			{
				jQuery('#id-password').after('<div class="invalid-feedback error-msg">Please enter password!</div>');
				jQuery('#id-password').addClass('is-invalid');
				errorCount++;
			}
			else if(password_text.length<6)
			{
				jQuery('#id-password').after('<div class="invalid-feedback error-msg">Password must have 6 length!</div>');
				jQuery('#id-password').addClass('is-invalid');
				errorCount++;
			}
			if(repassword_text == '')
			{
				jQuery('#id-repassword').after('<div class="invalid-feedback error-msg">Please enter re-enter password!</div>');
				jQuery('#id-repassword').addClass('is-invalid');
				errorCount++;
			}
			else if(repassword_text.length<6)
			{
				jQuery('#id-repassword').after('<div class="invalid-feedback error-msg">Password must have 6 length!</div>');
				jQuery('#id-repassword').addClass('is-invalid');
				errorCount++;
			}
			if(password_text != '' && repassword_text != '' && password_text != repassword_text && password_text.length >5 && repassword_text.length>5)
			{
				jQuery('#id-repassword').after('<div class="invalid-feedback error-msg">Password & Re-enter password must match</div>');
				jQuery('#id-repassword').addClass('is-invalid');
				errorCount++;
			}
		}

		if(errorCount == 0)
		{
			var first_name = jQuery('#id-first_name').val();
			var surname = jQuery('#id-surname').val();
			var email = jQuery('#id-email').val();
			var password = jQuery('#id-password').val();
			if(!password_change_value)
			{
				password = '';
			}

			var datainfo = { 
								first_name: first_name, 
								surname: surname, 
								email: email,
								password: password,
							};

			jQuery.ajax({
				type: "POST",
				url: BASE_URL+"portal-api/dealer-user/update/"+user_id,
				data: JSON.stringify(datainfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if(data.status)
					{
						commonFunction.regularAlert('success', data.message);
					}
					else if(!data.status)
					{
						commonFunction.ResponseHandleFail(data);
					}
					else
					{
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
		}
	},
	dealer_user_delete: function(user_id, callback)
	{
		var datainfo = { 
			
		};
		jQuery.ajax({
		type: "POST",
		url: BASE_URL+"portal-api/dealer-user/delete/"+user_id,
		data: JSON.stringify(datainfo),
		contentType: "application/json",
		datatype: "html",
		success: function (data) {
			if(data.status)
			{
				commonFunction.regularAlert('success', data.message);
				callback({
					status: true
				})
			}
			else if(!data.status)
			{
				commonFunction.ResponseHandleFail(data);
				callback({
					status: false
				})
			}
			else
			{
				commonFunction.regularAlert('error', messageList.commonFail);
				callback({
					status: false
				})
			}
		},
		error: function (data) {
			commonFunction.regularAlert('error', messageList.commonFail);
			callback({
				status: false
			})
		}
		});
	},
	//Auction History popup
	auction_history_details: function( auction_id, callback)
	{
		console.log("called ho",auction_id);
		$('#car-details-modal').modal('show');
		$('#car-details-modal .car-details-section').html(auction_id);

	},

}


/**** Actions ****/

// Login
jQuery(document).on('click','#btn-id-login', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.login_process();	
})


// Profile Update
jQuery(document).on('click','#btn-id-profile-update', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.profile_update();	
})
// Dealer Update
jQuery(document).on('click','#btn-id-dealer-update', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.dealer_update();	
})
// Branch Add
jQuery(document).on('click','#btn-id-branch-add', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.branch_add();	
})
// Branch Update
jQuery(document).on('click','#btn-id-branch-update', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.branch_update();	
})
// Branch Update
jQuery(document).on('click','#btn-id-vehicle-basic-information-update', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.vehicle_basic_data_update();	
})
// Email Template Add
jQuery(document).on('click','#btn-id-email-template-add', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.email_template_add();	
})
// Email Template Update
jQuery(document).on('click','#btn-id-email-template-update', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.email_template_update();	
})
// Auction Add
jQuery(document).on('click','#btn-id-auction-add', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.auction_add();	
})

// Auction Add
jQuery(document).on('click','#btn-id-auction-edit', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.auction_edit();	
})

//Province Add
jQuery(document).on('click','#btn-id-province-add', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.province_add();	
})
// Province update 
jQuery(document).on('click','#btn-id-province-update', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.province_update();	
})

// Forget Password
jQuery(document).on('click','#btn-id-forget-password', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.forget_password_process();	
})
// Reset Password
jQuery(document).on('click','#btn-id-reset-password', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.reset_password_process();	
})

// Add Admin User 
jQuery(document).on('click','#btn-id-adminUser-add', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.adminUser_add();	
})
//admin user update
jQuery(document).on('click','#btn-id-adminUser-update', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.adminUser_update();	
})
//designation add
jQuery(document).on('click','#btn-id-designation-add', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.designation_add();	
})
//designation update
jQuery(document).on('click','#btn-id-designation-update', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.designation_update();	
})

//FAQ Add
jQuery(document).on('click','#btn-id-faq-add', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.faq_add();	
})
//FAQ update
jQuery(document).on('click','#btn-id-faq-update', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.faq_update();	
})
//PAGe slug update
jQuery(document).on('click','#btn-id-page-slug-update', function(e){
    e.preventDefault();
    ajaxLoader = true;
	processFunctionObj.page_slug_update();	
})





/*AJAX LOADER START*/
  jQuery(document).on({
    ajaxStart: function() { 
      if(ajaxLoader)
      {
        // console.log('ajax-loader-show');
        jQuery(".loading-spinner").show();   
      }
    },
    ajaxStop: function() {
      if(ajaxLoader)
      {
        // console.log('ajax-loader-hide');
        jQuery(".loading-spinner").hide();   
        // jQuery(".page-loader-wrapper-process").hide();
      }
    }    
});
/*AJAX LOADER END*/



/* SHOW VEHICLE DETAILS*/
jQuery(document).ready(function($) {
	/*slick slider*/

	
	$('#car-details-modal .slider-for').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: false,
	  dots: false,
	  fade: true
	//   asNavFor: '#car-details-modal .slider-nav'
	});

	$('#car-details-modal .slider-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		arrows: false,
		infinite:true,
		
	  });

	  
	$('.view-car-details').click(function(event) {
	  /* Act on the event */
	    var that = $(this);
	    var vehicle_id = that.attr('c_id');

	    processFunctionObj.vehicle_basic_data(vehicle_id, function(data){
	      if(data.status)
	      {
	        let response = data.data; 
			
	        /*image slider images */
	          var img_var = '';
	          $.each(response.picture, function(index,img) 
	          {
	            img_var +=  '<div><div class="img_slider">' + 
	                  	'<img class="img-fluid" src="'+img.picture+'" alt="Card image cap">' + 
	                  	'</div></div>';
				});
	          $('#car-details-modal .slick-slide').remove('');
				
	          $('#car-details-modal .slider-for').slick('slickAdd',img_var);
	         	  $('#car-details-modal .slider-nav').slick('slickAdd',img_var);

	          $('#car-details-modal .slider-for').slick('setPosition');
	          $('#car-details-modal .slider-nav').slick('setPosition');
	         
	        //  $('#car-details-modal .slider-for').slick('slickGoTo', 1);
	        //  $('#car-details-modal .slider-nav').slick('slickGoTo', 1);
	        $('#car-details-modal').modal('show');
	          
	         
	      /*car details*/
	      if(response.vehicle)
	      {
			vehicle_data = response.vehicle;
			
            let additional = '';
            if(vehicle_data.vin_number!='')
            {
                additional += '<li><b>VIN number :</b> '+vehicle_data.vin_number+'</li>';
            }
            if(vehicle_data.colour!='')
            {
				additional += '<li><b>Colour :</b> '+vehicle_data.colour+'</li>';
            }
            if(vehicle_data.fuel!='')
            {
                additional += '<li><b>Fuel :</b> '+vehicle_data.fuel+'</li>';
            }
            if(vehicle_data.engine_number!='')
            {
                additional += '<li><b>Engine Number :</b> '+vehicle_data.engine_number+'</li>';
            }
            if(vehicle_data.engine_size_cc!='')
            {
                additional += '<li><b>Engine Size CC :</b> '+vehicle_data.engine_size_cc+'</li>';
            }
            if(vehicle_data.registration_no!='')
            {
                additional += '<li><b>Registration No :</b> '+vehicle_data.registration_no+'</li>';
            }


			var additional2='';

			if(vehicle_data.value.trade!='')
			{
				additional2 += '<li><b>Trade Value ('+CURRENCY_SYMBOL+') :</b> '+vehicle_data.value.trade+'</li>';
			}
			if(vehicle_data.value.reserve!='')
			{
				additional2 += '<li><b>Reserve Value ('+CURRENCY_SYMBOL+') :</b> '+vehicle_data.value.reserve+'</li>';
			}
			if(vehicle_data.value.opening_bid!='')
			{
				additional2 += '<li><b>Opening bid Value ('+CURRENCY_SYMBOL+') :</b> '+vehicle_data.value.opening_bid+'</li>';
			}
			if(vehicle_data.value.retail!='')
			{
				additional2 += '<li><b>Retail Value ('+CURRENCY_SYMBOL+') :</b> '+vehicle_data.value.retail+'</li>';
			}
			if(vehicle_data.value.recent_selling_price!='')
			{
				additional2 += '<li><b>Recent Selling Value ('+CURRENCY_SYMBOL+') :</b> '+vehicle_data.value.recent_selling_price+'</li>';
			}
			if(vehicle_data.appraisal_document!='')
			{
				additional2 += ' <li><b>Appraisal document : </b><a href="'+vehicle_data.appraisal_document+'" target="_blank"> Download PDF</a></li>' ;
			}
	        // vehicle_data = response.vehicle;
	        let vehicle_data_obj = '' + 
	          '<h4> '+vehicle_data.brand+' '+vehicle_data.variant+' '+vehicle_data.model+' </h4>' + 
	          '<ul>'+
	          ' <li><b>Year : </b> '+vehicle_data.registration_year+'</li>' + 
	          ' <li><b>Kilometers : </b> '+vehicle_data.km_range['text']+' km</li>' +
			  additional+ 
	          ' <li><b>Service details : </b> '+vehicle_data.service_history+'</li>' + 
	          ' <li><b>Vehicle condition : </b> '+vehicle_data.condition.text+'</li>' + 
			  ' <li><b>Transmission : </b> '+vehicle_data.transmission+'</li>' + 
              ' <li><b>Location : </b> '+response.basic.location+'</li>'+additional2+
	          
	          '</ul>' + 
	          '';
	        $('#car-details-modal .car-details-section').html(vehicle_data_obj);
	      }
	      
	      }
	    });

	});

	// $(document).on('click', '.view-auction-history', function(event) {
	// 	event.preventDefault();
	// 	/* Act on the event */
		
	// 	$('#auction-history-details-modal').modal('show');

	//  });
	$('.modal').on('shown.bs.modal', function (e) {
	    $('#car-details-modal .slider-for').slick('setPosition');
	    $('#car-details-modal .slider-nav').slick('setPosition');
	}) 
});
/* SHOW VEHICLE DETAILS END */




/*AJAX TOOLTIP START*/
jQuery(document).ready(function($) {
	$(document).ajaxComplete(function(){
		/*for tooltip show on ajax complete*/
		jQuery('[data-toggle="tooltip"]').tooltip();
		jQuery('[data-toggle="popover"]').popover(); 
	});
});
/*AJAX TOOLTIP END*/



/*PASSWORD SHOW HIDE EYE START*/
$(document).ready(function () {
	$('.pw-show-hide').each(function(index, el) {
  		$(el).append('<a href="#'+$(el).siblings('input[type="password"]').attr('id')+'" class="float-right" data-toggle="password"><i class="fa fa-eye fa-fw"></i> <span>Show</span></a>')
		
	});
});

/*PASSWORD SHOW HIDE EYE END*/

 // datatable width fix for on tab click
 $(document).ready(function () {
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
		$($.fn.dataTable.tables(true)).DataTable()
			.columns.adjust();
	});
});





