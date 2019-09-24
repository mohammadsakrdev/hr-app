exports.invokeRolesPolicies = acl => {
  acl.allow([
    {
      roles: ['HR'],
      allows: [
        { resources: '/api/benefit/add-benefit/', permissions: 'post' },
        {
          resources: '/api/benefit/view-benefit/:benefitId/',
          permissions: 'get'
        },
        {
          resources: '/api/benefit/update-benefit/:benefitId/',
          permissions: 'put'
        },
        { resources: '/api/benefit/all-benefit/', permissions: 'get' },
        {
          resources: '/api/benefit/delete-benefit/:benefitId/',
          permissions: 'delete'
        }
      ]
    },
    {
      roles: ['HR', 'Employee'],
      allows: [
        {
          resources: '/api/benefit/search-benefit-name/:name/',
          permissions: 'get'
        },
        {
          resources: '/api/benefit/search-benefit-type/:benefitType/',
          permissions: 'get'
        }
      ]
    }
  ]);
};
