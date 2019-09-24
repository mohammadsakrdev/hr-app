exports.invokeRolesPolicies = acl => {
  acl.allow([
    {
      roles: ['HR', 'Employee'],
      allows: [
        { resources: '/api/user/user-profile/', permissions: 'get' },
        { resources: '/api/user/user-update-profile/', permissions: 'put' }
      ]
    },
    {
      roles: ['HR'],
      allows: [
        { resources: '/api/user/all-user/', permissions: 'get' },
        { resources: '/api/user/update-user/:userId/', permissions: 'put' },
        { resources: '/api/user/delete-user/:userId/', permissions: 'delete' },
        { resources: '/api/user/view-user/:userId/', permissions: 'get' }
      ]
    }
  ]);
};
