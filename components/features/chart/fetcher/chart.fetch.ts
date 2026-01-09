import { unwrapResult } from "@/utils/error";
import { serverFetch } from "@/utils/serverFetch";

export const fetchWeeklyMoodTrend = async () => {
  const response = await serverFetch<
    {
      week: string;
      happy: number;
      tired: number;
      stressed: number;
    }[]
  >("/mock/weekly-mood-trend");

  return unwrapResult(response);
};

export const fetchPopularSnackBrand = async () => {
  const response = await serverFetch<
    {
      name: string;
      share: number;
    }[]
  >("/mock/popular-snack-brands");

  return unwrapResult(response);
};

export const fetchWeeklyWorkoutTrend = async () => {
  const response = await serverFetch<
    {
      week: string;
      running: number;
      cycling: number;
      stretching: number;
    }[]
  >("/mock/weekly-workout-trend");

  return unwrapResult(response);
};

export const fetchCoffeConsumption = async () => {
  const response = await serverFetch<{
    teams: {
      team: string;
      series: {
        cups: number;
        bugs: number;
        productivity: number;
      }[];
    }[];
  }>("/mock/coffee-consumption");

  return unwrapResult(response);
};

export const fetchSnackImpact = async () => {
  const response = await serverFetch<{
    departments: {
      name: string;
      metrics: {
        snacks: number;
        meetingsMissed: number;
        morale: number;
      }[];
    }[];
  }>("/mock/snack-impact");

  return unwrapResult(response);
};
