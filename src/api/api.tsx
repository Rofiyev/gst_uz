import axios from "axios";
import { BASE_URL } from "../config";
import { IPostuserdata } from "../interface";

export const getCategorys = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/category/`);
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, data: [] };
  }
};

export const getDocuments = async (types: string = "") => {
  const params = {
    document_type: types,
  };

  try {
    const { data } = await axios.get(`${BASE_URL}/document/`, { params });
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, data: [] };
  }
};
export const postContact = async (body: IPostuserdata) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/form/`, body);
    return { data, success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const checkPhoneNumber = async (number: string) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/activation/
    `,
      {
        phone_number: number,
      }
    );
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, data: "" };
  }
};
export const getProducts = async (objParams: {
  product_last_count?: string;
  category_id?: string;
  product_id?: string;
}) => {
  const params = {
    ...objParams,
  };
  try {
    const { data } = await axios.get(`${BASE_URL}/product/`, { params });
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, data: [] };
  }
};
