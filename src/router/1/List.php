<div class="page-inner">
 
  <header class="page-title-bar">
    <h1 class="page-title"> Admin User </h1>
    <div class="text-right">
        <a class="btn btn-primary" href="<?php echo base_url().'/admin-user/add'; ?>">
            <i class="fa fa-plus"></i>
            <span class="ml-1">New</span>
        </a>
    </div>
  </header>
  
  <div class="page-section">
    <div class="card card-fluid">
      <div class="card-body">
        
        <table  class="display table table-striped" id="datatable_list_adminUser" style="width:100%" >
            <thead>
                <tr>
                    <th class="no-sort">Picture</th>
                    <th>Name</th>     
                    <th>Email</th>            
                    <th>Designation</th>            
                    <th>Status</th>            
                    <th>Created At</th>            
                    <th class="no-sort">Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
            <tfoot>
                <tr>
                    <th class="no-sort">Picture</th>
                    <th>Name</th>     
                    <th>Email</th>            
                    <th>Designation</th>            
                    <th>Status</th>            
                    <th>Created At</th>            
                    <th class="no-sort">Action</th>
                </tr>
            </tfoot>
        </table>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript">
    
jQuery(document).ready(function() {
var currentUser=<?php echo $user_information['id'] ?>; //current user id
    function loadTable()
    {
        ajaxLoader = false;
        jQuery('#datatable_list_adminUser').DataTable({
            "processing": true,
            "serverSide": true,
            "scrollX": true,
            "searching": true,
            "pageLength": 25,
            "order": [[ 5, "desc" ]],
            "ajax":
                {
                    "url": BASE_URL+"portal-api/adminUser/datatable-list",
                    "type": "POST"
                },
            "columns": [
                {"mRender": function ( data, type, row ) {

                        if(row['picture'] == '')
                        {
                            var image_url = '<?php echo NO_USER_IMAGE; ?>';
                        }
                        else
                        {
                            var image_url = row['picture'];
                        }

                        var returnData = '<div><img width="50" src="'+image_url+'" class="user-avatar user-avatar-md"></div>';
                        return returnData;
                    }
                },
                { "data": "name" },
                { "data": "email" },
                { "data": "designation" },
                {"mRender": function ( data, type, row ) {
                      
                    if(row['status'] == '1')
                    {
                        if(row['id']==currentUser || row['id']==1)
                            var returnData = '<span class="cls-update-status" onClick="javascript:void(0);"><span class="badge badge-success">Active</span></span>';
                        else
                            var returnData = '<a href="javascript:void(0);" class="cls-update-status" onClick="status_update(2, '+row['id']+');"><span class="badge badge-success">Active</span></a>';
                    }
                    else
                    { 
                        if(row['id']==currentUser || row['id']==1)
                            var returnData = '<span class="cls-update-status" onClick="javascript:void(0);"><span class="badge badge-danger">In Active</span></span>';
                        else
                            var returnData = '<a href="javascript:void(0);" class="cls-update-status" onClick="status_update(1, '+row['id']+');"><span class="badge badge-danger">In Active</span></a>';
                    }
                    return returnData;
                        
                    }
                },
                { "data": "created_at" },
                {"mRender": function ( data, type, row ) {

                        var returnData = '<a title="Edit" href="<?php echo base_url(); ?>/admin-user/edit/'+row['id']+'" class=" action-btn-common btn-sm  btn btn-outline-primary mx-1"><i class="fa fa-pencil-alt"></i></a>';
                        returnData += '<a title="Delete" href="javascript:void(0);" onClick="status_delete('+row['id']+')" class=" action-btn-common mx-1 btn-sm btn btn-outline-danger"><i class="fa fa-trash-alt"></i></a>';
                            if(row['id']==currentUser || row['id']==1)
                            {
                                return '';
                            }
                            else
                            {
                                return returnData
                            }
                        
                    }
                }
            ],
            "columnDefs": [
                { "targets": 'no-sort', "orderable": false },
                { "width": "10%", "targets": 0 },
                { "width": "15%", "targets": 1 },
                { "width": "20%", "targets": 2 },
                { "width": "10%", "targets": 3 },
                { "width": "10%", "targets": 4 },
                { "width": "20%", "targets": 5 },
                { "width": "15%", "targets": 6 },
                
            ]
        });

    }

    loadTable();



});

function status_update(status, adminUser_id)
{
    if(status == '1')
    {
        var body_text = 'Are you sure, You want to active Admin User?';
    }
    else
    {
        var body_text = 'Are you sure, You want to inactive Admin User?';
    }

    commonFunction.confirmCustomAlert('warning', 'Status', body_text, "Update Status", function(callback_response){
        if(callback_response.status)
        {
            processFunctionObj.adminUser_status_update(status, adminUser_id, function(c){
                jQuery('#datatable_list_adminUser').DataTable().ajax.reload(); 
            });
        }
    })
}


function status_delete(adminUser_id)
{
    var body_text = 'Are you sure, You want to delete admin user?';

    commonFunction.confirmCustomAlert('warning', 'Delete', body_text, "Delete Admin User", function(callback_response){
        if(callback_response.status)
        {
            processFunctionObj.adminUser_delete(adminUser_id, function(c){
                jQuery('#datatable_list_adminUser').DataTable().ajax.reload(); 
            });
        }
    })
}

</script>