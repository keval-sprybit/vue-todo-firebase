<div class="page-inner">
 
  <header class="page-title-bar">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active">
          <a href="<?php echo base_url().'/admin-user'; ?>"><i class="breadcrumb-icon fa fa-angle-left mr-2"></i>Back</a>
        </li>
      </ol>
    </nav>
    <h1 class="page-title"> Admin User Update </h1>
  </header>
  
  <div class="page-section">
    <div class="card card-fluid">
      <div class="card-body">
        <div class="media user-avtar-block">
          <div class="user-avatar user-avatar-xl fileinput-button">
              <div class="fileinput-button-label"> Change photo </div>
              <?php 
             
                  if($adminUser['picture'] != '')
                  {
                      $profile_pic_url = $adminUser['picture'];
                  }
                  else
                  {
                      $profile_pic_url = base_url()."/".NO_USER_IMAGE;
                  }
              ?>
              <img src="<?php echo $profile_pic_url; ?>" id="adminUser-profile-pic-src" alt="Profile"> 
              <input id="id-adminUser-profile-pic"  type="file" name="profile-pic">
          </div>
          <div class="media-body pl-3">
            <h3 class="card-title"> Admin User Picture </h3>
            <h6 class="card-subtitle text-muted"> Click the current picture to change Admin User photo. </h6>
            <p class="card-text">
              <small>Please upload 512 * 512 px image for better resolution.</small>
            </p>
            <div id="progress-avatar" class="progress progress-xs fade">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
        </div>
        
        <form id="form-adminUser-update">
            <div class="form-row">
                <div class="col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3">
                    <label>Name<em>*</em></label> 
                    <input type="text"  class="form-control req" id="id-name" placeholder="First Name" value="<?php echo $adminUser['name']; ?>" maxlength="50"> 
                </div>
              
                <div class="col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3">
                    <label>Email<em>*</em></label> 
                    <input type="text" class="form-control req" id="id-email" placeholder="Email" value="<?php echo $adminUser['email']; ?>" maxlength="50"> 
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-3">
                    <label>Designation<em>*</em></label> 
                    <select class="form-control req" id="id-designation_id" placeholder="Designation" >
                    <?php 
                      foreach ($designation_list['data'] as $key => $value)
                      { ?> 
                        <option value="<?php echo $value['id']; ?>"  <?php if($adminUser['designation']['id'] == $value['id']) { echo 'selected="selected"'; } ?>><?php echo $value['title']; ?></option>
                      <?php }
                     ?>
                  </select>
               </div>
                <div class="col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-3">
                    <label>Status</label> 
                    <span class="form-control">
                        <?php 
                            if($adminUser['status'] == '1')
                             {
                                echo 'Active';
                             }
                             else
                             {
                                echo 'In Active';
                             } 
                        ?>
                    </span>
                </div>
                <div class="col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-3">
                    <label>Registered At</label> 
                    <span class="form-control">
                        <?php 
                             echo $adminUser['created_at'];
                        ?>
                    </span>
                </div>
            </div>
          
          <div class="form-row pt-3 change-pass-row">
            <label for="input04" class="">Change Password?</label>
            <div class="mb-3">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="id-password-change"  > <label class="custom-control-label" for="id-password-change"></label>
              </div>
            </div>
          </div>
          <div class="form-row cls-password" style="display: none;">
            <div class="col-md-6 mb-3">
                <label class="pw-show-hide w-100">Password<em>*</em></label> 
                <input type="password" class="form-control" id="id-password" value="" maxlength="20">
            </div>
            <div class="col-md-6 mb-3">
                <label class="pw-show-hide w-100">Re-enter Password<em>*</em></label> 
                <input type="password" class="form-control" id="id-repassword" value="" maxlength="20">
            </div>
          </div>
          <hr>
          <div class="form-actions">
            <button type="button" class="btn btn-primary ml-auto" id="btn-id-adminUser-update">Update</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</div>

<script type="text/javascript">
jQuery(document).ready(function() {

  AdminUserID = '<?php echo $adminUser['id']; ?>';

  jQuery(document).on('change', '#id-password-change', function(){
     jQuery('.cls-password, .cls-repassword').toggle('slow');
  })

  jQuery(document).on('change', '#id-adminUser-profile-pic', function(){
      var that = $(this);
      var reader = new FileReader();

      processFunctionObj.upload_picture_process($(this), function(callback_response){
          var image_response = callback_response.data;
          var image_name = image_response.image_name;
          var image_full_path = image_response.full_path;
          var diplay_image_full_path = image_response.diplay_image_path;
          jQuery('#adminUser-profile-pic-src').attr('src', diplay_image_full_path);
          that.attr('new_image_name', image_name);
      });
      
  })

});
</script>