<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AdminLTE 3 | Log in</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">

  <link rel="stylesheet" href="public/assets/css/fontawesome-free/css/all.min.css">

  <link rel="stylesheet" href="public/assets/css/icheck-bootstrap.min.css">

  <link rel="stylesheet" href="public/assets/css/adminlte.min.css">

</head>

<body class="hold-transition login-page">
  <div class="login-box">
    <div class="login-logo">
      <a href="../../index2.html"><b>Super</b> <b>Admin</b></a>
    </div>
    <!-- /.login-logo -->
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Sign in to start your session</p>

        <form id="form-login" method="post">
          <div class="form-group">
            <label class="d-block text-left">Email</label>
            <input type="text" id="id-email" placeholder="Email" class="form-control form-control-lg req" maxlength="50">
          </div>
          <label class="d-block text-left pw-show-hide">Password
          </label>
          <input type="password" id="id-password" placeholder="Password" class="form-control form-control-lg req" maxlength="20">
      </div>
      <div class="social-auth-links text-center mb-3">
        <button class="btn btn-lg btn-primary sign-in-login" type="button" id="btn-id-login">Sign In</button>

      </div>
      </form>
    </div>

  </div>
  </div>

  <script src="./public/assets/js/jquery/jquery.js"></script>
  <script src="./public/assets/js/jquery/jquery.min.js"></script>
  <script src="./public/assets/js/adminlte.min.js"></script>
  <script src="./public/assets/js/bootstrap/js/bootstrap.bundle.min.js"></script>

  <script>
    $(document).ready(function() {
      var commonFunction = {
        ResponseHandleFail: function(response) {
          if (!response.status) {
            if (response.status_code == 412) {
              location.reload();
            } else {
              commonFunction.regularAlert('error', response.message);
            }
          }
        },
        cutString: function(string, limit) {
          var out = strlen(string) > limit ? substring(string, 0, limit) + "..." : string;
          return out;
        },
        ValidateEmail: function(inputText) {
          var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          if (reg.test(inputText) == false) {
            return false;
          }
          return true;
        },
        ValidateOtp: function(inputText) {
          var reg = /^\d{6}$/;
          if (reg.test(inputText) == false) {
            return false;
          }
          return true;
        },
      
        regularAlert: function(type, title) {
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
        confirmAlert: function(title, text, callback) {

          if (title == '') {
            title = 'Are you sure?';
          }
          if (text == '') {
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
            if (result.value) {
              callback({
                "status": true
              });
            } else {
              callback({
                "status": false
              });
            }
          })

        },
        confirmCustomAlert: function(icon, title, text, confirmBtnText, callback) {

          if (title == '') {
            title = 'Are you sure?';
          }
          if (text == '') {
            text = "You won't be able to revert this!";
          }
          if (confirmBtnText == '') {
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
            if (result.value) {
              callback({
                "status": true
              });
            } else {
              callback({
                "status": false
              });
            }
          })

        },
        displayMessage: function(errorData, mainTitle, secondTitle) {
          Swal.fire({
            type: errorData,
            title: mainTitle,
            text: secondTitle
          })
        },
        alphanumericAllow: function(e) {
          var keyCode = e.keyCode;
          if (keyCode != 8 && keyCode != 37 && keyCode != 39) {
            var regex = new RegExp("^[a-zA-Z]+$");
            var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
            if (regex.test(str)) {
              return true;
            }

            e.preventDefault();
            return false;
          }
        },
        onlyLetters: function(str) {
          var reg = new RegExp("[^a-zA-Z]");
          return reg.test(str)
        },
        onlyLettersNumber: function(str) {
          var reg = new RegExp("[^a-zA-Z0-9]");
          return reg.test(str)
        },
        onlyLettersNumberWithSpace: function(str) {
          var reg = new RegExp("[^a-zA-Z0-9 ]");
          return reg.test(str)
        },
        onlyNumber: function(str) {
          var reg = new RegExp("[^0-9]");
          return reg.test(str)
        },
        onlyNumberWithDot: function(str) {
          var reg = new RegExp("[^0-9.]");
          return reg.test(str)
        },
      
        readAndSetURLFromImage: function(input, targetId) {
          if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
              jQuery(targetId).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
          }
        },

        twoDigitAfterDot: function(numberString) {
          numberString = parseFloat(numberString);
          if (numberString != '') {
            return numberString.toFixed(2);
          } else {
            return '00.00';
          }

        }
      }
      $('#btn-id-login').click(function() {

        var errorCount = 0;
        jQuery('#form-login .error-msg').remove(); // Remove Error Message
        jQuery('#form-login').find('.req').each(function() {
          var that = jQuery(this);
          var inputVal = that.val();
          var inputId = that.attr('id');

          inputVal = jQuery.trim(inputVal);
          that.removeClass('is-invalid'); // Remove Class

          if (inputVal == '') {
            var placeHolderText = that.attr('placeholder');
            that.after('<div class="invalid-feedback error-msg">' + placeHolderText + ' is required</div>');
            that.addClass('is-invalid');
            errorCount++;
          }
        })

        if (errorCount == 0) {
          var username = jQuery('#id-email').val();
          var password = jQuery('#id-password').val();
          var userinfo = {
            username: username,
            password: password
          };
          commonFunction.regularAlert('error', messageList.commonFail);
          /* 
            jQuery.ajax({
				type: "POST",
				url: BASE_URL + "portal-api/login",
				data: JSON.stringify(userinfo),
				contentType: "application/json",
				datatype: "html",
				success: function (data) {
					if (data.status) {
						location.href = BASE_URL + 'dashboard';
					}
					else if (!data.status) {
						commonFunction.ResponseHandleFail(data);
					}
					else {
						commonFunction.regularAlert('error', messageList.commonFail);
					}
				},
				error: function (data) {
					commonFunction.regularAlert('error', messageList.commonFail);
				}
			});
          */

        }
      });



    });
  </script>

</body>

</html>