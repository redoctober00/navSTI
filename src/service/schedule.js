import { generateId } from "../helper/idGenerator";
import axios from "../lib/axios";
/**
 * @typedef Schedule
 * @property {string} id
 * @property {string} name
 * @property {string} roomID
 * @property {string} date
 * @property {string} time
 *
 */

/**
 *
 * @returns {Schedule[]}
 */
export const getSchedules = async () => {
  try {
    const response = await axios.get("/schedule");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @param {string} scheduleId
 * @returns {Schedule}
 */
export const getSchedule = async (scheduleId) => {
  try {
    const response = await axios.get(`/schedule/${scheduleId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @typedef CreateSchedulePayload
 * @property {string} name
 * @property {string} roomID
 * @property {string} date
 * @property {string} time
 *
 */

/**
 *
 * @param {CreateSchedulePayload} payload
 * @returns {Schedule}
 */
export const createSchedule = async (payload) => {
  try {
    const id = generateId();
    const response = await axios.post("/schedule", {
      id,
      ...payload,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @typedef UpdateSchedulePayload
 * @property {string} name
 * @property {string} roomID
 * @property {string} date
 * @property {string} time
 *
 */
/**
 * @param {string} scheduleId
 * @param {UpdateSchedulePayload} payload
 * @returns {Schedule}
 */
export const updateSchedule = async (scheduleId, payload) => {
  try {
    const response = await axios.put(`/schedule/${scheduleId}`, payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @param {string} scheduleId
 * @returns {Schedule}
 */
export const deleteSchedule = async (scheduleId) => {
  try {
    const response = await axios.delete(`/schedule/${scheduleId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
