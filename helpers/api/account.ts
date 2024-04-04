import instance from "./_axios_instance";

const END_POINT = {
  ACCOUNT: "account",
  CHANGE_PASSWORD: "change-password",
};

export const changePassword = ({email, oldPassword, newPassword, confirmPassword}) => {
  return instance.put(`/${END_POINT.ACCOUNT}/${END_POINT.CHANGE_PASSWORD}`, {
    email, oldPassword, newPassword, confirmPassword
  });
};
