WILD-FUSION ASSESSMENT TEST

# Get API running

`npm start`

# Routes
!important - All routes must contain a Authentication header for the appname

	    END POINT	              Description
	     /	                      GET base endpoint
         /sign-up	              POST create a user
	     /sign-in                 POST sign in
         /save-prescription	      GET save a prescription
         /prescription:id         DELETE delete a prescription by id
         /verify?status=          GET verify drug completion
         
****KINDLY NOTE THE FOLLOWING:****

For the sake of this assessment, the cron is set to run for every 10 minutes

A token much be passed for each user sign-in and any request made. Only the `/sign-up` endpoint is exempted. An example with a dummy token is shown below;

        KEY                 VALUE
        x-access-token      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJfaWQiOiI1ZjQ2YzY5NjY4MjMxMDQxZWFiNjJiOTgiLCJlbWFpbCI6Imthcm9AdGVzdC5jb20iLCJwYXNzd29yZ
        



