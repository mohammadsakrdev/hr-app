exports.invokeRolesPolicies = acl => {
  acl.allow([
    {
      roles: ['HR'],
      allows: [
        { resources: '/api/department/add-department/', permissions: 'post' },
        {
          resources: '/api/department/view-department/:departmentId/',
          permissions: 'get'
        },
        {
          resources: '/api/department/update-department/:departmentId/',
          permissions: 'put'
        },
        { resources: '/api/department/all-department/', permissions: 'get' },
        {
          resources: '/api/department/delete-department/:departmentId/',
          permissions: 'delete'
        }
      ]
    }
  ]);
};
