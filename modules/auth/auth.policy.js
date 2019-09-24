exports.invokeRolesPolicies = acl => {
  acl.allow([
    {
      roles: ['HR'],
      allows: [
        {
          resources: '/api/auth/user-register/',
          permissions: 'post'
        }
      ]
    }
  ]);
};
