export const checkPermission = (permiss = null) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo?.group_role_id == '1') return true;

    if (userInfo?.permisstion.includes(permiss)) return true;
    return false;
};
