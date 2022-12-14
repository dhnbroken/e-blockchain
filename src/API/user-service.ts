import { IUser } from 'src/store/interface';
import { axiosInstance, axiosInstanceWithAction } from './axios';

export const getAllUser = async () => {
  try {
    const res = await axiosInstance.get('/user');
    return res.data;
  } catch (error) {
    throw Error(String(error));
  }
};

export const getCurrentUserInfomation = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/user/${id}`);
    return res.data;
  } catch (error) {
    throw Error(String(error));
  }
};

export const updateUserInformation = async (id: string, data: IUser) => {
  try {
    const res = await axiosInstanceWithAction.put(`/user/${id}`, data);
    return res.data;
  } catch (error) {
    throw Error(String(error));
  }
};

export const deleteUserInformation = async (id: string) => {
  try {
    await axiosInstanceWithAction.delete(`/user/${id}`);
  } catch (err) {
    throw Error(String(err));
  }
};
